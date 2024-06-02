import React from 'react';
import { useNavigate } from 'react-router-dom';

function PortfolioUpdateButton({pk}) {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(`/portfolio-update-event/${pk}`);
    };
  
    return (
      <button onClick={handleClick}>
        Update
      </button>
    );
  }
  
  export default PortfolioUpdateButton;