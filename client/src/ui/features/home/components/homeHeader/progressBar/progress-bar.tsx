import React from "react";
import "./progress-bar.styles.scss";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = () => {
  return (
    <div className="progress-bar">
      {/*<div className="progress" style={progress>0?{ width: `${progress * 100}%` }:{ width: `100%` }}></div>*/}
      <div className="progress"></div>
    </div>
  );
};

export default ProgressBar;
