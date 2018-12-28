/**
 * 小程序配置文件
 */
var apiUrl = "https://zjgsujiaoxue.applinzi.com/index.php/Api"
//云端cid是10008，本地是140558
// var apiUrl = "http://127.0.0.1/zjgsujiaoxue/1/index.php/Api"
var appid = "wxbf9778a9934310a1"

var config = {
  //  下面的地址配合云端 Server 工作
  apiUrl,
  appid,
  wxUrl: `${apiUrl}/Weixin/`,
  userUrl: `${apiUrl}/User/`,
  courseId: 10044
};

module.exports = config