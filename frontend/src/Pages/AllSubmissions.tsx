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


    return (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">All Submissions</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Stdin</th>
                  <th className="px-4 py-2">Source Code</th>
                  <th className="px-4 py-2">Code Language</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="border px-4 py-2">{submission.username}</td>
                    <td className="border px-4 py-2">{submission.stdin}</td>
                    <td className="border px-4 py-2">{submission.sourceCode.length>100?submission.sourceCode.substring(1,100)+"...":submission.sourceCode}</td>
                    <td className="border px-4 py-2">{submission.codeLanguage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      
      
}