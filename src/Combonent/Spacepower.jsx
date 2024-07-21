import { useState, useEffect } from "react";
import axios from "axios";
import Box from "./Box";
import Search from "./Search";
import { Link } from "react-router-dom";
import CircularIndeterminate from "./Spinar";
function Spacepower() {
  const [data, setdata] = useState([]);
  const [isactive, setisactive] = useState(true);
  const [input,setinput] = useState("");
  const [spinar , setspinar] = useState(true)
  useEffect(() => {
    const fetchingdata = ()=>{
      try{
        axios.get("http://localhost:3000/spacepower")
      .then((da) => setdata(da.data)); 
      // .then(da=>console.log(da))
      }catch(err){
        console.log(err)
      }finally{
        setspinar(false)
      }
     
    }
    fetchingdata()
      
  }, []);
  const checkactive = (active) => {
    setisactive(active);
  };
  const handlechange = (e)=>{
    setinput(e.target.value);
    
  }
  return (
    <div className={isactive ? "" : "cover"}>

       <Search input={input} handlechange={handlechange}/>
     
      <div
        className={`  grid max-[520px]:mr-8 max-[620px]:mx-0 max-[620px]:px-0 max-[767px]:grid-cols-2 md:grid-cols-3 lg:px-10 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-11 mt-3 `}
      >
        {spinar ? (
            <div className="center">
              <CircularIndeterminate />
            </div>
          ) :
        data.filter((item)=>{
            return input === ""?item :item.title.toLowerCase().includes(input)
          }).map((ob) => {
          return (
            <Link key={ob._id} to={`http://localhost:5173/SingleCard/${ob._id}`}><Box
              key={ob.id}
              tit={ob.title}
              img={`http://localhost:3000/imgs/${ob.imgname}`}
              audsrc={`http://localhost:3000/audio/${ob.audsrc}`}
              isactive={checkactive}
            /></Link>
          );
        })}
      </div>
    </div>
  );
}

export default Spacepower;
