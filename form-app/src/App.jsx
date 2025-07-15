import './App.css'
import FormInput from './components/FormInput'
import { useRef, useState } from 'react';


const App =() => {
  const usernameRef = useRef();
  const [values, setValues] = useState({
    username:"",
    email:"",
    bithday:"",
    password:"",
    confirmPassword:""

  });

  const inputs=[
    {  
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      errorMessage:"username 1 to 20 char",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
      
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage:"it should be valid email",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
      required: false,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      errorMessage:"Password should be chars and other staff",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,

    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      errorMessage:"Not match",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) =>{
    e.preventDefault();
    const data = new FormData(e.target)
    console.log(usernameRef)
    console.log(Object.fromEntries(data.entries()))
  }  

  //kanei update amesos
  const onChange= (e)=> {
    setValues({...values, [e.target.name]: e.target.value})
  }

  console.log(values)
  return (
  <div className='app'>

    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      {inputs.map((input) =>
      (
        <FormInput 
        key={input.id} 
        {...input} 
        value={values[input.name]}
        onChange={onChange}  
        />
      ))
      }
      <button>Submit</button>
    </form>
  </div>)
}

export default App
