<template>
	<view class="home-page">
		<view class="function-list">
			<view 
				class="function-item" 
				v-for="item in functionList" :key="item.key"
				@click="functionClick(item.router)"
			>
				<image class="func-item-img" :src="item.icon" alt="" mode="widthFix"/>
				<view class="func-item-name">{{ item.name }}</view>
				<text class="func-item-desc">{{ item.desc }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { router } from '../../router/index.js'

const functionClick = (routerLink) => {
	router.push(routerLink)
}

const functionList = [
	{
		name: '资源获取',
		router: '/pages/platform-control/platform-control',
		icon: '../../static/icons/批量获取资源.png',
		key: 'getSource',
		desc: '获取小红书、抖音等分享链接内的资源'
	},
	{
		name: '图片压缩',
		router: '',
		icon: '../../static/icons/compress-image.png',
		key: 'compressImg',
		desc: '对图片进行无损压缩，最高压缩比可达75%'
	}
]
</script>

<style scoped>
view {
	box-sizing: border-box;
}
.home-page {
	background-color: #f8f8f8;
	width: 100vw;
	height: 100vh;
	overflow-x: hidden;
	overflow-y: auto;
}
.function-list {
	display: flex;
	flex-wrap: wrap;
	padding: 20rpx;
}
.function-item {
	width: calc(50% - 20rpx);
	overflow: hidden;
	background-color: #fff;
	border-radius: 30rpx;
	padding: 20rpx;
	margin-bottom: 40rpx;
	height: fit-content;
}
.function-item:active {
	background-color: #f8f8f8;
}
.function-item:first-of-type {
	margin-right: 40rpx;
}
.func-item-img {
	width: 50%;
	display: block;
	margin: 0 auto 20rpx;
}
.func-item-name {
	text-align: center;
	font-size: 40rpx;
	margin-bottom: 10rpx;
}
.func-item-desc {
	font-size: 24rpx;
	color: #6b6b6b;
}
</style>
