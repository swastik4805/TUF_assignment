import { useEffect, useState } from "react"

export function AllSubmissions(){
    const [submissions, setSubmissions]=useState([]);
    useEffect(()=>{
        fetchSubmissions();
    },[]);

    const fetchSubmissions=async()=>{
        try{
            const resposnse=await fetch("http://localhost:3000/allSubmissions");
            if(resposnse.ok){
                const data=await resposnse.json();
                setSubmissions(data);
            }
            else{
                console.log("failed to fetch the data");
            }
        }
        catch(error){
            console.log("error while fetching data");
        }
    }


    return(
        <div>
            <div>All submissions</div>
            {submissions.map((it)=>
            <div key={it.id} className="flex">
                <div>{it.username}</div>
                <div>{it.stdin}</div>
                <div>{it.sourceCode}</div>
                <div>{it.codeLanguage}</div>
            </div>)}
        </div>
    )
}