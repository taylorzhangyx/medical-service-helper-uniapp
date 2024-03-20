<template>
    <view>
        <navbar :isHome="true"></navbar>
        <view style="margin-top: 130rpx">
            <view class="weui-cell"
                  style="background:#fff9eb;">
                <view class="weui-cell__hd">
                    <image src="./../../static/resource/images/ic_myapp.png"
                           mode="scaleToFill"
                           style="display: block; width: 40rpx; height: 40rpx; margin-right: 14rpx;" />
                </view>
                <view class="weui-cell__bd">
                    <text style="color:#be9719; font-size: 13px;">点击右上角"添加到我的小程序"方便下次找到!</text>
                </view>
                <view class="weui-cell__ft">
                    <image src="./../../static/resource/images/modal_closer.png"
                           style="display: block; width: 40rpx; height: 40rpx; margin-right: 14rpx;"
                           mode="scaleToFill" />
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
const app = getApp()
onLoad(() => {
    app.globalData.utils.getUserInfo()
})
</script>

<style>
page {
    background: white;
}
</style>
