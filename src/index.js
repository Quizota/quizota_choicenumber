import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  // <App amount='150'/>,
  <App />,
  document.getElementById('root')
);

// for(var i = 1; i <= this.props.amount; i++){
//     if((i % root) === 1){
//       selection.push(this.renderRow(temp))
//       temp = []
//     }

//     // var color = randomColor[Math.floor(Math.random()*randomColor.length)]
//     var color = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
//     temp.push(<td key={"td_"+i}><Number key={"number_"+i} number={i} color={color}/></td>)
// }