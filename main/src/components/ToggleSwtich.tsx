import React, { useState } from "react";
import Switch from "react-switch";

const ToggleSwitch = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
  };

  return (
    <label>
      <Switch
        onChange={handleChange}
        checked={checked}
        onColor="#00D13B"
        onHandleColor="#fff"
        handleDiameter={15}
        uncheckedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 12,
              color: "#fff",
              paddingRight: 2,
            }}
          >
            OFF
          </div>
        }
        checkedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 12,
              color: "#fff",
              paddingRight: 2,
            }}
          >
            ON
          </div>
        }
        className="react-switch"
        id="material-switch"
      />
    </label>
  );
};

export default ToggleSwitch;
