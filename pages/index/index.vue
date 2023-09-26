<template>
	<view>
		<view class="title">请选择对应的平台获取资源</view>
		<view class="platform-list">
			<view class="platform-list-item" v-for="item in platformList" :key="item.key" 
			@click="router.push({ path: '/pages/get-resource/get-resource', query: { key: item.key}})">
				<span>{{item.name}}</span>
				<span>></span>
			</view>
		</view>
	</view>
</template>

<script setup>
import { router } from '@/router/index.js'
	
const platformList = [
	{
		name: '小红书',
		key: 'smallRedBook'
	},
	{
		name: '抖音',
		key: 'tiktok'
	}
]
</script>

<style>
.title {
	font-size: 32rpx;
	text-align: center;
	padding: 10rpx 0 20rpx;
}
.platform-list {
	
}
.platform-list-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx;
	border-bottom: 1px solid #ddd;
}
.platform-list-item:active {
	background-color: #ddd;
}
</style>
