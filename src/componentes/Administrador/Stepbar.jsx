import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import {BiUser} from 'react-icons/bi'
import {AiOutlineFileText, AiOutlineCalendar, AiOutlineCheckCircle} from 'react-icons/ai'
export const Stepbar = ({ steps }) => {
  return (
    <ProgressBar
      percent={(steps) * 25}
      filledBackground="#60269e"
    >
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : ""}`}>
            <AiOutlineFileText size={18} />
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : ""}`}>
            <BiUser size={18} />
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : ""}`}>
            <AiOutlineCalendar size={18} />
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : ""}`}>
            <AiOutlineCheckCircle size={18} />
          </div>
        )}
      </Step>
    </ProgressBar>
  );
}
