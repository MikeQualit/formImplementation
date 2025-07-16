import './App.css'
import FormInput from './components/FormInput'
import { useRef, useState, useEffect, useMemo} from 'react';
import Select from "react-select";


const App =() => {
  const usernameRef = useRef();
  const [showForm, setShowForm] = useState(true);

  // 1. Hold raw customer data
  const [customers, setCustomers] = useState([])

  // 2. Track the current input in the Select’s text field
  const [inputValue, setInputValue] = useState('')

  // 3. Fetch all customers once on mount
  useEffect(() => {
    fetch(
      'https://686547495b5d8d0339808f5d.mockapi.io/spitogatos/api/customer-email-lookup'
    )
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error('Failed to load customers', err))
  }, [])

    // 4. Map your API data into { value, label } form
  const options = useMemo(
    () =>
      customers.map(({ name, email, id }) => ({
        value: email,
        label: email, 
        searchableLabel: name,email,
        name,
        id,
      })),
    [customers]
  )

    // 5. Filter locally by the user’s input
  const filteredOptions = useMemo(() => {
    if (!inputValue) return options
    return options.filter((opt) =>
      opt.searchableLabel.toLowerCase().includes(inputValue.toLowerCase())
    )
  }, [options, inputValue])

  // 6. Handlers for react-select
  const [selectedOptions, setSelectedOptions] = useState([])
  const handleChange = (opts) => setSelectedOptions(opts || [])
  const handleInputChange = (val) => setInputValue(val)
 const selectEmails = (options) => {
  setSelectedOptions(options)
}


  const [values, setValues] = useState({
    username:"",
    email:"",
    bithday:"",
    password:"",
    confirmPassword:""

  });
  const handleCancel = () => {
  setValues({
    username: "",
    email: "",
    bithday: "",
    password: "",
    confirmPassword: ""
  });
};


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
    {showForm ? (
    <form onSubmit={handleSubmit}>
      <div className="form-header">   
          <h1>Email sent form</h1>                
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className='closeButton'
          >
            ×
          </button> 
      </div>
          <Select
            isMulti
            options={filteredOptions}
            value={selectedOptions}
            onChange={handleChange}
            onInputChange={handleInputChange}
            placeholder="Type to search customers…"
            noOptionsMessage={() =>
              inputValue ? 'No matches found' : 'Type to search'
            }
          />
          <footer className="form-footer">
            <button
            onClick={() => {
              setSelectedOptions(options)
              setValues(v => ({
                ...v,
                recipients: options.map(o => o.value)
              }))
            }}
            className='cancel-button'
          >
            Enter all customers
          </button>
            <button type="button" onClick={() => setSelectedOptions([])}>
              Remove all clients
            </button>
          </footer>
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
      <button type="button" onClick={handleCancel} className="cancel-button">
        Cancel
      </button>
    </form> 
          ) : (
        <button onClick={() => setShowForm(true)}>Open Form</button>
      )}
  </div>
  )}

export default App
