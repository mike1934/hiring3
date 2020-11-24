/*包含所有 action creator 函数的模块
*/
import {
AUTH_SUCCESS,
ERROR_MSG,
RECEIVE_USER,
RESET_USER,
RECEIVE_USER_LIST
} from './action-types'

import {
reqRegister,
reqLogin,
reqUpdateUser,
reqUserList
} from '../api'

// 同步错误消息
const errorMsg = (msg) => ({type:ERROR_MSG, data: msg})
// 同步成功响应
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})

// 同步接收用户
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
// 同步重置用户
export const resetUser = (msg) => ({type: RESET_USER, data: msg})


/*异步注册*/
export function register({username, password, password2, type}) {
// 进行前台表单验证, 如果不合法返回一个同步 action 对象, 显示提示信息
if (!username || !password || !type) {
return errorMsg('Username and password must be entered')
}
if (password !== password2) {
return errorMsg('Password and confirm password are different')
}
return async dispatch => {
// 异步 ajax 请求, 得到响应
const response = await reqRegister({username, password, type})
// 得到响应体数据
const result = response.data
// 如果是正确的
if (result.code === 0) {
// 分发成功的 action
dispatch(authSuccess(result.data))
} else {
// 分发提示错误的 action
dispatch(errorMsg(result.msg))
}
}
}
/*
异步登陆
*/
export const login = ({username, password}) => {
  if (!username || !password) {
  return errorMsg('Username and password must be entered')
  }
  return async dispatch => {
  const response = await reqLogin({username, password})
  const result = response.data
  if (result.code === 0) {
  dispatch(authSuccess(result.data))
  } else {
  dispatch(errorMsg(result.msg))
  }
  }
  }

  /*异步更新用户
*/
export const updateUser = (user) => {
  return async dispatch => {
  // 发送异步 ajax 请求
  const response = await reqUpdateUser(user)
  const result = response.data
  if (result.code === 0) { // 更新成功
  dispatch(receiveUser(result.data))
  } else { // 失败
    dispatch(resetUser(result.msg))
}
}
}


/*异步获取用户
*/

// 用户列表
const receiveUserList = (users) => ({type: RECEIVE_USER_LIST, data: users})
// 异步获取用户列表
export const getUserList = (type) => {

return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if (result.code === 0) {
    dispatch(receiveUserList(result.data))
}
}
}

const initUserList = []

function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
  default:
    return state
 }
}

export default combineReducers({
user,
userList
})