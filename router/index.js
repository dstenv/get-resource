export const queryString = (object) => {
	let str = ''
	for (let key in object) {
		str += `${key}=${object[key]}&`
	}
	return str.slice(0, str.length - 1)
}

export const router = {
	push(options) {
		return new Promise(resolve => {
			const type = typeof options
			
			if(type === 'string') {
				uni.navigateTo({
					url: options,
					success() {
						resolve()
					}
				})
			}else if(type === 'object' && options instanceof Object) {
				const { path, query } = options
				const queryStr = queryString(query)
				console.log(path, query,queryStr, `${path}?${queryString(query)}`)
				uni.navigateTo({
					url: `${path}?${queryString(query)}`,
					success() {
						resolve()
					}
				})
			}
		})
	},
	back() {
		return new Promise(resolve => {
			uni.navigateBack({
				success() {
					resolve()
				}
			})
		})
	}
}