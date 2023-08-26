import React, { useState, useEffect } from "react";
const SpeechRecognition =window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();
mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

export default function Saver() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("");
  const [saveNotes, setSaveNotes] = useState([]);

  // useEffect(() => {
  //   if(isListening){
  //       mic.start()
  //       mic.onresult= (event)=>{
  //           // console.log(event.results)
  //           const transcript=Array.from(event.results)
  //           .map((result)=>result[0])
  //           .map((words)=>words.transcript)
  //           .join("")
  //           // console.log(transcript)
  //           setNote(transcript)
  //       }
  //   }
  //   else{
  //       mic.stop()
  //   }
  // }, [isListening]);
  useEffect(() => {
    const handleMicResult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((words) => words.transcript)
        .join("");
      setNote(transcript);
    };

    if (isListening) {
      mic.addEventListener("result", handleMicResult);
      mic.start();
    } else {
      mic.removeEventListener("result", handleMicResult);
      mic.stop();
    }

    return () => {
      mic.removeEventListener("result", handleMicResult);
    };
  }, [isListening]);

  const handleSave = () => {
    if (note) {
      setSaveNotes([...saveNotes, note]);
      setNote("");
    }
  };

  const savedNotesContainer = saveNotes.map((note, index) => (
    <div key={index} className="bg-gray-100 p-3 rounded-md mb-2">
      <p>{note}</p>
    </div>
  ));

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg bg-white rounded-lg p-6 border w-96">
        <h1 className="text-2xl font-semibold mb-4">Voice Note Saver</h1>
        <button
          onClick={() => setIsListening((prev) => !prev)}
          className={`${
            isListening ? "bg-red-500" : "bg-blue-500"
          } text-white px-4 py-2 rounded-md mb-2 transition-colors duration-300`}
        >
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
        <button
          onClick={handleSave}
          disabled={!note}
          className={`${
            !note ? "opacity-50 cursor-not-allowed" : ""
          } bg-red-500 text-white m-3 px-4 py-2 rounded-md mb-2 transition-opacity duration-300`}
        >
          Save Note
        </button>
        {note && (
          <div className="bg-yellow-100 p-3 rounded-md mb-3">
            <p>{note}</p>
          </div>
        )}
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Saved Notes</h2>
          <div className="border rounded-lg p-4 bg-gray-100">
            {savedNotesContainer}
          </div>
        </div>
      </div>
    </div>
  );
}
