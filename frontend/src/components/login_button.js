import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginButton() {
    //
    const navigate = useNavigate();
    const handleClick = () => {
      navigate('/login');
    };
  
    return (
      <button onClick={handleClick}>
        Login Here
      </button>
    );
  }
  
  export default LoginButton;