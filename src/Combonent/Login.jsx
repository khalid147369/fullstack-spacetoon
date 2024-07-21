import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import Cookie from "cookie-universal";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import googlei from "../assets/imgs/descarga (1).png";
function Login() {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [status, setstatus] = useState();
  const [data, setdata] = useState();
  const cookie = Cookie();
  const navigate = useNavigate();
  // useEffect(()=>{ ;},[])

  const handleonsubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await axios
        .post("http://localhost:3000/logusers", {
          username: name,
          password: password,
        })
        .then((da) => {
          da.data && navigate("/");
          cookie.set("token", da.data.token);
          localStorage.setItem("id", da.data.adminId);
        })

        .catch((err) => toast.error(err.response.data.error));
      // setstatus(err.response.data.error)
      console.log(data);
      if (!data) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const token = cookie.get("token");

  const loginwithgoogle = () => {
    window.open("http://localhost:3000/auth/google/callback", "_self");
  };

  const googleId = cookie.get("googleId");
  console.log();
  return (
    <>
      {token || googleId ? (
        ""
      ) : (
        <div>
          <ToastContainer />

          <h2 className=" flex justify-center p-6 mt-7 text-4xl font-bold ">
            Log-in
          </h2>
          <form onSubmit={handleonsubmit} className="centerize flex flex-col gap-6 ">
            <div className=" flex flex-col gap-2">
              
              <input
                className="audbtn outline-none rounded-sm "
                type="text"
                value={name}
                placeholder=" enter username.."
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </div>
            <div className=" flex flex-col gap-2">
             
              <input
                className="audbtn outline-none rounded-sm"
                type="password"
                value={password}
                placeholder=" enter password.."
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>

            <input className="audbtn cursor-pointer" type="submit" />
            <button type="button"
              className=" bg-blue-500 flex items-center  rounded  "
              onClick={loginwithgoogle}
            >
           
              <span className=" relative h-10 bg-white p-2 rounded-tl rounded-bl">
                <img className=" w-6 " src={googlei} />
              </span>
              <p className=" ml-2 text-white">Signin with google</p>
            </button>
          </form>
          <div className=" absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            you dont have account?
            <Link className=" underline text-green-700  " to={"http://localhost:5173/signup"}>Sign up</Link>
          </div>
        </div>
      )}
      {token || googleId ? <Outlet /> : <Navigate to="/login" />}
    </>
  );
}

export default Login;
