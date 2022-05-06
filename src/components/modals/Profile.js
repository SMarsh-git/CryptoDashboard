import "../styles/Profile.css"
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import profileImage from "../images/profileImage.jpg";

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  export const ProfileModal = ({ profile, setProfile }) => {
    const classes = useStyles();

    return(
      <div className="ProfileDiv">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={profile}
          onClose={!profile}
          onClick={!profile}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={profile}>
            <div className="ProfileModal">
                <div className = "title">
                    <h4 className="title1">Profile</h4>
                    <img className = "profilePic" src = {profileImage} alt = "yourImage"/>
                <div className = "Username">
                    <h6>Username: demouser</h6>
                    <div className="Email">
                    <h6>Email: demo@email.com</h6>
                    </div>
                </div>
                </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
  export default ProfileModal;