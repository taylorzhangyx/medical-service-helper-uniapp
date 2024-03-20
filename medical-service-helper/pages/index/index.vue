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
        <view class="index-swiper"
              v-if="slides && slides.length > 0">
            <swiper :autoplay="true"
                    :circular="true"
                    :interval="3000"
                    :duration="500"
                    :indicator-dots="true">
                <block v-for="(item, index) in slides"
                       :key="index">
                    <swiper-item>
                        <image :src="item.pic_image_url"
                               mode="widthFix"
                               show-menu-by-longpress="true"
                               :data-index='index' />
                    </swiper-item>
                </block>
            </swiper>
        </view>
    </view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
const app = getApp()
const slides = ref([])
onLoad(() => {
    app.globalData.utils.getUserInfo()
    app.globalData.utils.request({
        url: '/app/init',
        success: (res) => {
            const { id } = res.data.area
            if (id) {
                app.globalData.utils.request({
                    url: '/Index/index',
                    data: { aid: id },
                    success: (indexRsp) => {
                        slides.value = indexRsp.data.slides
                    }
                })
            }
        }
    })
})
</script>

<style>
page {
    background: white;
}

.index-swiper {
    padding: 20rpx 20rpx 0 20rpx;
    overflow: hidden;
}

.index-swiper swiper {
    height: 320rpx;
    overflow: hidden;
    border-radius: 10rpx;
}

.index-swiper swiper image {
    width: 100%;
    height: 100%;
}
</style>
