import React, { useState, useEffect, useRef } from "react";
import { Link, useParams ,useNavigate } from "react-router-dom";
import CircularIndeterminate from "./Spinar.jsx";
import Box from "./Box.jsx";
import Cookie from "cookie-universal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./singlcard.css";
import axios from "axios";
const DeleteCard = () => {
    const navigate = useNavigate();
    const cookie = Cookie()
  const [isPause, setisPause] = useState(true);
  const [isplay, setisplay] = useState(false);
  const rf = useRef(null);
  const toncls = useRef();
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
const token = cookie.get("token")
  useEffect(() => {
    const fetchItem = async () => {
      try {
        
           await axios
          .get(`${import.meta.env.VITE_BACKSERVER}/api/items/${id}`
            
          )
          .then((data) => setItem(data.data))
        // .then(da=>console.log(da))
        .catch(err=>console.log(err))
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);
  console.log(rf)
  // useEffect(() => {
    const handleend =async () => {

    setisplay(false)
      toncls.current.className = "cardimg";

    };

  if (loading) return <div className="center"><CircularIndeterminate/></div>;



  function playaudio() {
    rf.current.play();
    setisPause(!isPause);
    setisplay(true)
    toncls.current.className = "ncardimg";
  }
  function pauseaudio() {
    rf.current.pause();
    setisPause(!isPause);
    setisplay(false)
    toncls.current.className = "n2cont";
  }
  function stopvideo() {
    rf.current.pause();
    setisplay(false)
    rf.current.currentTime = 0;
    toncls.current.className = "cardimg";
  }
  const deletecard = async () => {
   
        try{
await axios.delete(`${import.meta.env.VITE_BACKSERVER}/dleteitem/${item._id}`) 
    .then(da=>toast.success(da.data.message )).catch(err=>toast.error(err.data.message));

    
  
    }catch(err){
      console.log(err)
    }
    
   
  };
  return (
    <div style={{ fontFamily: "Noto Kufi Arabic, sans-serif"}}>
        <ToastContainer/>
       
      <div className="card">
        <p onClick={()=>navigate("/login/favorites")} className=" absolute right-2 md:right-8 top-2 cursor-pointer text-2xl">❌</p>
        <div className="cardcontainer"> 
        <div className=" flex gap-10  ">
            <h1 className="  mt-5 mb-5 text-2xl "> {item.title}</h1>
            <div className="flex items-center  gap-3">
            <i onClick={deletecard} className="fa-solid fa-trash text-xl text-red-500"></i>
              <p className="text-2xl">delete</p>
            </div>
          </div>
            <div className={isplay?"effecs":""}>
            <div ref={toncls} className=" cardimg ">
            <img src={`${import.meta.env.VITE_BACKSERVER}/imgs/${item.imgname}`} />
          </div>    
            </div>
          
          <div className="controle   ">
          <div className=" flex gap-4">
            <button
              onClick={pauseaudio}
              className="bg-gradient-to-br from-blue-500 to-blue-300 hover:scale-95 px-4 py-1 rounded"
            >
              pause
            </button>
            <button
              onClick={stopvideo}
              className="bg-gradient-to-br from-blue-500 to-blue-300 hover:scale-95 px-4 py-1 rounded"
            >
              stop
            </button>
           </div>
            
            <button
              onClick={playaudio}
              className=" bg-gradient-to-br from-blue-500 w-full to-blue-300 hover:scale-95 px-4 py-1 rounded "
            >
              play
            </button>
            <audio
            onEnded={handleend}
              ref={rf}
              className=""
              src={`${import.meta.env.VITE_BACKSERVER}/audio/${item.audsrc}`}
              type="audio/mp4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCard;