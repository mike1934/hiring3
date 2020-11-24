/*
注册的路由组件
 */

import React, {Component} from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'


class Register extends Component {
  state = {
    username: '',  // 用户名
    password: '',  // 密码
    password2: '',  // 确认密码
    type: 'talent',  // 用户类型名称   dashen/laoban
  }


  // 处理输入数据的改变: 更新对应的状态
  handleChange = (name, val) => {
    // 更新状态
    this.setState({
      [name]: val  // 属性名不是name, 而是name变量的值
    })
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  // 点击注册调用
  register = () => {
    //console.log(this.state)
    this.props.register(this.state)
  }


  render() {
    const {type} = this.state
    const {redirectTo,msg} = this.props.user
    // 如果redirectTo有值, 就需要重定向到指定的路由
    if(redirectTo) {
      return <Redirect to={redirectTo}/>
    }

    return (
      <div>
        <NavBar>Best Hiring NZ</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            {msg ? <div className='error-msg'>{msg}</div> : null}
            <WhiteSpace/>
            <InputItem placeholder='Enter username' onChange={val => {this.handleChange('username', val)}}>Username:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='Enter password' type="password" onChange={val => {this.handleChange('password', val)}}>Password:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='Enter password again' type="password" onChange={val => {this.handleChange('password2', val)}}>Confirm:</InputItem>
            <WhiteSpace/>
            <List.Item>
              <span>Type:</span>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type==='Talent'} onChange={() => this.handleChange('type', 'Talent')}>Talent</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='Boss'}  onClick={() => this.handleChange('type', 'Boss')}>Boss</Radio>
            </List.Item>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>Registered</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>Existing account</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {register}
)(Register)