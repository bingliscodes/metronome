import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useMetronome } from "../context/MetronomeContext.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

interface TimeSignatureControlProps {
  // Define props here if needed, like a callback to update the time signature in the parent component
}

const TimeSignatureControl = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="p-2">
        <TimeSignatureControlTop />
      </div>
      <div className="p-2">
        <TimeSignatureControlBot />
      </div>
    </div>
  );
};

const TimeSignatureControlTop: React.FC<TimeSignatureControlProps> = (
  props
) => {
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
const TimeSignatureControlBot: React.FC<TimeSignatureControlProps> = (
  props
) => {
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
