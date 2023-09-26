/**
 * 
 * @param {*} authKey 权限的 scope
 * @param {*} callback 回调函数
 */
export default function	userAuthorize(authKey, callback) {
  uni.getSetting({
	success: (res) => {
	  if(res.authSetting.hasOwnProperty(authKey)) {
		if(res.authSetting[authKey]) {
			callback(true)
		}else {
            // 因为现在openSetting无法直接调用了，要通过触发tap，所以如果权限是在页面加载时调用的那么这里需要调整一下，手动提示用户调用openSetting
			uni.openSetting();
			callback(false)
		}
	  }else {
		uni.authorize({
		    scope: authKey,
			success: () => {
			    callback(true)
			},fail() {
				callback(false)
			}
		})
	  }
	}
  })
}