import React, {Component} from 'react'
import './index.css';

class Number extends Component{
    constructor(props, context){
        super(props, context)

        this.handleSelected = this.handleSelected.bind(this)

        this.state = {selected: this.props.selected,
                      color: {borderColor: this.props.color,
                              color: this.props.color}    
        }
    }

    handleSelected(){        
        // this.setState({selected: true})
        let data = JSON.stringify({ "cmd": "syncGameData", "data": {"cmd": "gameAction", "data": { "pickNumber": this.props.number} } })
        this.props.socket.emit('data', data)
    }

    renderNormal(){
        return(
            <span className="div__numberCircle" key={this.props.number+2000} 
                  style={this.state.color} onClick={this.handleSelected} >
                {this.props.number}
            </span>            
        )
    }
    
    renderSelected(){
        return(
            <span className="div__numberCircle--selected" key={this.props.number+2000} 
                  style={this.state.color} >
                {this.props.number}
            </span>
        )
    }

    render(){
        if(!this.state.selected){
            return this.renderNormal()
        } else {
            return this.renderSelected()
        }
    }
}

module.exports = Number