import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home(){
    const [codeLanguage, setCodeLanguage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options = ['C', 'C++', 'Java', 'JavaScript', 'Python']; // Define your options array here
  
  const [username, setUsername]=useState("");
  const [stdin, setStdin]=useState("");
  const [sourceCode,setSourceCode]=useState("");
    const navigate=useNavigate();

  const handleSelect = (option: string) => {
    setCodeLanguage(option);
    setIsOpen(false);
  };



  const handleSubmit= async()=>{
    try{
        const success=await axios.post("https://tuf-assignment-1.onrender.com/insertUser",{
        username,
        codeLanguage,
        stdin,
        sourceCode
        })
        if(success) alert("submission successful");
        else if(!success) alert("you forgot to select a language or there is a server problem.")
        console.log(success);
    }
    catch{
        alert("you either forgot to select a language or we have a server problem :(");
    }
    
  }

  const handleAllSubmissions=()=>{
    navigate("/allSubmissions")
  }

  return (
    <div className='bg-red-100  justify-center'>
      <div className='p-4'>
        <div className="dropdown">
          <button className="dropdown-toggle bg-blue-200 p-2 rounded shadow" onClick={() => setIsOpen(!isOpen)}>
            {codeLanguage || 'Click here to select language'}
          </button>
          {isOpen && (
            <ul className="dropdown-menu">
              {options.map((option, index) => (
                <li key={index} onClick={() => handleSelect(option)}>
                  <div className="bg-green-100 w-24 p-1 cursor-pointer">{option}</div>
                </li>
              ))}
            </ul>
          )}
        </div>


        <br></br> <br></br>

        <div className='flex'>
          <div className="pr-3 pt-2">
            Username
          </div>
          <textarea placeholder='striver@123' className='pl-2' onChange={(e)=>{
            setUsername(e.target.value);
          }}></textarea>
        </div>

        <br></br> <br></br>

        <div>Please paste the stdin here</div>
        <textarea id="message" rows={8} className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="your stdin goes here"
        onChange={(e)=>{
          setStdin(e.target.value);
        }}
        ></textarea>
       
        <br></br> <br></br>

        <div>Please paste the source code here</div>
        <textarea id="message" rows={8} className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="your source code goes here"
        onChange={(e)=>{
          setSourceCode(e.target.value);
        }}
        ></textarea>
      
        <br></br> <br></br>

        <div className="flex">

        <div className='flex justify-center bg-green-300 rounded p-2 w-24 shadow cursor-pointer' onClick={handleSubmit}>Submit</div>
      
        <div className="pl-4">
            <div className='flex justify-center bg-blue-300 rounded p-2 w-48 shadow cursor-pointer' onClick={handleAllSubmissions}>All Submissions</div>
        </div>
        </div>
      </div>
    </div>
  );
}