import React, { useEffect, useRef} from 'react';
import anime from 'animejs';
import './stylesheets/landingPage.scss';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OceanWaves from './components/waves';
import { useNavigate } from 'react-router-dom';



const LandingPage = ({ searchValue, onSearchChange, onSearchSubmit }) => {
    const logoRef = useRef(null);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        onSearchChange(event.target.value);
    };

    const handleSubmit = async () => {
        await onSearchSubmit();
        navigate('/flow');
    };
  
    useEffect(() => {
      const logoAnimation = anime.timeline({
        autoplay: true,
        delay: 200,
      });
  
      logoAnimation
        .add({
          targets: logoRef.current,
          translateY: [-100, 0],
          opacity: [0, 1],
          elasticity: 600,
          duration: 800 
        })
        .add({
          targets: '#logo-hexagon',
          rotate: [-90, 0],
          duration: 600,
          elasticity: 600,
          offset: 50 
        })
        .add({
          targets: '#logo-circle',
          scale: [0, 1],
          duration: 600,
          elasticity: 600,
          offset: 250 
        })
        .add({
          targets: '#logo-text',
          translateX: ['-100%', 0],
          opacity: [0, 1],
          duration: 500, 
          easing: 'easeOutExpo',
          offset: 500 
        });
    }, []); 
  
    return (
      <div className="outer-container">
      <div className="logo-container">
        <div className="site-logo">
          <figure id="logo" ref={logoRef}>
          <svg width="100%" height="100%" viewBox="0 0 148 128">
            <defs>
              <mask id="circle-mask">
                <rect fill="white" width="100%" height="100%"></rect>
                <circle id="logo-mask" fill="black" cx="120" cy="96" r="28"></circle>
              </mask>
            </defs>
            <polygon id="logo-hexagon" fill="#00B4FF" points="64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96" mask="url(#circle-mask)"></polygon>
            <circle id="logo-circle" fill="#3F3C3C" cx="120" cy="96" r="20"></circle>
            </svg> 
            </figure>
            <div className="site-title">
              <div id="logo-text" className="site-title-text">
                SQL<span>ens</span>
              </div>
            </div>
          </div>
        </div>
  
        <div className="input-container">
      
          <div style={{ display: 'flex', alignItems: 'center'}}> 
            <TextField
              id="standard-textarea"
              label="URI"
              placeholder="Enter URI here"
              multiline
              variant="outlined"
              value={searchValue}
                        onChange={handleInputChange}
              style={{ 
                width: '40vw',
                color: '#ADD8E6',
                fontSize: '20px',
                marginTop: '5px',
              }}
              InputProps={{
                style: {
                  color: '#ADD8E6'
                }
              }}
              InputLabelProps={{
                style: {
                  color: '#ADD8E6'
                }
              }}
            />
    <IconButton 
              style={{ 
                marginTop: '5px', 
                color: '#00B4FF',
              }}
              onClick={handleSubmit}
            >
              <ArrowForwardIcon fontSize="large" /> 
            </IconButton>
          </div>
        
          <div style={{ height: '58px', width: '40vw', margin: '50px 0' }}></div>
        
      </div>
      <div className="wave-container">
      
          </div>
          <OceanWaves />
    </div>
  );
        };
  
  export default LandingPage;