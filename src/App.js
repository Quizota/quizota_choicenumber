import React, { Component } from 'react';
import Number from './number.js'
import User from './User.js'
import socket from './socket.js'
// var randomColor = ["#d9fe60", "#e90b92", "#653ff9", "#00a829", "#a6267b", "#74796b", "#d954e9", "#64cefc", "#982c2e"]
let temp = 0

class App extends Component {
  constructor(props, context){
    super(props, context)

    this.renderNumber = this.renderNumber.bind(this)

    this.state = {showGame: false,
                  numberArray: [],
                  user: null,
                  opponent: null,
                  userScore: 0,
                  opponentScore: 0,
                  socket: socket
                 }

    socket.on('data', res => {

        // If user join lobby
        if(res.code === 2){
          this.setState({user: res.data.profile})


        // When opponent join board
        } else if(res.code === 3){
          this.setState({opponent: res.data.user})

        } else if(res.code === 9){
          if(res.data.user){
            this.setState({opponent: res.data.user})
          }

        // When user join board, draw board
        } else if(res.code === 5){
          this.setState({showGame: true})

          var selection = []
          let root = Math.floor(Math.sqrt(this.state.numberArray.length))

          res.data.data.map(function(number, index){

            var color = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
            selection.push({number: number,
                            color: color,
                            selected: false
                          })      
          })

          this.setState({numberArray: selection})

        // If a user click on a number 
        } else if(res.code === 7){
 
          // Change child State
          this.numberSelected(res.data.pickNumber)

          // set score
          // If same username
          if(res.data.userName === this.state.user.userName){
            this.setState({userScore: res.data.score})
          } else {
            this.setState({opponentScore: res.data.score}) 
         }

        }

        console.log(res)
        console.log(res.data)
    })
  }

  numberSelected(number){
    var arr = this.state.numberArray

    // Loop and update Object in array
    for (var i = 0; i < arr.length; i++) {
      if(arr[i].number === number){
        arr[i] = {  number: number,
                    color: arr[i].color,
                    selected: true
                 }
        break
      }
    }

    // console.log("rerender")
    this.setState({numberArray: []})
    this.setState({numberArray: arr})
    console.log("New Array: ")
    console.log(this.state.numberArray)
}
  
  onPlayClick(){
      let data = JSON.stringify({ "cmd": "playNow", "data": {} })
      socket.emit('data', data)
  }

  renderButton(){
      return (
      <div>
        <button onClick={this.onPlayClick} id="play">Play</button>
      </div>
    )
  }


  renderNumber(num){
    return(
      <li key={"li_"+num.number}>
        <Number key={"number_"+num.number} selected={num.selected} number={num.number} color={num.color} socket={this.state.socket}/>
      </li>
    )
  }

  renderUser(user, score){
    return(
      <User key={"user_"+user.userName} user={user} score={score}/> 
    )
  }

  renderGame(){
    return (
      <div>
        <ul className="ul__board">
          {this.state.numberArray.map(this.renderNumber)}
        </ul>

        {this.renderUser(this.state.user, this.state.userScore)}
        {this.renderUser(this.state.opponent, this.state.opponentScore)}
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
