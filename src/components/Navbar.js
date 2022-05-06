import React, { useState } from "react";
import { IoStarOutline } from "react-icons/io5";
import Logo from "./images/Logo.jpg";
import WroteLogo from "./images/ARTIS.png";
import { VscAccount } from "react-icons/vsc";
import { GoMail } from "react-icons/go";
import { BsInfoCircle } from "react-icons/bs";
import "../components/styles/Navbar.css";
import { Link } from "react-router-dom";
import AboutUsModal from "./modals/aboutUs";
import ProfileModal from "./modals/Profile";
import MailModal from "./modals/mail";


const Navbar = ({ handleOpen, handleClose, }) => {
const [aboutUs, setAboutUs] = useState(false);
const [profile, setProfile] = useState(false);
const [mail, setMail] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setAboutUs(!aboutUs)
    
  }
  const handleClickMail = (event) => {
    event.preventDefault();
    setMail(!mail)
  }

  const handleClickProfile = (event) => {
    event.preventDefault();
    setProfile(!profile)
  }

  return (

    <div className="Navbar">
      <div className="navLeft">
        <Link to={`/`} className="link home">
          <img className="Logo" src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="navMiddle">
        <Link to={`/`} className="link home">
          <img className="WroteLogo" src={WroteLogo} alt="Artis" />
        </Link>
      </div>
      <div className="navRight">
        <button className="buttons"  onClick={handleClickMail}>
            <GoMail onClick={handleClickMail}/>
            {mail && <MailModal handleClose={ handleClose }
            mail={mail} onClose={() => setMail(!mail)}
            />} 
          </button>
          <button className="buttons"  onClick={handleClick}>
            <BsInfoCircle onClick={handleClick}/>
            {aboutUs && <AboutUsModal handleClose={ handleClose }
            aboutUs={aboutUs} onClose={() => setAboutUs(!aboutUs)}
            />} 
          </button>
        <Link to={`/favourites`}>
          <button className="buttons">
            <IoStarOutline />
          </button>
        </Link>
          <button className="buttons"  onClick={handleClickProfile}>

            <VscAccount onClick={handleClickProfile}/>
            {profile && <ProfileModal handleClose={ handleClose } 
            profile={profile} onClose={() => setProfile(!profile)}/>}
          </button>
      </div>
    </div>
  );
};

export default Navbar;
