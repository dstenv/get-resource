<template>
	<view>
	</view>
</template>

<script lang="ts">
export default {
	data() {
		return {
			src: ''
		}
	},
	onLoad(param: any) {
		console.log('param',param)
		param.src = this.src
	}
}
</script>

<style>

</style>
