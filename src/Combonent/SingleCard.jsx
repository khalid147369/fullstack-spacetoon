import React, { useState, useEffect, useRef } from "react";
import { Link, useParams ,useNavigate } from "react-router-dom";
import CircularIndeterminate from "../Combonent/Spinar.jsx";
import Box from "../Combonent/Box.jsx";
import Cookie from "cookie-universal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./singlcard.css";
import axios from "axios";
const SingleCard = () => {
  const navigate = useNavigate()
  const cookie = Cookie();
  const [isPause, setisPause] = useState(true);
  const [isplay, setisplay] = useState(false);
  const rf = useRef(null);
  const toncls = useRef();
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, settoggle] = useState(true);
  const [animation, setanimation] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        await axios
          .get(`http://localhost:3000/api/items/${id}`)
          .then((data) => setItem(data.data));
        // .then(da=>console.log(da.data))

        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);
  console.log(rf);
  // useEffect(() => {
  const handleend = async () => {
    toncls.current.className = "cardimg";
    setisplay(false);
  };

  if (loading)
    return (
      <div className="center">
        <CircularIndeterminate />
      </div>
    );

  console.log(item._id);

  function playaudio() {
    rf.current.play();
    setisPause(!isPause);
    setisplay(true);
    toncls.current.className = "ncardimg";
  }
  function pauseaudio() {
    rf.current.pause();
    setisPause(!isPause);
    setisplay(false);
    // toncls.current.className = "n2cont";
    toncls.current.className = "n2cont";

  }
  function stopvideo() {
    rf.current.pause();
    rf.current.currentTime = 0;
    toncls.current.className = "cardimg";
    setisplay(false);
  }
  const token = cookie.get("token");
  const handlsave = async () => {
    setanimation("animations");
    if (token) {
      try {
        await axios
          .post(
            "http://localhost:3000/favorites",
            { name: item.title, image: item.imgname, audio: item.audsrc },
            { headers: { Authorization: `bearer ${token}` } }
          )
          .then((da) => toast.success(da.data.message))
          .catch((err) => toast.error(err.response.data.message));
      } catch (err) {
        console.log(err);
      }
    } else {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      };
      try {
        await axios
          .post(
            "http://localhost:3000/favorites2",
            { name: item.title, image: item.imgname, audio: item.audsrc },
            config,
            { withCredentials: true }
          )
          // .catch((da) => console.log(da.response.data.message))
          .then((da) => toast.success(da.data.message))
          .catch((err) => toast.error(err.response.data.message));
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="card">
      <p onClick={()=>navigate("/")} className=" absolute right-2 md:right-8 top-2 cursor-pointer text-2xl">❌</p>
        <div className="cardcontainer ">
          <div className=" flex gap-10  ">
            <h1 className="  mt-5 mb-5 text-2xl "> {item.title}</h1>
            <div className="flex items-center  gap-3">
              <i
                onClick={handlsave}
                className={`${animation} text-yellow-400 cursor-pointer fa-solid fa-star  text-2xl `}
              ></i>
              <p className="text-2xl">safe</p>
            </div>
          </div>

          <div className={isplay ? "effecs" : ""}>
            <div ref={toncls} className=" cardimg ">
              <img src={`http://localhost:3000/imgs/${item.imgname}`} />
            </div>
          </div>

          <div className="controle  flex flex-col gap-4  w-52">
            <div className=" flex gap-4">
              <button
                onClick={pauseaudio}
                className="bg-gradient-to-br from-blue-500 to-blue-300 hover:scale-95 px-4 py-1 rounded"
              >
                pause
              </button>
              <button
                onClick={stopvideo}
                className="bg-gradient-to-br from-blue-500  to-blue-300 hover:scale-95 px-4 py-1 rounded"
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

export default SingleCard;
