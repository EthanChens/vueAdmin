import service from "@/utils/request.js";
console.log(process.env.VUE_APP_BASEURL)/*
 * 获取验证码
 */
export function getCode(data) {
  return service.request({
    method: "post",
    url: "/user/12345",
    data
  });
}
/*
 * 登录
 */
export function login() {}
/*
 *注册
 */
export function register() {}
/*
 * 获取用户角色
 */
export function getUserRole() {}
