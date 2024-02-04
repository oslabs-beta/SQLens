import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
// import '../stylesheets/blobs.scss';
import '../stylesheets/landingPage.scss';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OceanWaves from './waves';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';

const LandingPage = () => {
  const logoRef = useRef(null);
  const navigate = useNavigate();
  const { fetchTables } = useStore((state) => ({
    fetchTables: state.fetchTables,
  }));

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target  & {
      input: { value: string };
    }
    const URIString = target.input.value;

    try {
      const response = await fetch('/api/setDatabaseUri', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ databaseURI: URIString })
      });
      const data = await response.json();
      if (response.ok && data.message === 'Database connection updated successfully') {
        await fetchTables();
        navigate('/flow');
      } else {
        console.error(data.error || 'Failed to update database URI');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
        duration: 800,
      })
      .add({
        targets: '#logo-hexagon',
        rotate: [-90, 0],
        duration: 600,
        elasticity: 600,
        offset: 50,
      })
      .add({
        targets: '#logo-circle',
        scale: [0, 1],
        duration: 600,
        elasticity: 600,
        offset: 250,
      })
      .add({
        targets: '#logo-text',
        translateX: ['-100%', 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutExpo',
        offset: 500,
      });
  }, []);

  return (
    <div className="outer-container" data-testid="outer-container">
      <div className="logo-container">
        <div className="site-logo">
          <figure id="logo" ref={logoRef}>
            <svg width="100%" height="100%" viewBox="0 0 148 128">
              <defs>
                <mask id="circle-mask">
                  <rect fill="white" width="100%" height="100%"></rect>
                  <circle
                    id="logo-mask"
                    fill="black"
                    cx="120"
                    cy="96"
                    r="28"
                  ></circle>
                </mask>
              </defs>
              <polygon
                id="logo-hexagon"
                fill="#646cff"
                points="64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96"
                mask="url(#circle-mask)"
              ></polygon>
              <circle
                id="logo-circle"
                fill="#e92a67"
                cx="120"
                cy="96"
                r="20"
              ></circle>
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
        <form style={{ display: 'flex', alignItems: 'center' }} onSubmit={handleSubmit}>
          <TextField
          name='input'
          type='input'
            className="moving-shadow"
            label="URI String"
            placeholder="Enter URI here"
            variant="outlined"
            style={{
              width: '40vw',
              color: '#646cff',
              fontSize: '20px',
              marginTop: '5px',
            }}
            InputProps={{
              style: {
                color: '#646cff',
              },
            }}
            InputLabelProps={{
              style: {
                color: '#646cff',
              },
            }}
          />
          <IconButton
            style={{
              marginTop: '5px',
              color: '#646cff',
            }}
            type='submit'
          >
            <ArrowForwardIcon fontSize="large" />
          </IconButton>
        </form>

        <div style={{ height: '58px', width: '40vw', margin: '50px 0' }}></div>
      </div>
      <div className="wave-container"></div>
      <OceanWaves />
    </div>
  );
};

export default LandingPage;
