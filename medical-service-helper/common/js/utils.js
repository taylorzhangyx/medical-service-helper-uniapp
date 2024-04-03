class Utils {
    constructor() {
        // this.baseUrl = "http://159.75.169.224:7300/pz";
        // this.baseUrl = "https://code.itndedu.com/pz";
        this.baseUrl = "http://localhost:8080";
    }
    getUserInfo() {
        uni.login({
            success: (res) => {
                console.log("uni/login", res);
                // uni.setStorageSync("token", res.code);
                this.request({
                    url: "/auth/wxLogin",
                    data: {
                        code: res.code,
                    },
                    success: (rsp) => {
                        console.log("auth/wxLogin", rsp);
                    },
                });
            },
        });
    }
    request(
        option = {
            showLoading: true,
        }
    ) {
        // check if url exists
        if (!option.url) {
            return false;
        }
        if (option.showLoading) {
            this.showLoading();
        }

        if (option.url === "/user/authentication") {
            return option.success({
                data: {
                    token: "b52a1f2027a609f2afe9edbb9b712940",
                },
                msg: "验证通过",
                code: 10000,
            });
        } else if (option.url === "/order/list") {
            return option.success(mock_orderlist);
        } else if (option.url === "/order/detail") {
            return option.success(mock_orderdetail);
        }

        uni.request({
            url: this.baseUrl + option.url,
            data: option.data ? option.data : {},
            header: option.header ? option.header : {},
            method: option.method ? option.method : "GET",
            success: (rsp) => {
                console.log("request finished", rsp);
                if (rsp.statusCode !== 200) {
                    // 将失败的结果返回
                    if (option.fail && typeof option.fail == "function") {
                        option.fail(rsp);
                    }
                } else {
                    if (option.success && typeof option.success == "function") {
                        option.success(rsp.data, rsp.header);
                    }
                }
            },
            fail: (rsp) => {
                console.log("request failed", rsp);
            },
            complete: (rsp) => {
                console.log("req complete");
                uni.hideLoading();
                if (option.complete && typeof option.complete == "function") {
                    option.complete(rsp.data);
                }
            },
        });
    }
    showLoading() {
        const isShowLoading = uni.getStorageSync("isShowLoading");
        if (isShowLoading) {
            uni.hideLoading();
            uni.setStorageSync("isShowLoading", false);
        }
        uni.showLoading({
            title: "加载中",
            success: () => {
                uni.setStorageSync("isShowLoading", true);
            },
            fail: () => {
                uni.setStorageSync("isShowLoading", false);
            },
        });
    }
    showToast(msg) {
        uni.showToast({
            title: msg,
            icon: "none",
            duration: 1000,
        });
    }
}

const mock_orderdetail = {
    code: 10000,
    msg: "查询成功",
    data: {
        out_trade_no: "O-cCYKY00171",
        demand: "",
        hospital_id: 5,
        hospital_name: "武汉中心医院",
        price: "0.5",
        receiveAddress: "北京",
        service_code: "pz3",
        service_id: 4,
        service_name: "就医陪诊（尊享）",
        service_stype: "15",
        starttime: 1703606400000,
        tel: "3",
        order_start_time: 1703646534976,
        transaction_id: "4200002083202312279759044358",
        trade_state: "已取消",
        time_end: 1703646552000,
        uid: "19",
        code_url: "weixin://wxpay/bizpayurl?pr=RrPBnytzz",
        other: "",
        service_state: "0",
        paidPrice: "0.5",
        area_name: "中部地区",
        service_logo_image_url: "http://159.75.169.224/uploads/20231105/90ded71dd1868829b08dae540412c039.jpeg",
        client_name: "张三",
    },
};

const mock_orderlist = {
    code: 10000,
    msg: "查询成功",
    data: [
        {
            out_trade_no: "O-TNQMN00156",
            demand: "",
            hospital_id: 5,
            hospital_name: "武汉中心医院",
            price: "0.5",
            receiveAddress: "北京",
            service_code: "pz3",
            service_id: 4,
            service_name: "就医陪诊（尊享）",
            service_stype: "15",
            starttime: 1703606400000,
            tel: "23",
            order_start_time: 1703646073614,
            transaction_id: "",
            trade_state: "已取消",
            time_end: 0,
            uid: "19",
            code_url: "weixin://wxpay/bizpayurl?pr=xnsLbB4zz",
            other: "",
            service_state: "0",
            paidPrice: "0",
            area_name: "中部地区",
            service_logo_image_url: "http://159.75.169.224/uploads/20231105/90ded71dd1868829b08dae540412c039.jpeg",
            client_name: "张三",
        },
        {
            out_trade_no: "O-cDcHE00171",
            demand: "",
            hospital_id: 5,
            hospital_name: "武汉中心医院",
            price: "0.5",
            receiveAddress: "北京",
            service_code: "pz3",
            service_id: 4,
            service_name: "就医陪诊（尊享）",
            service_stype: "15",
            starttime: 1703606400000,
            tel: "23",
            order_start_time: 1703645340979,
            transaction_id: "",
            trade_state: "已取消",
            time_end: 0,
            uid: "19",
            code_url: "weixin://wxpay/bizpayurl?pr=rwcb7Mozz",
            other: "",
            service_state: "0",
            paidPrice: "0",
            area_name: "中部地区",
            service_logo_image_url: "http://159.75.169.224/uploads/20231105/90ded71dd1868829b08dae540412c039.jpeg",
            client_name: "张三",
        },
        {
            out_trade_no: "O-WDDcJ00187",
            demand: "",
            hospital_id: 5,
            hospital_name: "武汉中心医院",
            price: "0.5",
            receiveAddress: "北京",
            service_code: "pz3",
            service_id: 4,
            service_name: "就医陪诊（尊享）",
            service_stype: "15",
            starttime: 1703692800000,
            tel: "23",
            order_start_time: 1703750271096,
            transaction_id: "",
            trade_state: "已取消",
            time_end: 0,
            uid: "19",
            code_url: "weixin://wxpay/bizpayurl?pr=GtdjpxIzz",
            other: "",
            service_state: "0",
            paidPrice: "0",
            area_name: "中部地区",
            service_logo_image_url: "http://159.75.169.224/uploads/20231105/90ded71dd1868829b08dae540412c039.jpeg",
            client_name: "张三",
        },
        {
            out_trade_no: "O-TFmCG00121",
            address: {
                userName: "张三",
                cityName: "广州市",
                countyName: "海珠区",
                detailInfo: "新港中路397号",
            },
            demand: "",
            hospital_id: 5,
            hospital_name: "武汉中心医院",
            price: "0.5",
            receiveAddress: "",
            service_code: "dp",
            service_id: 1,
            service_name: "代跑取药",
            service_stype: "40",
            starttime: 1703692800000,
            tel: "23",
            order_start_time: 1703750320908,
            transaction_id: "",
            trade_state: "已取消",
            time_end: 0,
            uid: "19",
            code_url: "weixin://wxpay/bizpayurl?pr=J2RG2Jrzz",
            other: "",
            service_state: "0",
            paidPrice: "0",
            area_name: "中部地区",
            service_logo_image_url: "http://159.75.169.224/uploads/20231105/108dd2cc5c333cffcb2911e1b159bddf.png",
        },
    ],
};

export default new Utils();
