<template>
    <view class="content">
        <navbar></navbar>
        <button style="margin-top: 130rpx;"
                @click="navigateTo">
            跳转至搜索
        </button>
    </view>
    <!-- <view>show index page</view> -->
    <my-component></my-component>
</template>

<script setup>
const navigateTo = () => {
    uni.navigateTo({
        url: '/pages/search/index'
    })
}
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
