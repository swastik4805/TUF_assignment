import axios from "axios";
import { useEffect, useState } from "react";

interface Submission{
    id: string
    username: string
    sourceCode: string
    codeLanguage: string
    timeStamp: Date
    stdin: string
    status: string
}


export function AllSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [expectedOutput, setExpectedOutput] = useState("");
  const [submissionId, setSubmissionId] = useState("");

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("https://tuf-assignment-1.onrender.com/allSubmissions");
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      } else {
        console.log("Failed to fetch the data");
      }
    } catch (error) {
      console.log("Error while fetching data:", error);
    }
  };

  const handleRunClick = async (_submissionId:string, sourceCode:string, stdin:string) => {
    setSubmissionId(_submissionId);
    
    const userInput = prompt("Enter Expected Output:") || "";
    setExpectedOutput(userInput);
    try {
      const options = {
        method: "POST",
        url: "https://judge0-ce.p.rapidapi.com/submissions",
        params: {
          base64_encoded: "true",
          wait: "true",
          fields: "*"
        },
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          "X-RapidAPI-Key": "6b8bcb6385mshc8fe593053fea1cp136bdejsne0b7734744bb",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        },
        data: {
          language_id: 52,
          source_code: btoa(sourceCode),
          stdin: btoa(stdin),
          expected_output: btoa(expectedOutput)
        }
      };

      const response = await axios.request(options);
      const updatedSubmissions = submissions.map(submission => {
        if (submission.id === submissionId) {
          return { ...submission, status: response.data.status.description };
        }
        return submission;
      });
      setSubmissions(updatedSubmissions);
    } catch (error) {
      console.error("Error while running code:", error);
    }
  };

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
              <th className="px-4 py-2">Time Stamp</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td className="border px-4 py-2">{submission.username}</td>
                <td className="border px-4 py-2">{submission.stdin}</td>
                <td className="border px-4 py-2">
                  {submission.sourceCode.length > 200
                    ? submission.sourceCode.substring(1, 200) + "..."
                    : submission.sourceCode}
                </td>
                <td className="border px-4 py-2">{submission.codeLanguage}</td>
                <td className="border px-4 py-2">{submission.timeStamp.toLocaleString()}</td>
                <td className="border px-4 py-2">
                  <div
                    className="bg-green-400 px-4 py-2 cursor-pointer"
                    onClick={() => handleRunClick(submission.id, submission.sourceCode, submission.stdin)}
                  >
                    Run
                  </div>
                  {submission.status && <div>{submission.status}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
