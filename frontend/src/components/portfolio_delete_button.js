import React from 'react';
import { useNavigate } from 'react-router-dom';

function PortfolioDeleteButton() {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate('/portfolio-delete-event');
    };
  
    return (
      <button onClick={handleClick}>
        Delete
      </button>
    );
  }
  
  export default PortfolioDeleteButton;