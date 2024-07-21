import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Spacepower from "./Combonent/Spacepower.jsx";
import Signin from "./Combonent/Signin.jsx";
import Addcard from "./Combonent/Addcard.jsx";
import Nav from "./Combonent/Nav";
import Signup from "./Combonent/Signup.jsx";
import Login from "./Combonent/Login.jsx";
import SingleCard from "./Combonent/SingleCard.jsx";
import SingleCardFav from "./Combonent/SinglCardFav.jsx";
import Favorites from "./Combonent/Favorites.jsx";
import Footer from "./Combonent/Footer.jsx";
import ManageCards from "./Combonent/ManageCards.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" index element={<App />} />
        <Route path="/spacepower" element={<Spacepower/>} />
       
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} >
         <Route path="favorites" element={<Favorites/>} />
        </Route>

        <Route path="/admin" element={<Signin />}>
          <Route path="admin" element={<Addcard />} />
          <Route path="manage" element={<ManageCards/>} />
        </Route>
        <Route path="/singlecard/:id" element={<SingleCard/>}/>
        <Route path="/SingleCardfav/:id" element={<SingleCardFav/>}/>
        <Route path="/contact" element={ <Footer/>}/>
        <Route path="*" element={"404 not found"} />
      </Routes>
     
    </BrowserRouter>
    {/* <App/> */}
  </React.StrictMode>
);
