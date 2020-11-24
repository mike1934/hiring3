import React ,{Component} from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'

class TalentInfo extends Component {
    render () {
        return (
            <div>
                <NavBar>Improve talent information</NavBar>
                <HeaderSelector />
                <InputItem>Job posts:</InputItem>
                <TextareaItem title="Profile:"
                     rows={3}
                                                            />
                <Button type='primary'>Save</Button>
            </div>
        )
    }
}

export default connect ( 

) (TalentInfo)