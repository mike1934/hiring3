/*用户个人中心路由组件
*/
import React from 'react'
import {Result, List, WhiteSpace, Modal, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'
const Item = List.Item
const Brief = Item.Brief

class Personal extends React.Component {

    handleLogout = () => {
    Modal.alert('Quit', 'Are you sure to logout?', [
    {
    text: 'Cancel',
    onPress: () => console.log('cancel')
    },
    {
    text: 'Confirm',
    onPress: () => {
    // 清除 cookie 中的 userid
    Cookies.remove('userid')
    // 重置 redux 中的 user 状态
    this.props.resetUser()
    }
    }
    ])

    }

    render() {

    const {username, header, post, info, salary, company} = this.props.user

    return (
       <div style={{marginTop: 50}}>
            <Result
            img={<img src={require(`../../assets/images/${header}.png`)} style={{width:
            50}} alt="header"/>}
            title={username}
            message={company}
            />

    <List renderHeader={() => 'Related Information'}>
        <Item multipleLine>
            <Brief>Post: {post}</Brief>
            <Brief>Information: {info}</Brief>
            {salary ? <Brief>Salary: {salary}</Brief> : null}
        </Item>
    </List>
    <WhiteSpace/>

    <List>
       <Button onClick={this.handleLogout} type='warning'>Sign out</Button>
    </List>
</div>
)
}
}

export default connect(
state => ({user: state.user}),
{resetUser}
)(Personal)