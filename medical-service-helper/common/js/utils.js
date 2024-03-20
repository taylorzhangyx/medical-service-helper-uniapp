class Utils {
  constructor() {
    this.baseUrl = "http://159.75.169.224:7300/pz";
  }
  getUserInfo() {
    uni.login({
      success: (res) => {
        console.log(res);
        this.request({
          url: "/auth/wxLogin",
          data: {
            code: res.code,
          },
          success: (rsp) => {
            console.log(rsp);
          },
        });
      },
    });
  }
  request(
    option = {
      showLoading: false,
    }
  ) {
    // check if url exists
    if (!option.url) {
      return false;
    }
    if (option.showLoading) {
      this.showLoading();
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
}

export default new Utils();
