// 邮箱功能校验
export function CheckUserEmail(data) {
    const passwordRegex = /^\w+@[\da-z\.-]+\.([a-z]{2,6}|[\u2E80-\u9FFF]{2,3})$/;
    return passwordRegex.test(data)?true:false
}
// 昵称功能校验
export function CheckUserAccount(data) {
    const maxLength = 10
    const minLength = 2
    return (data.length > minLength && data.length < maxLength)?true:false
}
// 姓名功能校验
export function CheckUserName(data) {
    const maxLength = 10
    const minLength = 2
    return (data.length >= minLength && data.length < maxLength)?true:false
}
//手机功能校验
export function CheckUserPhone(data) {
    return (data.length >= 9 && data.length <= 1)?true:false
}
//密码功能校验
export function CheckUserPassword(data) {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[A-Z]|.*[a-z]).{5,20}$/;
    return passwordRegex.test(data)?true:false
}
