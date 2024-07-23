import Header from "./Combonent/Header";
// import 'dotenv/config'
import Box from "./Combonent/Box";
import Search from "./Combonent/Search.jsx";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CircularIndeterminate from "./Combonent/Spinar.jsx";
import Cookie from "cookie-universal";

import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
function App() {
  const [dataFromdb, setdataFromdb] = useState([]);
  const [isactive, setisactive] = useState(true);
  const [input, setinput] = useState("");
  const [spinar, setspinar] = useState(true);

  const cookie = Cookie();
  const token = cookie.get("token");
  useEffect(() => {
    const fetchindata = async () => {
      try {
        await axios
          .get(`${import.meta.env.VITE_BACKSERVER}/spacetoon`)
          .then((da) => setdataFromdb(da.data));
      } catch (err) {
        console.log(err);
      } finally {
        setspinar(false);
      }
    };

    fetchindata();
  }, []);
  console.log( import.meta.env.VITE_FRONTSERVER);
  const checkactive = (active) => {
    setisactive(active);
  };

  const handlechange = (e) => {
    setinput(e.target.value);
  };
  const showcard = (id) => {
    <Link to={`${import.meta.env.VITE_FRONTSERVER}/SingleCard/${id}`}></Link>;
  };

  return (
    <div className={isactive ? "" : "cover"}>
      <ToastContainer />
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
                  <Link key={ob._id} to={`${import.meta.env.VITE_FRONTSERVER}/SingleCard/${ob._id}`}>
                    <Box
                      tit={ob.title}
                      img={`${import.meta.env.VITE_BACKSERVER}/imgs/${ob.imgname}`}
                      audsrc={`${import.meta.env.VITE_BACKSERVER}/audio/${ob.audsrc}`}
                      isactive={checkactive}
                      card={ob}
                      showcard={showcard}
                      garbadge={false}
                    />
                  </Link>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
