import {useState} from "react";
import { useRef } from "react";

export default function Isgood({isgood ,Success , Error}) {
  const {transparent , settransparent} = useState(false);
  const ref = useRef()
    const handleclick = ()=>{
    ref.current.style = "display:none"
    }

  return (
    <div ref={ref} className=" absolute w-screen h-52 bg-gradient-to-bl from-blue-950 to-blue-300 to-transparent  top-1/2 left-1/2 flex flex-col items-center justify-center  -translate-x-1/2 -translate-y-1/2 ">
      {isgood === true? <div>
           <i className=" text-6xl flex flex-col items-center text-green-400 fa-solid fa-check-to-slot">
             {Success}
           </i>
         </div>:isgood===false?<div>
           <i className="fa-solid fa-rectangle-xmark text-4xl flex flex-col items-center text-red-600">
             
             {Error}
           </i>
         </div>:""} 
         <button onClick={handleclick} className="text-4xl text-blue-400 my-2">Ok</button>
       </div>
    
     
  );
}
