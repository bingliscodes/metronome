import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
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

const TimeSignatureControlTop: React.FC = () => {
  const [timeSignatureTop, setTimeSignatureTop] = useState<number>(4);
  const numbers = Array.from({ length: 16 }, (_, i) => i + 1);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {timeSignatureTop}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {numbers.map((number) => (
          <Dropdown.Item
            key={number}
            onClick={() => setTimeSignatureTop(number)}
          >
            {number}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
const TimeSignatureControlBot: React.FC = () => {
  const [timeSignatureBot, setTimeSignatureBot] = useState<number>(4);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {timeSignatureBot}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setTimeSignatureBot(4)}>1</Dropdown.Item>
        <Dropdown.Item onClick={() => setTimeSignatureBot(2)}>2</Dropdown.Item>
        <Dropdown.Item onClick={() => setTimeSignatureBot(4)}>4</Dropdown.Item>
        <Dropdown.Item onClick={() => setTimeSignatureBot(8)}>8</Dropdown.Item>
        {/* Add more time signatures as needed */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TimeSignatureControl;
