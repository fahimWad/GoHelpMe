import React from 'react';
import { useNavigate } from 'react-router-dom';

function PortfolioCreateButton() {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate('/portfolio_create_event');
    };
  
    return (
      <button class="left" onClick={handleClick}>
        Create
      </button>
    );
  }
  
  export default PortfolioCreateButton;