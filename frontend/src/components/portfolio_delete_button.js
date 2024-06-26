import React from 'react';

function PortfolioDeleteButton({pk, onClick}) {
    const handleClick = () => {
        const deleteConfirmMessage = window.confirm('Are you sure you want to delete this event? This action cannot be undone.');
        if (deleteConfirmMessage)
            onClick(pk);
    };
  
    return (
      <button style={{ backgroundColor: 'red', marginLeft: '5px' }} onClick={handleClick}>
        Delete
      </button>
    );
  }
  
  export default PortfolioDeleteButton;