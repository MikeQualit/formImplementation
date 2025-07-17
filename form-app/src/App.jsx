import './App.css'
import FormInput from './components/FormInput'
import { useState, useEffect, useMemo} from 'react';
import Select from "react-select";


const App =() => {
  const [showForm, setShowForm] = useState(true);

  // Get today's date
  const today = new Date().toISOString().split("T")[0];

  // Hold data
  const [customers, setCustomers] = useState([])

  // Track the current input
  const [inputValue, setInputValue] = useState('')

  
  useEffect(() => {
    fetch(
      'https://686547495b5d8d0339808f5d.mockapi.io/spitogatos/api/customer-email-lookup'
    )
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error('Failed to load customers', err))
  }, [])

  // Map API data
  const options = useMemo(
    () =>
      customers.map(({ name, email, id }) => ({
        value: email,
        label: `${name} <${email}>`,
        name,
        email,
        id,
      })),
    [customers]
  )


  const filteredOptions = useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    return q
      ? options.filter(
          ({ name, email }) =>
            name.toLowerCase().includes(q) || email.toLowerCase().includes(q)
        )
      : options;
  }, [options, inputValue]);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = (selected) => {
  setSelectedOptions(selected || []);
  setInputValue(''); 
};

  const handleInputChange = (val) => setInputValue(val)


  const [values, setValues] = useState({
    subject:"",
    textemail:"",
    sentdate:""

  });
  const handleCancel = () => {
  setValues({
    subject: "",
    textemail: "",
    sentdate: ""
  });

  
};


  const inputs=[
    {  
      id: 1,
      name: "subject",
      type: "text",
      placeholder: "Subject",
      label: "Subject",
      errorMessage:"at least 10 characters",
      minLength: 10,
      required: true,
      
    },
    {
      id: 2,
      name: "textemail",
      type: "textarea",  
      placeholder: "text for email",
      label: "Text (optional)",
      errorMessage:"Add a text",
      maxLength: 3000, 
      required: false,
    },
    {
      id: 3,
      name: "sentdate",
      type: "date",
      placeholder: "Date",
      label: "Schedule email sending (optional)",
      required: false,
      min: today,
    },
  ];

  const handleSubmit = (e) =>{
    e.preventDefault();
    // Check if any recipients are selected
  if (selectedOptions.length === 0) {
    alert("Please select at least one email.");
    return;
  }
  // Check empty text
if (values.textemail.trim() === '') {
    const userChoice = window.confirm(
      "The email text is empty. Auto-complete with default text or Cancel to proceed without text."
    );
    
    if (userChoice) {
      // Auto-complete with default text
      setValues({
        ...values,
        textemail: "Dear customer,\n\nThank you for your interest."
      });
      return; 
    }

  }

  setShowForm(false);
    const data = new FormData(e.target)
    console.log(Object.fromEntries(data.entries()))
    const selectedEmails = selectedOptions.map(opt => opt.value);

    console.log({
      selectedEmails
    });
    alert("Email submited");
  }  

  // auto update
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
            className="fixed-select"
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
              type="button"
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
        <div className='app close'><button onClick={() => setShowForm(true)}>Open Form</button></div>      
        
      )}
  </div>
  )}

export default App
