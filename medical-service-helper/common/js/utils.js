class Utils {
  constructor() {
    this.baseUrl = "http://159.75.169.224:7300/pz";
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

    if (option.url == "/user/authentication") {
      return option.success({
        data: {
          token: "b52a1f2027a609f2afe9edbb9b712940",
        },
        msg: "验证通过",
        code: 10000,
      });
    }

    uni.request({
      url: this.baseUrl + option.url,
      data: option.data ? option.data : {},
      header: option.header ? option.header : {},
      method: option.method ? option.method : "GET",
      success: (rsp) => {
        if (rsp.data.code != 10000) {
          // 将失败的结果返回
          if (option.fail && typeof option.fail == "function") {
            option.fail(rsp);
          }
        } else {
          if (option.success && typeof option.success == "function") {
            option.success(rsp.data);
          }
        }
      },
      fail: (rsp) => {
        console.log(rsp);
      },
      complete: () => {
        uni.hideLoading();
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

export default new Utils();
