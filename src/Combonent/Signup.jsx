import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Signup() {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [datadb, setdata] = useState();
  const navigate = useNavigate();
  const handleonsubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3000/users", {
          username: name,
          password: password,
        })

        .then((da) => {
          if (da.status == 200) {
            toast.success("registered successfuly");
            setname("");
            setpassword("");

            setTimeout(() => {
              navigate("/login");
            }, 1200);
          }
        })
        .catch((err) =>
          err.response.data.errors.map((er) => toast.error(er.msg))
        );

      // console.log(datadb);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2 className=" flex justify-center p-6 mt-7 text-4xl font-bold ">
        Sign-up
      </h2>
      <form onSubmit={handleonsubmit} className="centerize flex flex-col gap-6 ">
        <div className=" flex flex-col gap-2">
        
          <input
            className="audbtn outline-none rounded-sm"
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
            type="text"
            value={password}
            placeholder=" enter password.."
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </div>
        <input className="audbtn cursor-pointer  " type="submit" />
      </form>
      
      <div className=" absolute top-2/3 mt-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            you have account?
            <Link className=" underline text-green-700  " to={"http://localhost:5173/login"}>log in</Link>
          </div>
     
    </div>
  );
}

export default Signup;
