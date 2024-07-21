import spacetoonlogo from "../assets/spacetoon-logo.png";
import spacepowerlogo from "../assets/unnamed-removebg-preview.png";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";
import axios from "axios";

export default function Nav() {
  console.log(location.pathname);
  const [barr, setbarr] = useState(false);
  const [storsp, setstorsp] = useState(true);
  // const [loging, setloging] = useState("sign up");
  const [thetoken, setthetoken] = useState("");
  const [active, setactive] = useState(false);
  const [userdata, setuserdata] = useState();
  const [toggle, settoggle] = useState(true);
  const ref2 = useRef();
  const spacetoon = useRef();
  const spacepower = useRef();
  const favorites = useRef();
  const cookie = Cookie();
  const handlclick = () => {
    setbarr(!barr);
    barr
      ? (ref2.current.style = "display:none ")
      : (ref2.current.style = "display:block");
  };
  useEffect(() => {
    if (location.pathname == "/spacepower") {
      setstorsp(false);
    }
  }, []);
  const handleroute = () => {
    setstorsp(true);
    ref2.current.style = "display:none ";
    setbarr(!barr);
  };
  const handleroute2 = () => {
    setstorsp(false);
    ref2.current.style = "display:none ";
    setbarr(!barr);
  };
  const token = cookie.get("token");

  const handllogout = () => {
    cookie.remove("token");
    setthetoken("Log in");
  };
  const logoutgoogle = () => {
    window.open("http://localhost:3000/logout", "_self");
    cookie.remove("googleId");
  };

  console.log(userdata);
  useEffect(() => {
    token ? setthetoken("Log out") : setthetoken("Log in");
  }, []);
  // useEffect(() => {
  //  const currentpath =  location.pathname;
  //   switch (currentpath) {
  //     case '/':
  //       spacetoon.current.classList = "active"
  //       break;
  //     case '/spacepower':

  //     spacepower.current.classList = "active"

  //       break;
  //     case '/login/favorites':
  //       favorites.current.classList = "active"

  //       break;
  //     default:
  //       "";
  //   }

  // }, []);
  const { pathname } = useLocation();
  console.log(pathname);

  const fetchdata = async () => {
    try {
      await axios
        .get("http://localhost:3000/login/success", { withCredentials: true })
        .then((da) => {
          setuserdata(da.data);
        });

      // .then(da=>console.log(da.data))
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
  console.log(userdata);
  userdata
    ? cookie.set("googleId", userdata.googleId)
    : cookie.remove("googleId");
  const googleId = cookie.get("googleId");
  const width = window.innerWidth > 786;
  const maxwidth = window.innerWidth < 786;
  useEffect(() => {
    maxwidth && setactive(true);
  }, []);
  return (
    <div className="nav relative top-0 flex items-center justify-between">
      <div>
        {storsp ? (
          <img className=" w-20" src={spacetoonlogo} alt="logo" />
        ) : (
          <img className=" w-12 my-1" src={spacepowerlogo} alt="logo" />
        )}
      </div>
      {/* <img className=" " style={{width:"50px", height:"50px"}} src={"https://lh3.googleusercontent.com/a/ACg8ocLAZnhBBvZJTyArqg6k-vpwaRYYMRleHkZAmC8rWOO2cjRDIg=s96-c"}/> */}

      <ul
        ref={ref2}
        style={{ display: "none", transition: "1s" }}
        className="sidebarr  "
      >
        {/* <li><img className=" w-8 h-8" src={userdata.image}/></li> */}
        <div className=" md:flex md:flex-col md:items-center  ">
          <li
            onClick={handleroute}
            className={" flex justify-between gap-1 items-center "}
            ref={spacetoon}
          >
            {width && toggle ? (
              <i
                onClick={() => {
                  settoggle(!toggle);
                }}
                className="  hidden fa-solid md:mb-1  md:block md:pt-2 fa-angle-down"
              ></i>
            ) : (
              <i
                onClick={() => {
                  settoggle(!toggle);
                }}
                className=" hidden md:block mb-1 fa-solid md:pt-2 fa-angle-up"
              ></i>
            )}

            <Link
              onClick={() => {
                width && settoggle(true);
              }}
              to={"http://localhost:5173/"}
              className={pathname == "/" ? "nli" : ""}
            >
              <i className="icons fa-solid fa-house text-2xl"></i>
              {/* <div className="  md:flex md:items-center md:gap-1 "> */}

              <p className="mrgn md:pt-1">Spacetoon </p>
              {/* </div> */}
            </Link>
          </li>
          <hr />
          <li
            onClick={handleroute2}
            className={
              toggle
                ? "md:hidden  flex justify-between gap-3 items-center "
                : " flex justify-between gap-3 items-center absolute top-12  z-40 ml-4 rounded px-2 shadow-md bg-gradient-to-bl from-blue-950 to-blue-600 hover:border-b-2 "
            }
            ref={spacepower}
          >
            <NavLink
              onClick={() => {
                width && settoggle(!toggle);
              }}
              className={pathname == "/spacepower" ? "nli" : ""}
              to={"http://localhost:5173/spacepower"}
            >
              <img
                className=" w-10 h-10 relative left-1  md:w-6 md:hidden"
                src={spacepowerlogo}
              />
              <p className="mrgn">Spacepower</p>
            </NavLink>
          </li>
        </div>
        <hr />
        <NavLink className={pathname == "/contact" ? "nli    hover:border-b-2 " : ""} to={"http://localhost:5173/contact"}>
          <li
            className="  flex flex-row-reverse justify-between gap-3 items-center py-3 md:py-0 px-5 md:px-0 "
            ref={favorites}
          >
            <i className="icons fa-solid fa-address-card text-2xl"></i>
            <p className="mrgn md:pt-4">About</p>
          </li>
        </NavLink>
        <hr />
        <li
          className="  flex justify-between gap-3 items-center "
          ref={favorites}
        >
          <NavLink
            to={"http://localhost:5173/login/favorites"}
            className={pathname == "/login/favorites" ? "nli" : ""}
          >
            <i className="icons fa-solid fa-star text-2xl"></i>
            <p className="mrgn md:pt-1">Favorites</p>{" "}
          </NavLink>
        </li>
        <hr />
        {!googleId && (
          <li className={" flex justify-between gap-3 items-center "}>
            <NavLink
              className={"lastli"}
              onClick={handllogout}
              to={"http://localhost:5173/login"}
            >
              <i
                className={
                  token
                    ? "  text-red-500 icons text-2xl mt-1 fa-solid fa-right-from-bracket"
                    : " icons mt-1 fa-solid text-xl  fa-solid fa-user-plus"
                }
              ></i>
              <p
                style={{ fontSize: "20px" }}
                className={
                  token
                    ? " md:py-0 text-red-500  text-decoration-line: underline"
                    : " md:py-0 text-green-500  md:mt-0   text-decoration-line: underline"
                }
              >
                {thetoken}
              </p>{" "}
            </NavLink>
          </li>
        )}

        {userdata && (
          <div className=" flex items-center justify-center gap-2">
            <img
              onClick={() => {
                width && setactive(!active);
              }}
              className=" w-8 h-8 rounded-full"
              src={userdata.image}
            />
            <div
              className={
                active
                  ? "respn md:block flex md:gap-0 gap-3 items-center md:flex-col md:absolute md:top-12 md:right-14  md:p-2 md:rounded md:z-50 md:text-center md:bg-blue-900"
                  : " hidden"
              }
            >
              <p className=" mb-3 font-bold">{userdata.displayName}</p>
              <hr />
              <p
                className=" text-red-500 mt-3 cursor-pointer"
                onClick={logoutgoogle}
              >
                log-out
              </p>
            </div>
          </div>
        )}
      </ul>

      <div onClick={handlclick} className="barr">
        <span></span>
        <span className={barr ? "barrSpan" : "newbarrSpan"}></span>
        <span></span>
      </div>
    </div>
  );
}
