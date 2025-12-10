import React from 'react'

const StudentModify = () => {
  return (
    <div className='mt-5'>
        <h1 className='text-4xl font-bold'>School Control</h1>
       <div className='flex flex-row mt-5 justify-between'>
        <div className='flex flex-col bg-gray-300 '>
            <button className='bg-blue-600 text-white p-2 w-64 rounded cursor-pointer'>Edit Data</button>
            <p>Edit students roll no. name and class</p> 
        </div>
        <div className='flex flex-col bg-gray-300 '>
            <button className='bg-green-600 text-white p-2 rounded cursor-pointer'>Promote</button>
            <p>Promote students to upper class</p> 
        </div>
        <div className='flex flex-col bg-yellow-300 '>
            <button className='bg-gray-600 text-white p-2 rounded cursor-pointer'>Test Case</button>
            <p>This button doesn't do anything </p> 
        </div>   
    </div> 
    </div>
    
  )
}

export default StudentModify