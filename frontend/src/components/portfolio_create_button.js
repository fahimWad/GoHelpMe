import React from 'react';
import { useNavigate } from 'react-router-dom';

function PortfolioCreateButton() {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate('/portfolio-create-event');
    };
  
    return (
      <button class="left" onClick={handleClick}>
        Record Your Event
      </button>
    );
  }
  
  export default PortfolioCreateButton;