import {useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie"
import { Navigate, Outlet } from "react-router-dom";
import { useRef } from "react";
import Isgood from "./Isgood";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Cookie from "cookie-universal"
export default function Signin() {
  const cookie = Cookie()
    const [ name, setname] = useState("")
    const [password , setpassword] = useState("")
    const [isvisable ,setisvisable] = useState(true)
    const [issubmit , setissubmit] = useState(false)
    const [status, setstatus] = useState()
    const ref = useRef()
 const handleonsubmit = async(e)=>{

    e.preventDefault()
    
    const da = await axios.post("http://localhost:3000/login",{username :name , password:password}).catch((err)=>toast.error(err.response.data.error))
   
  //  setCookie("access-token",da.data.token)
  console.log(da.data.token)
  if (da.status === 200) {
    cookie.set("access-token" ,da.data.token)
  }
 
   
  
 
 
//  window.location.reload()
 setisvisable(false)
 
 } 


 
  return (
    <>{cookie.get("access-token")?"":<div >
     
      <ToastContainer/>
      <h1 className=" text-center relative top-20 text-3xl">admin section</h1>
      <form onSubmit={handleonsubmit}  className={isvisable?"centerize flex flex-col gap-8":" collapse centerize flex flex-col gap-8" }>
        <input className="audbtn outline-none rounded-sm" type="text" value={name} placeholder=" enter username.." onChange={(e)=>{setname(e.target.value)}} />
        <input className="audbtn outline-none rounded-sm" type="password" value={password} placeholder=" enter password.." onChange={(e)=>{setpassword(e.target.value)}} />
         <input className="audbtn cursor-pointer " type="submit"/> 
      </form>
      
    </div>}{cookie.get("access-token")?<Outlet/>:""}
      {/* {issubmit?(sessionStorage.getItem("access-token")?"":<Isgood isgood={false} Error={"username or password incorrect"}/>):""} */}
      {status == "is not exist" ?<Isgood isgood={false} Error={"username or password incorrect"}/>:""}</>
  );
}
