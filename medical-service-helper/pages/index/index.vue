<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<text>total count: {{totalCount}}</text>
		<button type="default" @click="handleClick">click me!</button>
		<view v-for="item in list" :key="item.name">
			<text>name is: {{item.name}}\n</text>
			<text>number is: {{item.num}}</text>
		</view>
	</view>
</template>

<script setup>
	// export default {
	// 	data() {
	// 		return {
	// 			title: 'Hello'
	// 		}
	// 	},
	// 	onLoad() {

	// 	},
	// 	methods: {

	// 	}
	// }
	import { ref, reactive, computed} from "vue"
	import { onLoad } from "@dcloudio/uni-app"
	const title = ref("Hello")
	const list = reactive([
		{name: 'apple', num: 2},
		{name: 'banana', num: 4},
		{name: 'orange', num: 6}
	])
	var totalCount = computed(()=>{
			return list.reduce((total, cur) => {
				console.log('total: ', total);
				console.log('cur.num: ', cur.num);
				return total + cur.num;
			}, 0)
	})
	const handleClick = ()=>{
		// let n = 0
		list.forEach(item =>{
			item.num++
		})
		// totalCount = n
	}
	
	onLoad(()=>{
		console.log("onLoad life cycle123")
		// var n = 0
		// list.forEach(item =>{
		// 	n = n+item.num
		// })
		// totalCount = n
	})
	
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
