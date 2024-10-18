import { useState, useEffect } from "react";

export default function Input({ label, type, name, changeInputData, ...props }) {

    const [inputVal, setInputVal] = useState('');

    useEffect(() => {
        setInputVal(props.value);
    }, []);

    function changeValue(event) {
        if (type === 'checkbox') {
            // console.log('checkbox change', event.target.value);
            if (!inputVal) {
                setInputVal([event.target.value]);
                changeInputData({
                    name: name,
                    value: [event.target.value]
                });
            }
            else {
                setInputVal((prev) => {
                    let newVal;
                    if(prev.includes(event.target.value)){
                        newVal = prev.filter(val => val !== event.target.value);
                    }
                    else newVal = [...prev, event.target.value];
                    changeInputData({
                        name: name,
                        value: newVal
                    });
                   return newVal;
            });    
            }  
        }
        else if(type === 'radio') {
            console.log('radio change', event.target.value);
            setInputVal(event.target.value);
            changeInputData({
                name: name,
                value: event.target.value
            });
        }
        else {
            setInputVal(() => event.target.value);
            changeInputData({
                name: name,
                value: event.target.value
            });
        }
    }

    return (
        <div className="input">
            <label className="label">{label}: </label>
            {type === 'text' &&
                <input {...props} value={inputVal} onChange={changeValue} />}
            {type === 'textarea' &&
                <textarea {...props} value={inputVal} onChange={changeValue} />}
            {type === 'dropdown' &&
                <select name={props.name} required={props.required} value={inputVal} onChange={changeValue}>
                    <option value="" disabled>Select</option>
                    {props.options.map((option) => (
                        <option label={option} value={option} key={Math.random()} />
                    ))
                    }
                </select>}
            {type === 'radio' &&
                <div className="radio">
                    {props.options.map((option) => (
                        <div key={Math.random()}>
                            <input type="radio" value={option.value} name={props.name} required={props.required} onChange={changeValue} checked={inputVal === option.value}/>
                            <label>{option.value}</label>
                        </div>
                    ))}
                </div>
            }
            {type === 'number' &&
                <input type="number" {...props} value={inputVal} onChange={changeValue} />}

            {type === 'checkbox' &&
                <div className="checkbox" >
                    {props.options.map((option) => (
                        <div key={Math.random()}>
                            <input type="checkbox" value={option.value} name={props.name} required={props.required} onChange={changeValue} checked={inputVal && inputVal.includes(option.value)}/>
                            <label htmlFor={option.value}>{option.label}</label>
                        </div>
                    ))}
                </div>
            }
            {type === 'slider' &&
                <input type="range" {...props} onChange={changeValue} value={inputVal}/>}

        </div>
    )
}