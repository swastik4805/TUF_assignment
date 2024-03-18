import React, { useState } from 'react';
// import Dropdown from './Dropdown'; // Assuming Dropdown component is in a separate file
import './App.css';
import axios from 'axios';


//selectedOption
//username
//stdin
//sourceCode

function App() {
  const [codeLanguage, setCodeLanguage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options = ['C', 'C++', 'Java', 'JavaScript', 'Python']; // Define your options array here
  
  const [username, setUsername]=useState("");
  const [stdin, setStdin]=useState("");
  const [sourceCode,setSourceCode]=useState("");


  const handleSelect = (option: string) => {
    setCodeLanguage(option);
    setIsOpen(false);
  };


  const handleSubmit= async()=>{
    const success=await axios.post("http://localhost:3000/insertUser",{
      username,
      codeLanguage,
      stdin,
      sourceCode
    })
    console.log(success);
  }

  return (
    <div className='bg-red-100 flex flex-cols-1 justify-center'>
      <div className='p-4'>
        <div className="dropdown">
          <button className="dropdown-toggle bg-blue-200 pb-4 rounded" onClick={() => setIsOpen(!isOpen)}>
            {codeLanguage || 'Click here to select language'}
          </button>
          {isOpen && (
            <ul className="dropdown-menu">
              {options.map((option, index) => (
                <li key={index} onClick={() => handleSelect(option)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>


        <br></br> <br></br>

        <div className='flex'>
          Username
          <textarea placeholder='striver@123' className='pl-2' onChange={(e)=>{
            setUsername(e.target.value);
          }}></textarea>
        </div>

        <br></br> <br></br>

        <div>Please paste the stdin here</div>
        <textarea id="message" rows="4" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="your stdin goes here"
        onChange={(e)=>{
          setStdin(e.target.value);
        }}
        ></textarea>
       
        <br></br> <br></br>

        <div>Please paste the source code here</div>
        <textarea id="message" rows="4" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="your code goes here"
        onChange={(e)=>{
          setSourceCode(e.target.value);
        }}
        ></textarea>
      
        <br></br> <br></br>

        <div className='flex justify-center bg-green-300 rounded p-2' onClick={handleSubmit}>Submit</div>
      
      </div>
    </div>
  );
}

export default App;
