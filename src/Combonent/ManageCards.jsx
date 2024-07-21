import Header from "../Combonent/Header";
import Box from "../Combonent/Box";
import Search from "../Combonent/Search.jsx";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CircularIndeterminate from "../Combonent/Spinar.jsx";
import Cookie from "cookie-universal";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link , useNavigate } from "react-router-dom";
function ManageCards(visible) {
    const navigate = useNavigate()
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
    setisactive(active);
  };

  const handlechange = (e) => {
    setinput(e.target.value);
  };

  const showcard = (id) => {
    <Link to={`SingleCard/${id}`}></Link>;
  };
  const deletecard = (id)=>{
try{
const dlt = axios.delete(`http://localhost:3000/dleteitem/${id}` ).then((da) => toast.success(da.data.message)).catch((err) => toast.error(err.response.data.message));
if (dlt) {
     setTimeout(()=>{ window.location.reload()},1000)
}
}catch(err){
    console.log(err)
}
  }
  return (
    <div className={isactive ? "" : "cover"}>
        { <div  ><div className="  m-auto h-px ">
        <Header />

        <Search input={input} handlechange={handlechange} />
        <i onClick={()=>{navigate("/admin/admin")}} className="fa-solid fa-arrow-right text-2xl  absolute left-3/4 ml-5 top-36 p-5 rounded-full bg-blue-600 hover:bg-blue-400"></i>
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
   
                  
                    <Box
                    key={ob._id}
                      tit={ob.title}
                      img={`http://localhost:3000/imgs/${ob.imgname}`}
                      audsrc={`http://localhost:3000/audio/${ob.audsrc}`}
                      isactive={checkactive}
                      card={ob}
                      showcard={showcard}
                      deletecard={deletecard}
                    />
                  
                );
              })
          )}
        </div>
      </div><ToastContainer /></div>
      }
      
    </div>
  );
}

export default ManageCards;
