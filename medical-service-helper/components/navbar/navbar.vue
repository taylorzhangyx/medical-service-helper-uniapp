<template>
    <view class="nav">
        <view :style="'height'+status+'rpx;' + containerStyle"></view>
        <view class="navbar" :style="'height:'+navHeight + 'rpx;' + containerStyle"></view>
        <view>this is taylor's navbar</view>
    </view>
</template>

<script setup>
    import { onBeforeMount, ref, defineProps } from 'vue'
    defineProps({
        background: {
            type: String,
            default: 'rgba(255, 255, 255, 1)'
        },
        color: {
            type: String,
            default: 'rgba(0,0,0,1)'
        },
        fontSize: {
            type: String,
            default: '32'
        },
        iconWidth:{
            type: String,
            default: '116'
        },
        iconHeight:{
            type: String,
            default: '38'
        },
    })
    onBeforeMount(() => {
        console.log('onBeforeMount')
        setNavSize()
        setStyle()
    })
    // 状态栏高度
    const statusHeight = ref(0)
    // 内容高度
    const navHeight = ref(0)
    // 背景颜色
    const containerStyle = ref('')
    // 文字样式
    const textStyle = ref('')
    // 图标样式
    const iconStyle = ref('')

    // 计算状态栏高度
    const setNavSize = () => {
        const {system, statusBarHeight} = uni.getSystemInfoSync();
        // console.log(systemInfo);
        statusHeight.value = statusBarHeight;
        const isios = system.indexOf('iOS') > -1;
        if (isios) {
            statusHeight.value = 96;
        } else {
            statusHeight.value = 88;
        }
    }
    // 样式设置
    const setStyle = () => {
        containerStyle.value = `background: ${props.background};`
        textStyle.value = `color: ${props.color};font-size: ${props.fontSize}rpx;`
        iconStyle.value = `width: ${props.iconWidth}rpx;height: ${props.iconHeight}rpx;`
    }
</script>

<style>
    .nav {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 2;
        background: blueviolet;
    }
</style>
