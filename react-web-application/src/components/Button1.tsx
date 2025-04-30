// In Webpack app (remote)
// src/components/ButtonWithState.tsx

import React from "react";

interface ButtonWithStateProps {
  onClickCallback: () => void;
}

const Button1: React.FC<ButtonWithStateProps> = ({ onClickCallback }) => {
  return (
    <button onClick={onClickCallback}>
      click
    </button>
  );
};

export default Button1;