import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TimeSignatureBoxTop, TimeSignatureBoxBot } from "./TimeSignatureBox";

const TimeSignatureControl: React.FC = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="p-2">
        <TimeSignatureBoxTop />
      </div>
      <div className="p-2">
        <TimeSignatureBoxBot />
      </div>
    </div>
  );
};

export default TimeSignatureControl;
