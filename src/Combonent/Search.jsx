import React from 'react'

function Search({input , handlechange}) {
  return (
    <div className=' border border-black bg-gradient-to-r flex items-center my-6 from-blue-200  to-blue-600 rounded-md py-1 px-1  w-fit mx-auto h-fit  text-center relative'><i  className=" px-2 border-r border-black  text-2xl   fa-solid fa-magnifying-glass"></i><input style={{background:"none"}} className=" outline-none tol" type='text ' placeholder="ابحث عن شارة ..." value={input} onChange={handlechange}></input></div>
  )
}

export default Search