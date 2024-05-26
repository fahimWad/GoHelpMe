import React from 'react';
import { useNavigate } from 'react-router-dom';

function PortfolioUpdateButton() {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate('/portfolio_update_event');
    };
  
    return (
      <button onClick={handleClick}>
        Update
      </button>
    );
  }
  
  export default PortfolioUpdateButton;