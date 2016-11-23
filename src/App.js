import React, { Component } from 'react';
import Number from './number.js'
import socket from './socket.js'
// var randomColor = ["#d9fe60", "#e90b92", "#653ff9", "#00a829", "#a6267b", "#74796b", "#d954e9", "#64cefc", "#982c2e"]
let temp = 0

class App extends Component {
  constructor(props, context){
    super(props, context)

    this.state = {showGame: false,
                  numberArray: [],
                  user: null,
                 }

    socket.on('data', res => {
        console.log(res)

        // If user join lobby
        if(res.code === 2){
          this.setState({user: res.data.profile})

        // If user join board
        } else if(res.code === 5){
          this.setState({showGame: true})
          this.setState({numberArray: res.data.data})

        // If a user click on a number 
        } else if(res.code === 7){
          // If same username
          if(res.data.username === this.state.user.username){
            // Change child State
            
          }
        }
        console.log(res.data)
    })
  }

  
  renderRow(rowData){
    return(
      <tr key={"tr_"+(temp++)}>
        {rowData}
      </tr>
    )
  }

  onLoginClick(){
      // let data = JSON.stringify({ "cmd": "autoRegister", "data": { "displayName": "phuong"} })
      let data = JSON.stringify({ "cmd": "syncGameData", "data": {"cmd": "gameAction", "data": { "pickNumber": "1"} } })
      socket.emit('data', data)
  }

  
  onPlayClick(){
      let data = JSON.stringify({ "cmd": "playNow", "data": {} })
      socket.emit('data', data)
  }

  renderButton(){
      return (
      <div>
        <button onClick={this.onLoginClick} id="login">Login</button>
        <button onClick={this.onPlayClick} id="play">Play</button>
      </div>
    )
  }

  renderGame(){
    var temp = []
    var selection = []
    let root = Math.floor(Math.sqrt(this.state.numberArray.length))

    this.state.numberArray.map(function(num, index){
      if((++index % root) === 1){
          selection.push(this.renderRow(temp))
          temp = []
      }

        var color = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        temp.push(<td key={"tr_"+num}>
                    <Number key={"number_"+num} number={num} socket={socket} color={color}/>
                  </td>)      
    })

    // for(var i = 1; i <= this.props.amount; i++){
    //     if((i % root) === 1){
    //       selection.push(this.renderRow(temp))
    //       temp = []
    //     }

    //     // var color = randomColor[Math.floor(Math.random()*randomColor.length)]
    //     var color = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
    //     temp.push(<td key={"td_"+i}><Number key={"number_"+i} number={i} color={color}/></td>)
    // }

    if(temp.length != 0){
      selection.push(this.renderRow(temp))
    }

    return (
      <div>
        <table>
          <tbody>
            {selection}          
          </tbody>
        </table>
        <button onClick={this.onLoginClick} id="login">Pick 1</button>
      </div>
    )
  }

  render() {
    if(this.state.showGame){
      return this.renderGame()
    } else {
      return this.renderButton()
    }
  }
}

export default App;
