import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="FooterBox">
        <h3>Support</h3>
        <button className="noStyle">Contact Us</button>
        <button className="noStyle">Help Centre</button>
        <button className="noStyle">FAQ</button>
      </div>
      <div className="FooterBox">
        <h3>Company</h3>
        <button className="noStyle">About</button>
        <button className="noStyle">Information</button>
        <button className="noStyle">Legal</button>
        <button className="noStyle">Privacy</button>
        <p className="credit">POWERED BY COINGECKO API</p>
      </div>
      <div className="FooterBoxSocial">
        <h3>Social</h3>
        <button className="icon">
          <FaFacebookSquare />
        </button>
        <button className="icon">
          <FaTwitterSquare />
        </button>
        <button className="icon">
          <FaLinkedin />
        </button>
        <button className="icon">
          <FaGithubSquare />
        </button>
      </div>
    </div>
  );
};

export default Footer;
