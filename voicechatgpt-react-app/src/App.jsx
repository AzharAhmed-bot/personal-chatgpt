import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex justify-center '>
      <div className='shadow-xl bg-white rounded-lg p-8 border'>
        <h1 className='text-xl font-semibold mb-4'>Current Note</h1>  
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md mb-2'>Start/Stop</button>
        <button className='bg-red-200 text-gray-800 px-4 py-2 rounded-md mb-2'>Save</button>
      </div>
    </div>
  )
}

export default App
