import React, {Component} from 'react'
import './index.css'

class User extends Component {
    render(){
        return(
            <div>
                <img src={this.props.user.avatar}/>
                <span>Name: {this.props.user.displayName}</span>
                <span>Point: {this.props.score}</span>
            </div>
        )
    }
}

module.exports = User