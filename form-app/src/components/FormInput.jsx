import { useState } from "react";
import "./fromInput.css"

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const {label, errorMessage, onChange, id, value, maxLength,...inputProps} = props;

    const handleFocus = () =>{
        setFocused(true);
    };
    const isTextarea = inputProps.type === "textarea";

    return (
    <div className="formInput">
      <label>{label}</label>

      {isTextarea ? (
        <div className="textareaWrapper">
          <textarea

            maxLength={maxLength}
            {...inputProps}
            value={value}
            onChange={onChange}
            onBlur={handleFocus}
            onFocus={handleFocus}
            focused={focused.toString()}
            className="textareaField"
          />
          <span style={{ visibility: focused ? "visible" : "hidden" }}>
            {errorMessage}
          </span>
          <span>{value.length}/{maxLength}</span>
        </div>
      ) : (
        <input
          {...inputProps}
          value={value}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={handleFocus}
          focused={focused.toString()}
        />
      )}

      <span>{errorMessage}</span>
    </div>)

}

export default FormInput;