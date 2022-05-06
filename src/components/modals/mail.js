import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "../styles/mail.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const MailModal = ({ mail }) => {
  const classes = useStyles();
  return (
    <div className="MailModal">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={mail}
        onClose={!mail}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={mail}>
          <div className="MainDiv">
            <h2 id="transition-modal-title">Your Mail and Notices</h2>
            <div className="mailContainer">
              <div className="mailDiv">
                <div className="titleDiv">
                  <h4>Welcome!</h4>
                </div>
                <p className="modalText">
                  Thank you for signing up to our service. We hope you make
                  great use of our site's functionality; heres a quick run down.
                </p>
                <p className="modalText">
                  1. You can check current charts of coins through the carousel
                  or the 2 main charts on our homepage.
                </p>
                <p className="modalText">
                  2. You can inspect current trends and data on our in depth
                  table towards the bottom of the homepage.
                </p>
                <p className="modalText">
                  3. Visit individual coin pages by clicking their icons and
                  read about the project and gain more information!
                </p>
                <p className="modalText">Thank you for using our services.</p>
              </div>
            </div>
            <div className="newsLetter">
              <p className="modalText" id="transition-modal-description">
                Sign up to our newsletter{" "}
              </p>{" "}
              <button className="newsLetterButton">here!</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default MailModal;
