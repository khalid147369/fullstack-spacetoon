// import Nav from "./Combonent/Nav.jsx";
// import Header from "./Combonent/Header";
import Box from "../Combonent/Box.jsx";
import Search from "../Combonent/Search.jsx";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";
import Cookie from "cookie-universal";
import CircularIndeterminate from "./Spinar.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
function Favorites() {
  const navigate = useNavigate()
  const cookie = Cookie();
  const [dataFromdb, setdataFromdb] = useState([]);
  const [isactive, setisactive] = useState(true);
  const [input, setinput] = useState("");
  const [spinar, setspinar] = useState(true);
  const [selected, setselected] = useState("");
  // const [Data, SetData] = useState([]);
  // useEffect(() => {
  //   SetData(Dataim);
  // }, []);
  const token = cookie.get("token");
 const googleId = cookie.get("googleId");
 useEffect(() => {
   const fetchdata = async () => {
      
        if (token) {
          try {
          await axios
          .get("http://localhost:3000/chousedfav", {
            headers: { Authorization: `bearer ${token}` },
          })
          .then((da) => setdataFromdb(da.data));
      } catch(err) { 
        console.log(err);
      } finally {
        setspinar(false);
      }
        }else{
          try {
            const config = {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
              }
            };
          await axios
          .get("http://localhost:3000/chousedfav2",config, {
            withCredentials:true
          })
          .then((da) => setdataFromdb(da.data));
      } catch(err) {
        console.log(err);
      } finally {
        setspinar(false);
      }
        }
        
    };
    fetchdata();
    
  }, []);
 
  // -----------------------------------
  const checkactive = (active) => {
    //  if (active) {
    //   console.log(active)
    //  }else{
    //   console.log(active)
    //  }
    setisactive(active);
  };
  //  checkactive()
  const handlechange = (e) => {
    setinput(e.target.value);
  };
  console.log(dataFromdb);
  // const deletecard = ()=>{

  // }
  console.log(token)

  
  return (
    <>{token || googleId ?(<div className={isactive ? "" : "cover"}>
      <ToastContainer />
      <div className="  m-auto h-px ">
        {/* <Header /> */}

        <Search input={input} handlechange={handlechange} />

        {/* <Nav/> */}
        <div
          className={`  grid max-[520px]:mr-8 max-[620px]:mx-0 max-[620px]:px-0 max-[767px]:grid-cols-2 md:grid-cols-3 lg:px-10 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-11 mt-3 `}
        >
          {spinar ? (
            <div className="center">
              <CircularIndeterminate />
            </div>
          ) : (
            dataFromdb
              .filter((item) => {
                return input === ""
                  ? item
                  : item.title.toLowerCase().includes(input);
              })
              .map((ob) => {
                console.log(ob._id);
                return (
                  <Link key={ob._id} to={`http://localhost:5173/SingleCardfav/${ob._id}`}><Box
                    key={ob._id}
                    tit={ob.title}
                    img={`http://localhost:3000/imgs/${ob.imgname}`}
                    audsrc={`http://localhost:3000/audio/${ob.audsrc}`}
                    isactive={checkactive}
                    hide={true}
                    hidegarbadge={true}
                    
                    card={ob}
                  /></Link>
                );
              })
          )}
        </div>

        {/* <Box tit = "test"/> */}
      </div>

      {/* <h1>{isactive}</h1> */}
    </div>):(navigate("/login")) }</>
    
  );
}
export default Favorites;
