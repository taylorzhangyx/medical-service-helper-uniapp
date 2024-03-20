<template>
    <view>
        <navbar :isHome="true"></navbar>
        <view style="margin-top: 130rpx">
            <view class="weui-cell"
                  style="background:#fff9eb;">
                <view class="weui-cell_hd">
                    <image src="./../../static/resource/images/ic_myapp.png"
                           mode="scaleToFill"
                           style="display: block; width: 40rpx; height: 40rpx; margin-right: 14rpx;" />
                </view>
                <view class="weui-cell_bd">
                    <text style="color:#be9719; font-size: 13px;">点击右上角"添加到我的小程序"方便下次找到!</text>
                </view>
                <view class="weui-cell_ft">
                    <image src="./../../static/resource/images/modal_closer.png"
                           style="display: block; width: 40rpx; height: 40rpx; margin-right: 14rpx;"
                           mode="scaleToFill" />
                </view>
            </view>
        </view>
    </view>
    <!-- <view>show index page</view> -->
    <!-- <my-component></my-component> -->
</template>

<script setup>
const navigateTo = () => {
    uni.navigateTo({
        url: '/pages/search/index'
    })
}
</script>

<style>
page {
    background: white;
}
</style>
