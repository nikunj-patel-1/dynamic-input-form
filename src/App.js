import { useState } from 'react';
import './App.css';
import Input from './Input';
import data from './data/form.json';

let inputdata = JSON.parse(localStorage.getItem('formdata')) || [];

function App() {
  const [inputJson, setInputJson] = useState(data);
  

  function submitHandler(event) {
    event.preventDefault();
    localStorage.setItem('formdata', JSON.stringify(inputdata));

    console.log(inputdata);
  }

  function changeFormData(data) {
    // console.log(inputdata);
    const dataindex = inputdata.findIndex((val) => val.name === data.name);

    if(dataindex !== -1){
      const earlierInput = [...inputdata];
      earlierInput[dataindex].value = data.value;
      inputdata = earlierInput;
      // setInputdata(earlierInput);
    }
    else {
      inputdata.push(data);
      // setInputdata([...inputdata, data]);
    }
  }

  function getInputValue(name) {
    // console.log(inputdata.find(val => val.name === name).value);
    if(inputdata.length > 0)
    return inputdata.find(val => val.name === name).value || '';
  }

  // useEffect(() => {
  //   const storedData = localStorage.getItem('formdata');
  //   console.log(storedData);
  //     inputdata = JSON.parse(storedData);

  // }, []);

  return (
    <div className="App">
      <form className="form" onSubmit={submitHandler}>
        <h2>{inputJson && inputJson.form.title}</h2>
        <p>{inputJson && inputJson.form.description}</p>
        {inputJson && inputJson.form && inputJson.form.groups.map((group) => (
          <div className="group" key={Math.random()}>
            <h3>{group.title}</h3>
            {group.fields.map((field) => (
              <Input label={field.label} {...field} key={Math.random()} changeInputData={changeFormData} value={getInputValue(field.name)}/>
            ))}
          </div>
        ))}
        <div className="group">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
