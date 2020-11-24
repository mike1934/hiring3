//Main component

import React,{Component} from 'react'
import { Route,Switch,Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'


import BossInfo from '../boss-info/boss-info'
import TalentInfo from '../talent-info/talent-info'

import Talent from '../talent/talent'
import Boss from '../boss/boss'

import Message from '../message/massage'
import Personal from '../personal/personal'

import NotFound from '../../components/notfound/notfound'
import NavFooter from '../../components/nav-footer/nav-footer'


import {getRedirectPath} from '../../utils'



class Main extends React.Component {

    navList = [
        {
        path: '/boss', // 路由路径
        component: Boss,
        title: 'talent list',
        icon: 'talent',
        text: 'Talent',
        },
        {
        path: '/talent', // 路由路径
        component: Talent,
        title: 'boss list',
        icon: 'boss',
        text: 'Boss',
        },
        {
        path: '/message', // 路由路径
        component: Message,
        title: 'Message list',
        icon: 'message',
        text: 'message',
        },
        {
        path: '/personal', // 路由路径
        component: Personal,
        title: 'Personal',
        icon: 'personal',
        text: 'Personal',
        }
        ]

       

    render () {

        // 得到当前请求的 path
        const pathname = this.props.location.pathname
        // 判断用户是否已登陆(过)(cookie 中 userid 是否有值)
        const userid = Cookies.get('userid')

        if (!userid) { // 如果没值, 自动跳转到登陆界面
        return <Redirect to='/login'/>
        }
        // cookie 中有 userid
        // redux 中的 user 是否有数据

        const {user} = this.props
        if (!user._id) {
        return null // 不做任何显示
        } else {
        // 请求根路径时, 自动 跳转到对应的用户主界面
        if (pathname === '/') {

        const path = getRedirectPath(user.type, user.header)
        return <Redirect to={path}/>
        }
        // 指定哪个 nav 应该被隐藏

        if (user.type === 'laoban') {
            this.navList[1].hide = true
            } else {
            this.navList[0].hide = true
            }
            }
    // 得到当前的 nav
    const currentNav = this.navList.find(nav => nav.path === pathname)


        return (

            <div>
                {currentNav ? <NavBar className='stick-top'>{currentNav.title}</NavBar> : null}
                    <Switch>
                        <Route path='/bossinfo' component={BossInfo}></Route>
                        <Route path='/talentinfo' component={TalentInfo}></Route>
                        <Route path='/talent' component={Talent}></Route>
                        <Route path='/boss' component={Boss}></Route>
                        <Route path='/message' component={Message}></Route>
                        <Route path='/personal' component={Personal}></Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                {currentNav ? <NavFooter unReadCount={this.props.unReadCount}
                navList={this.navList}/> : null}
            </div>
        )
    }
} 

export default connect(
    state => ({user: state.user}),
   
    )(Main)
