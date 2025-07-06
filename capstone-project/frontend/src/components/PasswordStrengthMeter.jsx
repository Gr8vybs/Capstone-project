import React from 'react';
import '../styles/PasswordStrengthMeter.css';

const PasswordStrengthMeter = ({ strength }) => {
  const getStrengthText = () => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="password-strength">
      <div className="password-strength-meter">
        <div 
          className="password-strength-meter-fill"
          style={{ 
            width: `${strength * 25}%`,
            backgroundColor: 
              strength < 2 ? 'var(--danger)' :
              strength < 4 ? 'var(--warning)' : 'var(--success)'
          }}
        ></div>
      </div>
      <div className="password-strength-text">
        {getStrengthText()}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;