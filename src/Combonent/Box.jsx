import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import sounds from "../assets/audios/0425.mp4";
// import Wayves from "./Wayves";

export default function Box({
  tit,
  img,
  audsrc,
  isactive,
  deletecard,
  card,
  garbadge
}) {
  const location = useNavigate();
  const cookie = Cookie();
  const token = cookie.get("token");
  const [isVisable, setisVisable] = useState(true);
  const [isPause, setisPause] = useState(true);
  const [icnpause, seticnpause] = useState(true);
  const [toggle, settoggle] = useState(true);
  const [issaved, setissaved] = useState();
  const [animation, setanimation] = useState("");
  const [tost, setoast] = useState("");
  const [fav, setfav] = useState("favorites2");
  const rf = useRef(null);
  // const toastify = false
  const toncls = useRef(null);
  // isactive(true)
  const handleclick = () => {
    setisVisable(!isVisable);
    setisPause(true);
    rf.current.play();
    isactive(!isVisable);
    seticnpause(true);
  };
  function pauseaudio() {
    rf.current.pause();
    setisPause(!isPause);
    seticnpause(false);
    toncls.current.className = "n2cont";
  }
  function stopvideo() {
    rf.current.pause();
    rf.current.currentTime = 0;
    setisVisable(!isVisable);
    isactive(!isVisable);
  }
  function playaudio() {
    rf.current.play();
    setisPause(!isPause);
    seticnpause(true);
    toncls.current.className = "ncont";
  }
  useEffect(() => {
    const handleend = () => {
      console.log("done");
      setisVisable(true);
      toncls.current.className = "cont";
      isactive(true);
    };
    rf.current.addEventListener("ended", handleend);
  }, []);
  useEffect(() => {
    token ? setfav("favorites") : setfav("favorites2");
  }, []);
  const handlsave = async () => {
    const length = img.split("/");
    const imgtit = length[length.length - 1];
    console.log(imgtit);
    // ---------------------+
    const length2 = audsrc.split("/");
    const audtit = length2[length2.length - 1];
    console.log(audtit);
    if (token) {
      try {
        await axios
          .post(
            "http://localhost:3000/favorites",
            { name: tit, image: imgtit, audio: audtit },
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
            { name: tit, image: imgtit, audio: audtit },
            config,
            { withCredentials: true }
          )
          .then((da) => toast.success(da.data.message))
          .catch((err) => toast.error(err.response.data.message));
      } catch (err) {
        console.log(err);
      }
    }

    settoggle(false);
    setanimation("animation");
    // setTimeout(()=>{setanimation("collapsee")},1000)
  };

  return (
    <div className={isVisable ? "box " : "newbox"}>
      {/* <ToastContainer  /> */}
      <div className=" flex items-center gap-4">
      {garbadge?<i onClick={()=>{deletecard(card._id)}} className="fa-solid fa-trash text-xl text-red-500"></i>:""}
        <h3 className={isVisable ? "py-3" : " py-3 flex-1"}>{tit}</h3>


      </div>

      <div
        ref={toncls}
        // onClick={() => showcard(card._id)}
        // onClick={handleclick}
        className={isVisable ? "cont" : "ncont"}
      >
        {icnpause ? (
          <div>
            {isVisable ? (
              <i className=" icnplay fa-solid fa-play "></i>
            ) : (
              <i className="icn fa-solid fa-pause "></i>
            )}
          </div>
        ) : (
          <i className=" icnplay fa-solid fa-play "></i>
        )}
        <img className=" w-full   shadow-2xl " src={img} />
      </div>

      <div className={isVisable ? "boxdata" : "tgl"}>
        <button
          onClick={stopvideo}
          className=" bg-gradient-to-br from-blue-500 to-blue-300 hover:scale-95 px-4 py-1 rounded "
        >
          Stop
        </button>
        {isPause ? (
          <button
            onClick={pauseaudio}
            className=" bg-gradient-to-br from-blue-500 to-blue-300 hover:scale-95 px-3 py-1 rounded "
          >
            Pause
          </button>
        ) : (
          <button
            onClick={playaudio}
            className=" bg-gradient-to-br from-blue-500 to-blue-300 hover:scale-95 px-3 py-1 rounded "
          >
            Play
          </button>
        )}
      </div>
      <div className="wv"></div>
      <audio ref={rf} className="" src={audsrc} type="audio/mp4" />
    </div>
  );
}
