export const queryString = (object) => {
	let str = ''
	for (let key in object) {
		str += `${key}=${object[key]}&`
	}
	return str.slice(0, str.length)
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