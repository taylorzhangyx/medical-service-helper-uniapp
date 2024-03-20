class Utils {
  getUserInfo() {
    uni.login({
      success: function (res) {
        console.log(res);
      },
    });
  }
}

export default new Utils();
