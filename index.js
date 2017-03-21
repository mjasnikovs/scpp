module.exports = {
	sync: (list, callback) => {
		(function loop(list, callback, i, result) {
			list[i]((err, data) => {
				return list[++i] && !err ? loop(list, callback, i, data) : callback(err, data)
			}, result)
		})(list, callback, 0)
	},
	parallel: (list, callback) => {
		let listCount = list.length, lock = 1
		for (let i = list.length - 1; i >= 0; i -= 1) {
			list[i]((err, data) => {
				list[i] = data
				return (--listCount !== 0 && lock === 1 && !err) === true || --lock || callback(err, list)
			})
		}
	}
}
