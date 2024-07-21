import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Isgood from "./Isgood";
import { useCookies } from "react-cookie";
import { useLocation , useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Addcard() {
  const [value, setvalue] = useState("");
  const [file, setfile] = useState();
  const [aud, setaud] = useState();
  const [card, setcard] = useState();
  const [checkbox, setcheckbox] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [isposted, setisposted] = useState(null);
  const [toggle ,settoggle] = useState(false)
  const [cookie, setCookie] = useCookies(["access-token"]);
  // onClick.window.document.body() = ()=>{
  //   console.log("teest")
  // }
  // const img = useRef()
  const navigate = useNavigate()
  const text = useRef();
  const audio = useRef(null);
  const imgfile = useRef(null);
  const btnref = useRef();
  const check = useRef();
  const handlechange = (e) => {
    setfile(e.target.files[0]);
    const img = e.target.files[0];
    if (img) {
      const imageURL = URL.createObjectURL(img);
      setImageSrc(imageURL);
    }
  };
  console.log(imageSrc);
  const handlechange2 = (e) => {
    setaud(e.target.files[0]);
  };
  // console.log(html);

  const handleclick = (e) => {
    e.preventDefault();
    if (value && file && aud && checkbox) {
      const newform = new FormData();
      newform.append("title", value);
      newform.append("program", checkbox);
      newform.append("image", file);
      newform.append("audio", aud);
      const data = axios
        .post("http://localhost:3000/creatcard", newform)
        .then((da) => setcard(da.status))
        .catch((err) => toast.error(err.response.data.error));
      // toast(err.response.data.error)
      console.log(data);
      if (card === 200) {
        imgfile.current.value = null;
        check.current.checked = false;
        setImageSrc("");
        setvalue("");
        audio.current.value = null;
        toast.success("created successfuly");
      }
    } else {
      toast.error("all fealds must be filled");
    }

    // setisposted(true);
  };
  const handlelogout = () => {
    setCookie("access-token", "");
    sessionStorage.clear();
    //  localStorage.removeItem("id")
    window.location.reload();
  };

  console.log(checkbox);
  // console.log(checkbox2 )
  return (
    <div className="   centering">
      <i onClick={()=>{navigate("/admin/manage")}} className="fa-solid fa-list-check text-2xl p-5 rounded-full bg-blue-600 hover:bg-blue-400 absolute right-0 top-1/4 mr-5"></i>
      <div className="text-end absolute right-8 top-4">
        <i onClick={()=>{settoggle(!toggle)}} className="fa-solid text-blue-800 text-2xl fa-circle-info "></i>
        <ol
          start={1}
          className={ toggle?"bg-gradient-to-bl from-blue-800 to-blue-200 relative z-20 p-2 text-start w-72 flex flex-col gap-2 rounded":"hidden"} 
        >
          <li className="flex" >
            ✍️<p className=" w-64">   Make sure that image size is 500x500</p></li > 
            
          
           <li className="flex">✍️<p className=" w-64">if you have lag when send data try to refrech page and try again</p></li>
          <li className="flex">✍️<p className=" w-64"> when you complete send data dont forget log out</p></li>
        </ol>
      </div>
      <ToastContainer />
      <form onSubmit={handleclick} className="addcard absolute ">
        <label
          className="imgbox overflow-hidden h-60 w-60 absolute bottom-48 bottom-40 cursor-pointer rounded-md bg-slate-500"
          htmlFor="upload"
        >
          <img className=" w-full relative z-10  " src={imageSrc} />
          <p className="centerizee ">Upload Img</p>
          <i className="centerize text-4xl fa-solid fa-cloud-arrow-up"></i>
        </label>
        {console.log(value + file + aud)}

        <input
          ref={imgfile}
          type="file"
          onChange={handlechange}
          hidden
          id="upload"
          accept="image/*"
          // required
        />

        <div className="">
          <input
            ref={text}
            className="audbtn outline-none rounded-sm"
            onChange={(e) => setvalue(e.target.value)}
            placeholder="enter title..."
            value={value}
          />
        </div>

        <div>
          <label className="audbtn cursor-pointer " htmlFor="aud">
            <i className=" mr-2 fa-solid fa-file-audio"></i>enter audio
          </label>
          <input
            ref={audio}
            type="file"
            id="aud"
            hidden
            onChange={handlechange2}
            accept="audio"
          />
        </div>

        <div className="flex gap-2">
          <input
            ref={check}
            type="radio"
            name="program"
            value="spacetoon"
            onChange={(e) => {
              setcheckbox(e.target.value);
            }}
          />
          spacetoon
          <input
            ref={check}
            type="radio"
            name="program"
            value="spacepower"
            onChange={(e) => {
              setcheckbox(e.target.value);
            }}
          />
          spacepower
        </div>

        <button
          className="audbtn cursor-pointer "
          onClick={handleclick}
          type="submit"
        >
          <i className=" mr-2 fa-solid fa-paper-plane"></i>send
        </button>
      </form>
      {/* {isposted === false ? (
        <div>
          <Isgood isgood={isposted} Error={"Error make sure  all the fields are filled and refresh"} />
        </div>
      ) : (
        ""
      )}
      {isposted === true ? (
        <div>
          <Isgood isgood={isposted} Success={"Upload"} />
        </div>
      ) : (
        ""
      )} */}

      <button
        className="audbtn cursor-pointer m-3 px-3 py-2 font-semibold text-red-500  rounded-sm "
        ref={btnref}
        onClick={handlelogout}
      >
        logout
      </button>
    </div>
  );
}
