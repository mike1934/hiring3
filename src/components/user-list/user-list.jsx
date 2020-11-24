/*用户列表的 UI 组件
*/
import React from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'

const Header = Card.Header
const Body = Card.Body

class UserList extends React.Component {

static propsTypes = {
userList: PropTypes.array.isRequired
}

render() {
return (
    <WingBlank>
        {
        this.props.userList.map(user => (
        <div key={user._id}>
        <WhiteSpace/>

        <Card>

        <Header
            thumb={user.header ?
            require(`../../assets/images/${user.header}.png`) : null}
            extra={user.username}
            />

        <Body>
            <div>Post: {user.post}</div>
            {user.company ? <div>Company: {user.company}</div> : null}
            {user.salary ? <div>Salary: {user.salary}</div> : null}
            <div>Information: {user.info}</div>
        </Body>

        </Card>
        </div>
        ))
        }
    </WingBlank>
)
}
}
export default UserList