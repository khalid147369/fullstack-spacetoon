import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import CircularIndeterminate from "../Combonent/Spinar.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookie from "cookie-universal"
import Box from "../Combonent/Box.jsx";
import { useNavigate } from "react-router-dom";
import "./singlcard.css";
import axios from "axios";
const SingleCardFav = () => {
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
        if (token) {
           await axios
          .get(`http://localhost:3000/api/itemsfav/${id}`, {
            headers: { Authorization: `bearer ${token}` },
          })
          .then((data) => setItem(data.data));
        // .then(da=>console.log(da)) 
        }else{
            const config = {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
              }
            };
            try{
            await axios.get(`http://localhost:3000/api/itemsfavgoogle/${id}`,config, {
              withCredentials:true
            }).then((data) => setItem(data.data));
            // .then(da=>console.log(da))
           
           
            }catch(err){
              console.log(err)
            }
          }
        

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
    if (token) {
        try{
const fetch = await axios.delete(`http://localhost:3000/deletecard/${item._id}`, {
      headers: { Authorization: `bearer ${token}` },
  }) 
    .then(da=>toast.success(da.data.message )).catch(err=>toast.error(err.data.message));

    fetch&& setTimeout(()=>{ navigate("/login/favorites")},1000)
   console.log(fetch)
    }catch(err){
      console.log(err)
    }
    }else{
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };
      try{
      await axios.delete(`http://localhost:3000/deletecard2/${item._id}`,config, {
        withCredentials:true
      }).then(da=>toast.success(da.data.message )).catch(err=>toast.error(err.data.message));
      setTimeout(()=>{ navigate("/login/favorites") },1000)
    
      }catch(err){
        console.log(err)
      }
    }
  
   
  };
  return (
    <div>
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
            <img src={`http://localhost:3000/imgs/${item.imgname}`} />
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
              src={`http://localhost:3000/audio/${item.audsrc}`}
              type="audio/mp4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCardFav;