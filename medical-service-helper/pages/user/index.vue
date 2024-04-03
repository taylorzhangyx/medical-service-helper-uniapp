<template>
    <view>
        <view>
            <form @submit="formSubmit" @reset="formReset">
                <!-- <view class="uni-form-item uni-column">
                    <view class="title">switch</view>
                    <view>
                        <switch name="switch" />
                    </view>
                </view>
                <view class="uni-form-item uni-column">
                    <view class="title">radio</view>
                    <radio-group name="radio">
                        <label>
                            <radio value="radio1" /><text>选项一</text>
                        </label>
                        <label>
                            <radio value="radio2" /><text>选项二</text>
                        </label>
                    </radio-group>
                </view>
                <view class="uni-form-item uni-column">
                    <view class="title">checkbox</view>
                    <checkbox-group name="checkbox">
                        <label>
                            <checkbox value="checkbox1" /><text>选项一</text>
                        </label>
                        <label>
                            <checkbox value="checkbox2" /><text>选项二</text>
                        </label>
                    </checkbox-group>
                </view>
                <view class="uni-form-item uni-column">
                    <view class="title">slider</view>
                    <slider value="50" name="slider" show-value></slider>
                </view> -->
                <view>
                    <text>is Authenticated: {{ isAuthenticated }}</text>
                    <p />
                    <text>Token:{{ token }}</text>
                </view>
                <view class="uni-form-item uni-column">
                    <view class="title">登录信息</view>
                    <view class="uni-form-item uni-column">
                        <text>账号</text>
                        <input class="uni-input" name="input" placeholder="请输入账号" v-model="loginInfo.account" />
                    </view>
                    <view class="uni-form-item uni-column">
                        <view class="title">密码输入的input</view>
                        <input
                            class="uni-input"
                            password
                            type="text"
                            placeholder="请输入密码"
                            v-model="loginInfo.password"
                        />
                    </view>
                </view>
                <view class="uni-btn-v">
                    <button form-type="submit">Submit</button>
                    <button type="default" form-type="reset">Reset</button>
                    <button hover-class="button-hover" @click="logout">Logout</button>
                </view>
            </form>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive, toRaw, computed } from "vue";
    const app = getApp();
    const isAuthenticated = computed(() => {
        return loginInfo.isAuthed;
    });
    const token = ref("");
    const loginInfo = reactive({
        account: "",
        password: "",
        isAuthed: false,
    });
    const formSubmit = (e) => {
        console.log("formSubmit", loginInfo);
        const data = toRaw(loginInfo);
        app.globalData.utils.request({
            url: "/api/authenticate",
            method: "POST",
            data: { username: data.account, password: data.password, rememberMe: false },
            success: (res) => {
                console.log("success", res);
                token.value = res.id_token;
                uni.setStorageSync("AuthToken", token.value);
                loginInfo.isAuthed = true;
                uni.switchTab({ url: "/pages/index/index" });
            },
        });
    };

    const formReset = (e) => {
        console.log("formReset", e);
        loginInfo.account = "";
        loginInfo.password = "";
    };
    const logout = (e) => {
        uni.removeStorageSync("AuthToken");
        loginInfo.isAuthed = false;
        uni.switchTab({ url: "../index/index" });
        token.value = "";
    };
</script>
<style>
    .uni-form-item .title {
        padding: 20rpx 0;
    }
</style>
