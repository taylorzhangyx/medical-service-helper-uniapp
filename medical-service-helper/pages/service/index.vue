<template>
    <view>
        <view class="od-banner">
            <image class="od-banner-icon"
                   src="/static/resource/images/od_bg_icon.png"
                   mode="widthFix" />
            <view class="od-jd od-jd-0">
                <view class="od-jd-out">
                    <view class="od-jd-in"></view>
                </view>
                <view class="vp-flex od-jd-text">
                    <view class="vp-flex_1">
                        <text class="od-jd-st-0">填写订单</text>
                    </view>
                    <view class="vp-flex_1">
                        <text class="od-jd-st-10">在线支付</text>
                    </view>
                    <view class="vp-flex_1">
                        <text class="od-jd-st-20">专人服务</text>
                    </view>
                    <view class="vp-flex_1">
                        <text class="od-jd-st-30">服务完成</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="pub-box">
            <view class="pub-box-bd">
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">
                        <image class="serv-icon"
                               :src="service.icon_image ? service.icon_image_url : '../../static/resource/images/avatar.jpg'">
                        </image>
                    </view>
                    <view class="weui-cell__bd">
                        <text class="serv-name">{{ service.name }}</text>
                    </view>
                    <view class="weui-cell__ft">
                        <view class="f5 ic_info"
                              @click="handleTap">服务内容</view>
                    </view>
                </view>
            </view>
        </view>
        <block v-if="service.stype == 10 || service.stype == 15 || service.stype == 20">
            <view class="pub-box">
                <view class="pub-box-bd">
                    <view class="weui-cell weui-cell_input">
                        <view class="weui-cell__hd">
                            <view class="weui-label">就诊医院</view>
                        </view>
                        <view class="weui-cell__bd"></view>
                        <view class="weui-cell__ft weui-cell__ft_in-access">
                            <view>
                                <picker @change="onHospitalChange"
                                        :value="hospital_index"
                                        :range="hospitals"
                                        range-key="name">
                                    <input type="text"
                                           :disabled="true"
                                           placeholder="请选择要就诊的医院"
                                           :value="hospitals[hospital_index].name"
                                           placeholder-class="vp-placeholder" />
                                </picker>
                            </view>
                        </view>
                    </view>
                    <view class="weui-cell weui-cell_input">
                        <view class="weui-cell__hd">
                            <view class="weui-label">就诊时间</view>
                        </view>
                        <view class="weui-cell__bd"></view>
                        <view class="weui-cell__ft weui-cell__ft_in-access">
                            <view>
                                <dtPicker @dtPickerChanged="onStartTimeChanged"
                                          :timestamp="order.starttime"
                                          placeholder="请选择就诊时间"></dtPicker>
                            </view>
                        </view>
                    </view>
                    <view class="weui-cell weui-cell_input"
                          @click="onClientChange">
                        <view class="weui-cell__hd">
                            <view class="weui-label">就诊人</view>
                        </view>
                        <view class="weui-cell__bd"></view>
                        <view class="weui-cell__ft weui-cell__ft_in-access">
                            <view>
                                <input class="weui-input"
                                       placeholder-class="vp-placeholder"
                                       placeholder="请选择就诊人"
                                       style="text-align: right;"
                                       :disabled="true"
                                       :value="client.name"
                                       type="text">
                            </view>
                        </view>
                    </view>
                    <block v-if="service.stype == 15">
                        <!-- 接送陪诊 -->
                        <view class="weui-cell weui-cell_input">
                            <view class="weui-cell__hd">接送地址</view>
                            <view class="weui-cell__bd">
                                <input class="weui-input"
                                       name="receiveAddress"
                                       style="text-align: right"
                                       placeholder-class="vp-placeholder"
                                       placeholder="请填写就诊人所在地址"
                                       v-model="order.receiveAddress" />
                            </view>
                        </view>
                    </block>

                    <view class="weui-cell weui-cell_input">
                        <view class="weui-cell__hd">联系电话</view>
                        <view class="weui-cell__bd">
                            <input class="weui-input"
                                   type="number"
                                   name="tel"
                                   style="text-align: right"
                                   placeholder-class="vp-placeholder"
                                   placeholder="请填写您的联系电话"
                                   v-model="order.tel" />
                        </view>
                    </view>
                </view>
            </view>
            <view class="pub-box">
                <view class="pub-box-tt">服务需求</view>
                <view class="pub-box-bd">
                    <view class="weui-cell weui-cell_input">
                        <view class="weui-cell__bd">
                            <textarea name="demand"
                                      auto-height
                                      placeholder="请简单描述您要就诊的科室.."
                                      placeholder-class="vp-placeholder"
                                      style="min-height: 150rpx"
                                      v-model="order.demand" />
                        </view>
                    </view>
                </view>
            </view>
        </block>
        <block v-if="service.stype == 30 || service.stype == 40">
            <!-- 送取结果,代跑取药 -->
            <view class="pub-box">
                <view class="pub-box-bd">
                    <view class="weui-cell weui-cell_input">
                        <view class="weui-cell__hd">
                            <view class="weui-label">所在医院</view>
                        </view>
                        <view class="weui-cell__bd"></view>
                        <view class="weui-cell__ft weui-cell__ft_in-access">
                            <view>
                                <picker @change="onHospitalChange"
                                        :value="hospital_index"
                                        :range="hospitals"
                                        range-key="name">
                                    <input type="text"
                                           :disabled="true"
                                           placeholder="请选择就诊所在医院"
                                           :value="hospitals[hospital_index].name"
                                           placeholder-class="vp-placeholder" />
                                </picker>
                            </view>
                        </view>
                    </view>

                    <view class="weui-cell weui-cell_input">
                        <view class="weui-cell__hd">
                            <view class="weui-label">服务时间</view>
                        </view>
                        <view class="weui-cell__bd"></view>
                        <view class="weui-cell__ft weui-cell__ft_in-access">
                            <view>
                                <dtPicker @dtPickerChanged="onStartTimeChanged"
                                          :timestamp="order.starttime"
                                          placeholder="请选择期望服务时间"></dtPicker>
                            </view>
                        </view>
                    </view>

                    <view class="weui-cell weui-cell_input"
                          @click="onAddressChange">
                        <view class="weui-cell__hd">
                            <view class="weui-label">收件信息</view>
                        </view>
                        <view class="weui-cell__bd"></view>
                        <view class="weui-cell__ft weui-cell__ft_in-access">
                            <input class="weui-input"
                                   :disabled="true"
                                   style="text-align: right"
                                   placeholder-class="vp-placeholder"
                                   placeholder="请选择收件信息"
                                   :value="order.address.userName
                                ? order.address.userName + '(' + order.address.cityName + order.address.countyName + order.address.detailInfo + ')'
                                : ''
                                " />
                        </view>
                    </view>
                    <view class="weui-cell weui-cell_input">
                        <view class="weui-cell__hd">联系电话</view>
                        <view class="weui-cell__bd">
                            <input class="weui-input"
                                   type="number"
                                   name="tel"
                                   style="text-align: right"
                                   placeholder-class="vp-placeholder"
                                   placeholder="请填写您的联系电话"
                                   v-model="order.tel" />
                        </view>
                    </view>
                </view>
            </view>

            <view class="pub-box">
                <view class="pub-box-tt">服务需求</view>
                <view class="pub-box-bd">
                    <view class="weui-cell weui-cell_input">
                        <view class="weui-cell__bd">
                            <textarea name="demand"
                                      auto-height
                                      placeholder="如有其他服务要求请在此填写.."
                                      placeholder-class="vp-placeholder"
                                      style="min-height: 150rpx"
                                      v-model="order.demand" />
                        </view>
                    </view>
                </view>
            </view>
        </block>
        <block v-if="service.stype == 110">
            <!-- 上门服务 -->
            <view class="pub-box">
                <view class="pub-box-bd">
                    <view class="weui-cell weui-cell_input">
                        <view class="weui-cell__hd">
                            <view class="weui-label">服务时间</view>
                        </view>
                        <view class="weui-cell__bd"></view>
                        <view class="weui-cell__ft weui-cell__ft_in-access">
                            <view>
                                <dtPicker @dtPickerChanged="onStartTimeChanged"
                                          :timestamp="order.starttime"
                                          placeholder="请选择期望服务时间"></dtPicker>
                            </view>
                        </view>
                    </view>

                    <view class="weui-cell weui-cell_input"
                          @click="onClientChange">
                        <view class="weui-cell__hd">服务对象</view>
                        <view class="weui-cell__bd"></view>
                        <view class="weui-cell__ft weui-cell__ft_in-access">
                            <input class="weui-input"
                                   :disabled="true"
                                   style="text-align: right"
                                   placeholder-class="vp-placeholder"
                                   placeholder="请选择服务对象"
                                   :value="client.name" />
                        </view>
                    </view>
                    <view class="weui-cell weui-cell_input">
                        <view class="weui-cell__hd">服务地址</view>
                        <view class="weui-cell__bd">
                            <input class="weui-input"
                                   name="receiveAddress"
                                   style="text-align: right"
                                   placeholder-class="vp-placeholder"
                                   placeholder="请填写服务所在地址"
                                   v-model="order.receiveAddress" />
                        </view>
                    </view>
                    <view class="weui-cell weui-cell_input">
                        <view class="weui-cell__hd">联系电话</view>
                        <view class="weui-cell__bd">
                            <input class="weui-input"
                                   type="number"
                                   name="tel"
                                   style="text-align: right"
                                   placeholder-class="vp-placeholder"
                                   placeholder="请填写您的联系电话"
                                   v-model="order.tel" />
                        </view>
                    </view>
                </view>
            </view>

            <view class="pub-box">
                <view class="pub-box-tt">服务需求</view>
                <view class="pub-box-bd">
                    <view class="weui-cell weui-cell_input">
                        <view class="weui-cell__bd">
                            <textarea name="demand"
                                      auto-height
                                      placeholder="请简单描述您要就诊的科室.."
                                      placeholder-class="vp-placeholder"
                                      style="min-height: 150rpx"
                                      v-model="order.demand" />
                        </view>
                    </view>
                </view>
            </view>
        </block>
        <view style="height: 300rpx"></view>
        <!-- 悬浮提交按钮 -->
        <view class="vp-foot">
            <view style="background: #ffffff; padding: 20rpx">
                <view class="xieyi"
                      style="text-align: center">
                    <text :class="'is_xieyi ' + (is_xieyi ? 'is_xieyi_on' : '')"
                          @click="onXieyiChange">我已阅读并同意</text>
                    <navigator :url="cfg.page_xy">《用户协议》</navigator>
                    <text>和</text>
                    <navigator :url="cfg.page_fw">《服务协议》</navigator>
                </view>
                <view>
                    <button :class="'btnp ' + (is_xieyi ? '' : 'btnp-disabled')"
                            @click="submit">
                        确认下单
                        <block v-if="order.price > 0">（支付{{ order.price }}元）</block>
                    </button>
                </view>
            </view>
        </view>
        <uni-popup ref="popup"
                   type="center"
                   :is-mask-click="false"
                   background-color="#fff">
            <view class="popup-content">
                <view class="group">
                    <input class="uni-input"
                           type="tel"
                           v-model="validMobile.phone"
                           placeholder="手机号" />
                </view>
                <view class="group">
                    <input class="uni-input"
                           v-model="validMobile.validCode"
                           placeholder="验证码" />
                    <text class="valid-text"
                          @click="countdownChange">{{ countdown.validText }}</text>
                </view>
            </view>
            <view class="btns">
                <view class="cancel"
                      @click="cancel">取消</view>
                <view class="ok"
                      @click="ok">确定</view>
            </view>
        </uni-popup>
        <uni-popup ref="qrcodePopup"
                   type="center"
                   :is-mask-click="false"
                   background-color="#fff">
            <view class="pay-box">
                <image src="../../static/resource/images/modal_closer.png"
                       style="display: block;width: 30rpx; height: 30rpx;"
                       @click="payment"
                       mode="scaleToFill" />
                <view class="text-center">微信支付</view>
                <canvas id="qrcode"
                        canvas-id="qrcode"
                        style="width: 300rpx;height: 300rpx;"></canvas>
                <view class="text-center">请使用本人微信扫描以上二维码</view>

            </view>

        </uni-popup>
    </view>
