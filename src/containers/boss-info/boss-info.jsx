import React ,{Component} from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'

import {updateUser} from '../../redux/actions'

class BossInfo extends Component {

    state = {
        header: '', // 头像名称
        info: '', // 职位简介
        post: '', // 职位名称
        company: '', // 公司名称
        salary: '' // 工资
        }
        handleChange = (name, val) => {
        this.setState({[name]: val})
        }
        // 设置更新 header
        setHeader = (header) => {
        this.setState({header})
        }


    render () {

        const {user} = this.props
            // 如果用户信息已完善, 自动跳转到 laoban 主界面
            if(user.header) {
            return <Redirect to='/boss'/>
            }


        return (
            <div>
                <NavBar>Improve boss information</NavBar>
                <HeaderSelector setHeader = {this.setHeader}/>
                <InputItem onChange = {val => this.handleChange('post',val)}>Post</InputItem>
                <InputItem onChange = {val => this.handleChange('company',val)}>Company</InputItem>
                <InputItem onChange = {val => this.handleChange('salary',val)}>Salary</InputItem>
                <TextareaItem title="Job Requirements"
                     rows={3}
                     onChange = {val => this.handleChange('info',val)} />                                   
                <Button type='primary' onClick = {() => this.props.updateUser(this.state)}>Save</Button>
            </div>
        )
    }
}

export default connect ( 
    state => ({user: state.user}),
{updateUser}

) (BossInfo)