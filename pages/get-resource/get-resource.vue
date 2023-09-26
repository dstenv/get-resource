<template>
	<view>
		<view class="container">
			<view>
				<textarea class="input" placeholder="请输入链接" v-model="inpValue"></textarea>
				<button class="get" @click="send">获取</button>
			</view>
			<view class="">
				<button @click="saveAll">全部保存</button>
			</view>
			<view class="img-list">
				<view class="origin-box" v-for="(item, index) in list" :key="index" @click="preview(item.url)">
					<image class="origin-url" :src="item.url" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { ref } from "vue";
import analysis from '@/common/analysis'
import userAuthorize from '@/common/auth.js'

let key = ''

export default {
	data() {
		return {
			inpValue: '',
			list: []
		}
	},
	onLoad(query) {
		key = query.key
	},
	methods: {
		saveAll() {
			if(this.list.length === 0) {
				uni.showToast({
					title:'请先获取图片',
					icon:'error'
				})
				return
			}
			const _this = this
			userAuthorize('scope.writePhotosAlbum', (state) => {
			    // state为真说明已授权
				if(!state) return
				uni.showLoading({
					title:'正在保存...'
				})
				let count = 0
				_this.list.forEach(item => {
					uni.getImageInfo({
						src: item.url,
						success: (data) => {
							uni.saveImageToPhotosAlbum({
								filePath: data.path,
								success: () => {
									count++
									if(count === _this.list.length) {
										uni.hideLoading()
										setTimeout(() => {
											uni.showToast({
												title:'保存成功',
												icon: 'none'
											})
										})
										return
									}
									console.log('count',count)
								}
							})
						}
					})
				})
				
			})	
		},
		async send() {
			if(analysis[key]) {
				uni.showLoading({
					title:'正在获取，请稍候',
				})
				try{
					const result = await　analysis[key](this.inpValue)
					console.log('result',result)
					this.list = result
					uni.hideLoading()
				}catch(e){
					uni.hideLoading()
					//TODO handle the exception
					uni.showToast({
						title:'获取失败，请检查网络',
						icon:"error"
					})
				}
			}
			
		},
		preview(url) {
			console.log(url)
			uni.previewImage({
				count: url,
				current: this.list.findIndex(item => item.url === url),
				urls: this.list.map(item => item.url)
			})
		}
	}
}
</script>

<style>
.container {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 20rpx 40rpx;
}
.get {
	margin: 20rpx 0 30rpx;
}
.input {
	display: block;
	border: 1rpx solid dodgerblue;
	border-radius: 10rpx;
	padding: 10rpx;
	width: 100%;
	box-sizing: border-box;
}
.img-list {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-around;
	gap: 20rpx 0;
	flex-wrap: wrap;
	overflow-y: scroll;
	padding-top: 40rpx;
}
.origin-box {
	overflow: hidden;
	border-radius: 10rpx;
}
.origin-url {
	border-radius: 10rpx;
	width: 300rpx;
	display: block;
}
</style>
