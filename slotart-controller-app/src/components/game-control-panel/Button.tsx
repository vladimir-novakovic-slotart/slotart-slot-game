// Button.tsx
import React from 'react';
import './Button.css';

interface ButtonProps {
    size: 'small' | 'medium' | 'large' | 'xlarge';
    onClick: () => void;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ size, onClick, children }) => {
    return (
        <button className={`button ${size}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
