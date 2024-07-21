import Header from "./Combonent/Header";
import Box from "./Combonent/Box";
import Search from "./Combonent/Search.jsx";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CircularIndeterminate from "./Combonent/Spinar.jsx";
import Cookie from "cookie-universal"
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
function App() {
  const [dataFromdb, setdataFromdb] = useState([]);
  const [isactive, setisactive] = useState(true);
  const [input, setinput] = useState("");
  const [spinar, setspinar] = useState(true);
  
  const cookie = Cookie()
  const token = cookie.get("token")
  useEffect(() => {
    const fetchindata = async () => {
      try {
        await axios
          .get("http://localhost:3000/spacetoon")
          .then((da) => setdataFromdb(da.data));
      } catch (err) {
        console.log(err);
      } finally {
        setspinar(false);
      }
    };

    fetchindata();
    
  }, []);
  
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
  // const handlsave = async () => {
  //   const length = img.split("/");
  //   const imgtit = length[length.length - 1];
  //   console.log(imgtit);
  //   // ---------------------+
  //   const length2 = audsrc.split("/");
  //   const audtit = length2[length2.length - 1];
    // try {
    //   const data = await axios
    //     .post(
    //       "http://localhost:3000/favorites",
    //       {
    //         name: tit,
    //         image: imgtit,
    //         audio: audtit,
    //       },
    //       { headers: { Authorization: `bearer ${token}` } }
    //     )
    //     .then((da) => console.log(da));
    //   console.log(data);
    // } catch (err) {
    //   console.log(err);
    // }

    // settoggle(!toggle);

    // localStorage.setItem("issaved", toggle);
    // const issaved = localStorage.getItem("issaved");
    // // settoggle(issaved)
  // };
  // const local = cookie.get("toast")
  // local?toast( cookie.get("toast")):""
  const showcard =(id)=>{
    <Link to={`SingleCard/${id}`}></Link>
  }
  return (
    <div className={isactive ? "" : "cover"}>
     <ToastContainer/>
      <div className="  m-auto h-px ">
        <Header />

        <Search input={input} handlechange={handlechange} />

        {/* <Nav/> */}
        <div
          className={`  grid max-[520px]:mr-8 max-[620px]:mx-0 max-[620px]:px-0 max-[767px]:grid-cols-2 md:grid-cols-3 lg:pl-10 lg:pr-14 lg:grid-cols-4 xl:grid-cols-5 gap-4 ml-11 mt-3 screenhight `}
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
                return (
                  <Link key={ob._id} to={`http://localhost:5173/SingleCard/${ob._id}`}><Box
                   
                    tit={ob.title}
                    img={`http://localhost:3000/imgs/${ob.imgname}`}
                    audsrc={`http://localhost:3000/audio/${ob.audsrc}`}
                    isactive={checkactive}
                    card={ob}
                    showcard={showcard}
                    garbadge={false}
                  /></Link>
                  
                );
              })
          )}
        </div>

        {/* <Box tit = "test"/> */}
      </div>
      {/* <h1>{isactive}</h1> */}
    
    </div>
  );
}

export default App;
