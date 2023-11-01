import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('datafile', file);
        
        try {
            const response = await axios.post('http://127.0.0.1:5000/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(response.data.result_image);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="bg-white p-4 rounded-md shadow-md w-1/3">
                <input type="file" onChange={handleFileChange} className="mb-4" />
                <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">Analyze</button>
            </div>
            {result && <img src={`http://127.0.0.1:5000/${result}`} alt="Analysis Result" />}
        </div>
    );
}