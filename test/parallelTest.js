/* global
describe
it
*/

const {parallel} = require('../index.js')

const expect = require('chai').expect

describe('parallel test =>', () => {
	it('parallel 1 cb, valid', done => {
		parallel([
			cb => cb(null, true)
		], (err, [result]) => {
			expect(err).to.equal(null)
			expect(result).to.equal(true)
			done()
		})
	})

	it('parallel 4 cb, valid', done => {
		parallel([
			cb => cb(null, true),
			cb => cb(null, true),
			cb => cb(null, true),
			cb => cb(null, true)
		], (err, [result1, result2, result3, result4]) => {
			expect(err).to.equal(null)
			expect(result1).to.equal(true)
			expect(result2).to.equal(true)
			expect(result3).to.equal(true)
			expect(result4).to.equal(true)
			done()
		})
	})

	it('parallel 1 cb, error', done => {
		parallel([
			cb => cb(true, null)
		], (err, [result]) => {
			expect(err).to.equal(true)
			expect(result).to.equal(null)
			done()
		})
	})

	it('parallel 4 cb, error', done => {
		parallel([
			cb => cb(true, null),
			cb => cb(true, null),
			cb => cb(true, null),
			cb => cb(true, null)
		], (err, result) => {
			expect(err).to.equal(true)
			done()
		})
	})

	it('parallel 4 cb timeout, sum valid', done => {
		parallel([
			cb => setTimeout(() => cb(null, 10), 100),
			cb => setTimeout(() => cb(null, 23), 50),
			cb => setTimeout(() => cb(null, 57), 30),
			cb => setTimeout(() => cb(null, 80), 10)
		], (err, [result1, result2, result3, result4]) => {
			expect(err).to.equal(null)
			expect(result1 * result2 * result3 * result4).to.equal(1048800)
			done()
		})
	})

	it('parallel 4 cb timeout, string concat valid', done => {
		parallel([
			cb => setTimeout(() => cb(null, 'x'), 100),
			cb => setTimeout(() => cb(null, 'y'), 50),
			cb => setTimeout(() => cb(null, 'z'), 30),
			cb => setTimeout(() => cb(null, 'f'), 10)
		], (err, result) => {
			expect(err).to.equal(null)
			expect(result.join('')).to.equal('xyzf')
			done()
		})
	})

	it('parallel 4 cb timeout, string concat error', done => {
		parallel([
			cb => setTimeout(() => cb(null, 'x'), 100),
			cb => setTimeout(() => cb(true, 'y'), 50),
			cb => setTimeout(() => cb(null, 'z'), 30),
			cb => setTimeout(() => cb(null, 'f'), 10)
		], (err, result) => {
			expect(err).to.equal(true)
			done()
		})
	})

	it('parallel 100 cb timeout, sum valid', done => {
		const massParallel = Array(100).fill().map((val, key) => {
			return (num => {
				return cb => {
					setTimeout(() => cb(null, num), num)
				}
			})(key)
		})

		parallel(massParallel, (err, result) => {
			expect(err).to.equal(null)
			expect(result.reduce((a, b) => a + b)).to.equal(4950)
			done()
		})
	})
})
