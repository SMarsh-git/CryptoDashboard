import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import '../modals/aboutUs.css'



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

export const AboutUsModal = ({ aboutUs }) => {
    const classes = useStyles();
    return (
      <div className='BackDrop'>
   
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={aboutUs}
          onClose={!aboutUs}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={aboutUs}>
            <div className="InfoModal">
              <h2 id="transition-modal-title" className='titleDiv2'>About Us</h2>
              <div className='aboutUsSect'>
                  <h4>Who Are We?</h4>
                  <p className="modalText">We are four junior developers. Adam Lemdani, Christopher Benson, Josh West, and Samuel Marsh.
                     We have come together as a team to develop this website for our final project. 12 weeks ago we had little to none coding experience, but through our study and work ethic we have come to accomplish out goal.</p>
              </div>
                <div className='aboutUsSect'>
                  <h4>Our Mission</h4>
                  <p className="modalText">Through research, brainstorming, and lots of coffee we have almost entirely achieved our goal. Our goal has been to create
                    a sleek, functional, and useful web application. Our idea was to create an easy to use Crypto portfolio tracker that can 
                    provide up to date information that is also in depth. Using various libraries and tools we have developed Artis. Feel free to
                    play with Artis
                  </p>
              </div>
                <div className='aboutUsSect'>
                  <h4>Contact</h4>
                  <p className="modalText">Contact us at support@artiscrypto.co.uk</p>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
  export default AboutUsModal;