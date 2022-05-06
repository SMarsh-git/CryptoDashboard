import React, { useEffect, useState } from "react";
import Ethbtcchart from "../components/charts/dashboardCharts";
import Carousel from "./Carousel";
import { CoinsTable } from "./Table";
import "./styles/MainDiv.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { UserForm } from "../loginHandler/userForm"
import { tokenFetch } from "../loginHandler/signUp";


const MainDiv = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    tokenFetch(setUser)
    console.log("testing user", user)
  }, [user])

  const handleLogout = () => {
    setUser();
    localStorage.clear();
  }
  return (
    <div className="LandingPage">
      <div className="navContainer">
        <Navbar />
      </div>
      <div className="Content">
        <div className="CarouselSect">
          <Carousel />
        </div>
        <div className="Charts">
          {user ? <Ethbtcchart /> : <UserForm setUser = {setUser} user={user}/>}
          {/* <Ethbtcchart /> */}
          {user && <button onClick={handleLogout}>Logout</button> }
        </div>
        <div className="Table">
          <CoinsTable />
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default MainDiv;
