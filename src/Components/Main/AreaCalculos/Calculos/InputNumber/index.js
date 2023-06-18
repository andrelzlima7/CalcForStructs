import React from "react";

export const InputNumber = ({placeholder, label, value, onChange}) =>{
    return(
        <div>
            <label htmlFor="inputNumber">{label}</label>
            <input
                className="slide-in-top"
                onChange={onChange}
                value={value}
                id="inputNumber" 
                type="number" 
                placeholder={placeholder}>
            </input>
        </div>
    )
}