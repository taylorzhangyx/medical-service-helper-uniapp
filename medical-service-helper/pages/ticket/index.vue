<template>
    <view>
        <view>
            <text>ticket list:</text>
        </view>
        <view v-if="tickets.length > 0">
            <block v-for="ticket in tickets" :key="ticket.id">
                <view>
                    <text>{{ ticket.id }}</text>
                    <text>{{ ticket.title }}</text>
                </view>
            </block>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive, toRaw } from "vue";
    import { onShow } from "@dcloudio/uni-app";
    const app = getApp();
    const tickets = ref([]);
    // 页面周期函数--监听页面加载
    onShow((options) => {
        console.log("ticket load: This is a log message", options);
        app.globalData.utils.request({
            url: "/api/tickets",
            header: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + uni.getStorageSync("AuthToken"),
            },
            success: (success) => {
                console.log("Ticket request successful", success);
                tickets.value = success;
            },
        });
    });
</script>

<style></style>
