export default {
	/*
	 * 小红书原图片获取
	 * 参数说明: 
	 */
	smallRedBook: (link) => {
		return new Promise((resolve, reject) => {
			const reg = /(https|http):\/\/.*\/[\dA-Za-z]*/g
			if(reg.test(link)) {
				reg.lastIndex = 0
				const url = reg.exec(link)[0]
				
				uni.request({
					url,
					method:"GET",
					success: (res) => {
						const reg = /"imageList":\[[^\s]*\]/
						const htmlText = res.data
						const listvalue = reg.exec(htmlText)[0]
						const reg2 = /\[[^\s]*\]/
						const str = reg2.exec(listvalue)[0]
						
						const imgList = JSON.parse(str)
						console.log('imgList',imgList)
						if(imgList && imgList.length > 0) {
							const reg3 = /\/\/.*\.com\//
							const list = imgList.map(item => ({
								...item,
								url: `https:${reg3.exec(item.url)[0]}${item.fileId}`
							}))
							resolve(list)
						}
					},
					fail: (err) => {
						console.log('err',err)
						reject(err)
					}
				})
				
			}
		})
	},
	tiktok: (link) => {
		
	}
}
