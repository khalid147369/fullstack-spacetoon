import React, { useEffect, useState } from "react";
import facebook from "../assets/imgs/facebookicon.png";
import instagram from "../assets/imgs/instagramicon.png";
import { Link, useLocation } from "react-router-dom";
import js from "../assets/imgs/jsicon.png"
import react from "../assets/imgs/images.png"
export default function Footer() {
  const height = window.innerHeight;
  const [footerh, setfootrh] = useState("988px");
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div>
      <div className="flex justify-center gap-16 absolute transform top-28 left-1/2 -translate-x-1/2  ">
        <ul className=" w-40 flex flex-col gap-5">
          <li className="text-xl">khalid rabaaoui</li>
          <li> 🧑‍🎓 self lerning</li>
          <li>rabaaouikhalid@gmail.com</li>
        </ul>
        <div className="   w-1 h-30 bg-black  "></div>
        
          <ul className=" w-40  flex flex-col gap-5">
            <li className="text-xl">Skills</li>
            <li className=" flex gap-2 items-center "><img className="w-4" src={js}/><p>java script</p></li>
            <li>mern-stack</li>
            <li className=" flex gap-2 items-center "><img className="w-4" src={react}/><p>react</p></li>

          </ul>
        
        
        </div>
        <div className=" absolute w-full bg-gradient-to-bl from-blue-900 to-blue-400 h-60 bottom-0">
          <div className=" absolute w-full h-fit top-12">
            <ul className="  flex items-center gap-3 justify-center ">
              <a href="mailto:rabaaouikhalid@gmail.com">
                <li className=" text-2xl bg-red-500 rounded-full p-1 mr-3 text-white">
                  <i className="fa-brands fa-google-plus-g"></i>
                </li>
              </a>
              <a href="https://www.instagram.com/khalid147369?igsh=bzN6cWxxZXpvOXR2 ">
                <li className=" w-10 bg-white rounded-full">
                  <img src={instagram} />
                </li>
              </a>
              <a href="https://www.facebook.com/anas.rabaaoui.1">
                <li className=" w-16">
                  <img src={facebook} />
                </li>
              </a>
            </ul>
          </div>
          <div className="absolute w-full h-fit top-32 ">
            <ul className="  flex items-center justify-center gap-6">
              <Link to={"/"}>
                <li className="  text-white">Spacetoon</li>
              </Link>
              <Link to={"/"}>
                <li className="  text-white">Spacepower</li>
              </Link>
              <Link to={"/"}>
                <li className="  text-white">Favorites</li>
              </Link>
            </ul>
          </div>
          <div className=" absolute bottom-0 bg-gradient-to-bl from-blue-900 to-blue-600  w-full h-14 flex items-center justify-center ">
            <p style={{ color: "#ccc" }}>
              &copy; 2024 khalid rabaaoui. all rights reserved.
            </p>
          </div>
        </div>
      
    </div>
  );
}