</template>

<script setup>
    import { ref, reactive, toRaw } from 'vue'
    import { onLoad } from '@dcloudio/uni-app'
    import UQRCode from 'uqrcodejs';
    const app = getApp()
    onLoad((options) => {
        console.log('service onload', options)
        mainLoad(options)
    })

    // 验证码弹框控制
    const popup = ref()
    // 支付弹窗控制
    const qrcodePopup = ref()
    // 页面服务详情
    const service = ref({})
    // 医院列表
    const hospitals = ref([])
    // 医院索引
    const hospital_index = ref(0)
    // 订单数据
    const order = reactive({
        price: '',
        starttime: 0,
        address: {
            userName: '',
            cityName: '',
            countyName: '',
            detailInfo: ''
        },
        client: {},
        tel: '',
        demand: ''
    })
    // 页面配置
    const cfg = reactive({
        page_xy: '',
        page_fw: ''
    })
    // 就诊人
    const client = reactive({
        name: "",
        id: 0,
        sex: '',
        age: 0,
        mobile: ''
    })
    const countdown = reactive({
        validText: '获取验证码',
        time: 60
    })
    // 是否同意协议
    const is_xieyi = ref(false)
    // 验证码
    const validMobile = reactive({
        phone: '',
        validCode: ''
    })

    // 页面加载
    const mainLoad = (options) => {
        console.log('service mainLoad', options)
        app.globalData.utils.request({
            url: '/Service/order',
            data: {
                svid: options.svid
            },
            success: (res) => {
                console.log('mainLoad success', res)
                service.value = res.data.service
                hospitals.value = res.data.hospitals
                // 默认选中
                const hospitalsData = res.data.hospitals
                if (options.hid > 0) {
                    for (let i = 0; i < hospitalsData.length; i++) {
                        if (hospitalsData[i].id == options.hid) {
                            hospital_index.value = i
                            const matchedHospital = hospitalsData[i]
                            order.price = matchedHospital.service_price
                            break
                        }
                    }
                }
            }
        })
    }
    // 点击事件
    const handleTap = () => {
        console.log('handleTap')
    }
    const onHospitalChange = (e) => {
        console.log('onHospitalChange', e)
        const newIndex = parseInt(e.detail.value)
        hospital_index.value = newIndex
        order.price = toRaw(hospitals.value)[newIndex].service_price
        // console.log("price", order.price)
    }
    // 修改日期后的回调
    const onStartTimeChanged = (e) => {
        console.log('onStartTimeChanged', e)
        order.starttime = e.detail.value
    }
    const onAddressChange = () => {
        console.log('onAddressChange')
        uni.chooseAddress({
            success: (res) => {
                console.log('chooseAddress success', res);
                order.address.userName = res.userName
                order.address.cityName = res.cityName
                order.address.countyName = res.countyName
                order.address.detailInfo = res.detailInfo
            },
            fail: (res) => {
                console.log('chooseAddress fail', res);
            }
        })
    }
    const onClientChange = () => {
        console.log('onClientChange')
        uni.navigateTo({ url: './../clients/index?act=select' })
    }
    // 监听全局的自定义事件
    uni.$on('clientChange', (data) => {
        console.log('clientChange', data)
        client.name = data.name
        client.id = data.user_id
        client.sex = data.sex
        client.age = data.age
        client.mobile = data.mobile
    })
    const onXieyiChange = () => {
        is_xieyi.value = !is_xieyi.value
    }

    // 注册与验证码倒计时
    let flag = false
    const countdownChange = () => {
        console.log('countdownChange')
        if (!validMobile.phone) {
            app.globalData.utils.showToast("请输入手机号码")
        }
        if (flag) {
            app.globalData.utils.showToast("请勿频繁操作")
            return
        }
        const time = setInterval(() => {
            if (countdown.time <= 0) {
                countdown.validText = '获取验证码'
                countdown.time = 60
                clearInterval(time)
                flag = false
            } else {
                countdown.time--
                countdown.validText = `剩余${countdown.time}s`
            }
        }, 1000)
        flag = true
        // 发送验证码
        app.globalData.utils.request({
            url: '/get/code',
            method: 'POST',
            data: {
                tel: validMobile.phone
            },
            success: (res) => {
                console.log('get code success', res)
                app.globalData.utils.showToast('验证码已发送, 请注意查收')
            },
            fail: (res) => {
                console.log('get code fail', res)
                app.globalData.utils.showToast(res.data.msg)
            },
        })
    }
    const cancel = () => {
        console.log('cancel')
        popup.value.close()
    }
    const ok = () => {
        console.log('ok')
        if (!validMobile.validCode || !validMobile.phone) {
            return app.globalData.utils.showToast('请输入手机号码或验证码')
        }

        // 验证短信
        app.globalData.utils.request({
            url: '/user/authentication',
            method: 'POST',
            data: {
                tel: validMobile.phone,
                code: validMobile.validCode
            },
            success: (res) => {
                console.log('authentication success', res)
                uni.setStorageSync('token', res.data.token)
                popup.value.close()
                submit()
            },
            fail: (res) => {
                console.log('authentication fail', res)
                app.globalData.utils.showToast(res.data.msg)
            },
        })
    }
    // 下单函数
    const submit = () => {
        console.log('submit')
        if (!is_xieyi.value) {
            return app.globalData.utils.showToast('请先同意协议')
        }
        // required objects
        const orderData = toRaw(order);
        const serviceData = toRaw(service.value);
        const hospitalsData = toRaw(hospitals.value);
        const clientData = toRaw(client);

        // fill service specific required fields
        orderData.service_code = serviceData.code
        orderData.service_id = serviceData.id
        orderData.service_name = serviceData.name
        orderData.service_stype = serviceData.stype

        if (serviceData.stype < 100) {
            if (hospital_index.value === 0) {
                return app.globalData.utils.showToast('请选择就诊医院')
            }
        }
        if (!orderData.starttime) {
            return app.globalData.utils.showToast('请选择就诊时间')
        }
        if (serviceData.stype == 10 || serviceData.stype == 15 || serviceData.stype == 20) {
            if (!clientData.id) {
                return app.globalData.utils.showToast('请选择就诊人')
            }
            if (!orderData.receiveAddress) {
                return app.globalData.utils.showToast('请填写接送地址')
            }
        } else if (serviceData.stype == 30 || serviceData.stype == 40) {
            // 收件地址
            if (!orderData.address.userName) {
                return app.globalData.utils.showToast('请选择收件信息')
            }
        }
        if (!orderData.tel) {
            return app.globalData.utils.showToast('请填写联系电话')
        }


        // fill all required fields
        orderData.stype = serviceData.stype
        orderData.hospital_id = hospitalsData[hospital_index.value].id
        orderData.hospital_name = hospitalsData[hospital_index.value].name
        orderData.client = {}
        orderData.client.age = clientData.age
        orderData.client.name = clientData.name
        orderData.client.mobile = clientData.mobile
        orderData.client.sex = clientData.sex
        console.log('submit orderData', orderData)
        if (!uni.getStorageSync('token')) {
            popup.value.open('center')
        }
        createOrder(orderData)
        app.globalData.utils.showToast('下单成功')
    }

    const createOrder = (orderData) => {
        console.log('createOrder')
        app.globalData.utils.request({
            url: '/pay/createOrder',
            method: 'POST',
            header: {
                token: uni.getStorageSync('token'),
            },
            data: orderData,
            success: (success) => {
                console.log("createOrder success", success)
            },
            fail: (fail) => {
                console.log("createOrder fail", fail)
            },
            complete: (complete) => {
                console.log("createOrder complete", complete)
                qrcodePopup.value.open('center')
                // 获取uQRCode实例
                const qr = new UQRCode();
                // 设置二维码内容
                qr.data = "https://uqrcode.cn/doc";
                // 设置二维码大小，必须与canvas设置的宽高一致
                qr.size = 150;
                // 调用制作二维码方法
                qr.make();
                // 获取canvas上下文
                var canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
                // 设置uQRCode实例的canvas上下文
                qr.canvasContext = canvasContext;
                // 调用绘制方法将二维码图案绘制到canvas上
                qr.drawCanvas();
            },
        })
    }

    // 跳转到订单列表
    const payment = () => {
        console.log('payment')
        uni.switchTab({ url: '../order/index' })
    }

</script>

<style>
@import './index.css';
</style>
