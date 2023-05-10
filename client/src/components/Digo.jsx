import React, { useState } from "react";
// import "./style.css";
import Select from "react-select";
import bg from '../assets/bg.jpg'

export default function Diagonasis() {
  // React state to manage selected options
  const [selectedOptions, setSelectedOptions] = useState();

  // Array of all options
  const optionList = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "white", label: "White" }
  ];

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
  }
  return (
    <div className="h-screen bg-cover bg-fixed flex items-center justify-center" style={{ backgroundImage: `url(${bg})` }}>
      <div className="grid gap-0 items-center justify-center">

        <h2 className="mb-4">Choose Symptoms: </h2>
        <div className="w-96">
          <Select
            options={optionList}
            placeholder="Select Symptoms"
            value={selectedOptions}
            onChange={handleSelect}
            isSearchable={true}
            isMulti
          />
        </div>
      </div>
    </div>
  );
}