import "./fromInput.css"

const FormInput = (props) => {
    return (
    
    <div className="formInput">
        <input ref={props.refer} placeholder={props.placeholder}/>
    </div>
)
}

export default FormInput;