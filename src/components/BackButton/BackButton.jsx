import React from "react";
import { useNavigate } from "react-router-dom";

import "./BackButton.scss";

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  return (
    <button className="back" onClick={() => navigate(to || -1)}>
      <img
        src="https://img.icons8.com/?size=100&id=WWzSFZsWqPFD&format=png&color=000000"
        alt=""
      />
    </button>
  );
};

export default BackButton;
