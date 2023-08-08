import { Component } from 'react'
import './App.css'

// 궁금한 점 : 현재는 클래스형 컴포넌트를 쓰지 않고, 함수형 컴포넌트
// 쓰는 이유가 무엇인가 ?
class AddNumber extends Component {
  render(){
    return(
      <div>
        <h1>Add Number</h1>
        <input type='button' value='+'></input>
        <input type='text' value='0'></input>
      </div>
    )
  }
}

class AddNumberRoot extends Component{
  render(){
    return (
      <div>
        <h1>Add Number Root</h1>
      </div>
    )
  }
}

function App() {
  
  return (
    <>
      <div className='App'>
        <h1>Root</h1>
        <AddNumberRoot></AddNumberRoot>
        <AddNumber></AddNumber>
      </div>

    </>
  )
}

export default App
