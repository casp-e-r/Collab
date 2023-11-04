import React from 'react'
interface InputProps{
    id:string;
    label:string;
    type:string;
}

const input = () => {
  return (
    <div>
        <input className='peer w-ull p-4 pt-6 outline-none font light border-2 rounded-md transition disabled:opacity-70
        '/>

    </div>
  )
}

export default input