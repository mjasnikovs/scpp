/* global
describe
it
*/

const {sync} = require('../index.js')

const expect = require('chai').expect

describe('sync test =>', () => {
	it('sync 1 cb, valid', done => {
		sync([
			cb => cb(null, true)
		], (err, result) => {
			expect(err).to.equal(null)
			expect(result).to.equal(true)
			done()
		})
	})

	it('sync 4 cb, valid', done => {
		sync([
			cb => cb(null, true),
			cb => cb(null, true),
			cb => cb(null, true),
			cb => cb(null, true)
		], (err, result) => {
			expect(err).to.equal(null)
			expect(result).to.equal(true)
			done()
		})
	})

	it('sync 1 cb, error', done => {
		sync([
			cb => cb(true, null)
		], (err, result) => {
			expect(err).to.equal(true)
			expect(result).to.equal(null)
			done()
		})
	})

	it('sync 4 cb, error', done => {
		sync([
			cb => cb(true, null),
			cb => cb(true, null),
			cb => cb(true, null),
			cb => cb(true, null)
		], (err, result) => {
			expect(err).to.equal(true)
			expect(result).to.equal(null)
			done()
		})
	})

	it('sync 4 cb, sum valid', done => {
		sync([
			cb => cb(null, 10),
			(cb, val) => cb(null, val * 23),
			(cb, val) => cb(null, val * 57),
			(cb, val) => cb(null, val * 80)
		], (err, result) => {
			expect(err).to.equal(null)
			expect(result).to.equal(1048800)
			done()
		})
	})

	it('sync 4 cb timeout, sum valid', done => {
		sync([
			cb => setTimeout(() => cb(null, 10), 100),
			(cb, val) => setTimeout(() => cb(null, val * 23), 50),
			(cb, val) => setTimeout(() => cb(null, val * 57), 30),
			(cb, val) => setTimeout(() => cb(null, val * 80), 10)
		], (err, result) => {
			expect(err).to.equal(null)
			expect(result).to.equal(1048800)
			done()
		})
	})

	it('sync 4 cb timeout, string concat valid', done => {
		sync([
			cb => setTimeout(() => cb(null, 'x'), 100),
			(cb, val) => setTimeout(() => cb(null, `${val}y`), 50),
			(cb, val) => setTimeout(() => cb(null, `${val}z`), 30),
			(cb, val) => setTimeout(() => cb(null, `${val}f`), 10)
		], (err, result) => {
			expect(err).to.equal(null)
			expect(result).to.equal('xyzf')
			done()
		})
	})

	it('sync 4 cb timeout, string concat error', done => {
		sync([
			cb => setTimeout(() => cb(null, 'x'), 100),
			(cb, val) => setTimeout(() => cb(true, `${val}y`), 50),
			(cb, val) => setTimeout(() => cb(null, `${val}z`), 30),
			(cb, val) => setTimeout(() => cb(null, `${val}f`), 10)
		], (err, result) => {
			expect(err).to.equal(true)
			done()
		})
	})

	it('sync 100 cb timeout, sum valid', done => {
		const massSync = Array(100).fill().map((val, key) => {
			return (num => {
				return (cb, prVal = 1) => {
					setTimeout(() => {
						return cb(null, prVal + num)
					}, num)
				}
			})(key)
		})

		sync(massSync, (err, result) => {
			expect(err).to.equal(null)
			expect(result).to.equal(4951)
			done()
		})
	})
})
