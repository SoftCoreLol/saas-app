import styled from 'styled-components';
import { ReactNode } from 'react';

interface BANBtnProps {
  children?: ReactNode;
  primaryColor?: string;
  secondaryColor?: string;
  intenseColor?: string;
  insideColor?: string;
  bgColor?: string;
  textColor?: string;
}

const BANBtn: React.FC<BANBtnProps> = ({ 
  children, 
  primaryColor = '#f50', 
  secondaryColor = '#05f',
  intenseColor = '#f95',
  insideColor = '#fc9',
  bgColor = '#111215',
  textColor = '#fff'
}) => {
  return (
    <StyledWrapper 
      $primaryColor={primaryColor} 
      $secondaryColor={secondaryColor}
      $intenseColor={intenseColor}
      $insideColor={insideColor}
      $bgColor={bgColor}
      $textColor={textColor}
    >
      <div className='cursor-pointer'>
        <svg style={{position: 'absolute', width: 0, height: 0}}>
          <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq">
            <feColorMatrix values="1 0 0 0 0 
            0 1 0 0 0 
            0 0 1 0 0 
            0 0 0 9 0" />
          </filter>
          <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq2">
            <feColorMatrix values="1 0 0 0 0 
            0 1 0 0 0 
            0 0 1 0 0 
            0 0 0 3 0" />
          </filter>
          <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq3">
            <feColorMatrix values="1 0 0 0.2 0 
            0 1 0 0.2 0 
            0 0 1 0.2 0 
            0 0 0 2 0" />
          </filter>
        </svg>
        <button className="real-button" />
        <div className="button-container">
          <div className="spin spin-blur" />
          <div className="spin spin-intense" />
          <div className="button-border">
            <div className="spin spin-inside" />
            <div className="button">{children}</div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ 
  $primaryColor: string; 
  $secondaryColor: string;
  $intenseColor: string;
  $insideColor: string;
  $bgColor: string;
  $textColor: string;
}>`
  .button-container {
    position: relative;
    margin: 0 2em;
  }

  .button-border {
    padding: 3px;
    inset: 0;
    background: #0005;
    border-radius: inherit;
    clip-path: path(
      "M 170 0 C 228 0 233 5 233 30 C 233 55 228 60 170 60 L 45 60 C 5 60 0 55 0 30 C 0 5 5 0 45 0 Z"
    );
  }

  .button {
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 0.875em;
    clip-path: path(
      "M 170 0 C 225 0 230 5 230 30 C 230 55 225 60 170 60 L 45 60 C 5 60 0 55 0 30 C 0 5 5 0 45 0 Z"
    );
    width: 230px;
    height: 60px;
    background: ${props => props.$bgColor};
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    padding: 0 20px;
    color: ${props => props.$textColor};
    overflow: hidden;
  }

  .real-button {
    position: absolute;
    width: 230px;
    height: 60px;
    z-index: 1;
    outline: none;
    border: none;
    border-radius: 17px;
    cursor: pointer;
    opacity: 0;
  }

  .backdrop {
    position: absolute;
    inset: -9900%;
    background: radial-gradient(
      circle at 50% 50%,
      #0000 0,
      #0000 20%,
      #111111aa 50%
    );
    background-size: 3px 3px;
    z-index: -1;
  }

  .spin {
    position: absolute;
    inset: 0;
    z-index: -2;
    opacity: 0.5;
    overflow: hidden;
    transition: 0.3s;
  }

  .real-button:active ~ div .spin {
    opacity: 1;
  }

  .spin-blur {
    filter: blur(2em) url(#unopaq);
  }

  .spin-intense {
    inset: -0.125em;
    filter: blur(0.25em) url(#unopaq2);
    border-radius: 0.75em;
  }

  .spin-inside {
    inset: -2px;
    border-radius: inherit;
    filter: blur(2px) url(#unopaq3);
    z-index: 0;
  }

  .spin::before {
    content: "";
    position: absolute;
    inset: -150%;
    animation:
      speen 8s cubic-bezier(0.56, 0.15, 0.28, 0.86) infinite,
      woah 4s infinite;
    animation-play-state: paused;
  }

  .real-button:hover ~ div .spin::before {
    animation-play-state: running;
  }

  .spin-blur::before {
    background: linear-gradient(90deg, ${props => props.$primaryColor} 30%, #0000 50%, ${props => props.$secondaryColor} 70%);
  }

  .spin-intense::before {
    background: linear-gradient(90deg, ${props => props.$intenseColor} 20%, #0000 45% 55%, ${props => props.$intenseColor?.replace('#f', '#5') ?? '#59f'} 80%);
  }

  .spin-inside::before {
    background: linear-gradient(90deg, ${props => props.$insideColor} 30%, #0000 45% 55%, ${props => props.$insideColor?.replace('#f', '#9') ?? '#9cf'} 70%);
  }

  @keyframes speen {
    0% {
      rotate: 10deg;
    }
    50% {
      rotate: 190deg;
    }
    to {
      rotate: 370deg;
    }
  }

  @keyframes woah {
    0%, to {
      scale: 1;
    }
    50% {
      scale: 0.75;
    }
  }
`;

export default BANBtn;