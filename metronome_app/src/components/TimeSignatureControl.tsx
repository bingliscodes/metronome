import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TimeSignatureBox from "./TimeSignatureBox";

const TimeSignatureControl: React.FC = () => {
  let topVals = Array.from({ length: 16 }, (_, i) => i + 1);
  let botVals = [1, 2, 4, 8];

  return (
    <div className="d-flex justify-content-center">
      <div className="p-2">
        <TimeSignatureBox values={topVals} />
      </div>
      <div className="p-2">
        <TimeSignatureBox values={botVals} />
      </div>
    </div>
  );
};

export default TimeSignatureControl;
