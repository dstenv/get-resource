<template>
	<view>
		<view class="container">
			<view class="box">
				<input type="text" class="input" placeholder="请输入链接" v-model="inpValue" />
				<button @click="send">获取</button>
			</view>
			<view class="">
				<button style="width: 80%;" @click="saveAll">全部保存</button>
			</view>
			<view class="img-list">
				<view class="origin-box" v-for="item in list" :key="item.url">
					<image class="origin-url" :src="item.url" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
const inpValue = ref('')
const list = ref([])
const send = () => {
	const reg = /(https|http):\/\/.*\/[\dA-Za-z]*/g
	if(reg.test(inpValue.value)) {
		reg.lastIndex = 0
		const url = reg.exec(inpValue.value)[0]
		uni.showLoading({
			title: '正在获取，请稍候...',
		})
		
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
					list.value = imgList.map(item => ({
						...item,
						url: `https://${reg3.exec(item.url)[0]}${item.fileId}`
					}))
					uni.hideLoading()
				}
			},
			fail: (err) => {
				console.log('err',err)
			}
		})
		
	}
}

const saveAll = () => {
	if(list.value.length === 0) {
		uni.showToast({
			title: '请先获取图片',
			icon: "error"
		})
	}
}
</script>

<style>
.container {
	width: 100vw;
	height: 100vh;
}
.box {
	box-sizing: border-box;
	padding: 20rpx 40rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.box button {
	margin-left: 10rpx;
	font-size: 16px;
}
.input {
	display: block;
	border: 1rpx solid dodgerblue;
	border-radius: 10rpx;
	padding: 10rpx;
	flex: 1;
}
.img-list {
	display: flex;
	align-items: center;
	justify-content: space-around;
	gap: 20rpx 0;
	flex-wrap: wrap;
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
