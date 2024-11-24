import React from 'react';
interface CustomButtonProps{
    onClick: () => void;  // Callback function to handle button click event.
}

const CustomButton:React.FC<CustomButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick} style={buttonStyle}>
            Click Me!
        </button>
    );
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4a3aff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default CustomButton;
