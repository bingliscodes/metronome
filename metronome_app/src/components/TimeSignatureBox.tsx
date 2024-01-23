import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface TimeSignatureBoxProps {
  values: Array<number>;
}

const TimeSignatureBox: React.FC<TimeSignatureBoxProps> = ({ values }) => {
  const [value, setValue] = useState<number>(4);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {value}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {values.map((val) => (
          <Dropdown.Item key={val} onClick={() => setValue(val)}>
            {val}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TimeSignatureBox;
