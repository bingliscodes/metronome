import React, { useState, useContext } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  TimeSignatureBotContext,
  TimeSignatureTopContext,
} from "../context/MetronomeContext";

export const TimeSignatureBoxTop: React.FC = () => {
  const { timeSignatureTop, setTimeSignatureTop } = useContext(
    TimeSignatureTopContext
  );
  const topVals = Array.from({ length: 16 }, (_, i) => i + 1);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {timeSignatureTop}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {topVals.map((val) => (
          <Dropdown.Item key={val} onClick={() => setTimeSignatureTop(val)}>
            {val}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const TimeSignatureBoxBot: React.FC = () => {
  const { timeSignatureBot, setTimeSignatureBot } = useContext(
    TimeSignatureBotContext
  );
  const botVals = [1, 2, 4, 8];
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {timeSignatureBot}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {botVals.map((val) => (
          <Dropdown.Item key={val} onClick={() => setTimeSignatureBot(val)}>
            {val}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
