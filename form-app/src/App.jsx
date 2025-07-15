import './App.css'
import FormInput from './components/FormInput'
import { useRef } from 'react';


const App =() => {
  const usernameRef = useRef();

console.log("re-rendered")
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(usernameRef)
  }  
  return <div className='app'>

    <form onSubmit={handleSubmit}>
      <FormInput ref={usernameRef} placeholder="Username"/>
      <FormInput/>
      <FormInput/>
      <FormInput/>
      <FormInput/>
      <button>Submit</button>
    </form>
  </div>
}

export default App
