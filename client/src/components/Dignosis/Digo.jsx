import React, { useState } from "react";
// import "./style.css";
import Select from "react-select";
import bg from '../../assets/bg.jpg'
import DisesCard from "./DisesCard";

export default function Diagonasis() {
  // React state to manage selected options
  const [selectedOptions, setSelectedOptions] = useState();

  // Array of all options
  const optionList = [
    { value: "itching", label: "itching" },
    { value: "skin_rash", label: "skin rash" },
    { value: "nodal_skin_eruptions", label: "nodal skin eruptions" },
    { value: "continuous_sneezing", label: "continuous sneezing" },
    { value: "shivering	chills", label: "shivering	chills" },
    { value: "chills", label: "chills" },
    { value: "joint_pain", label: "joint pain" },
    { value: "stomach_pain", label: "stomach pain" },
    { value: "acidity", label: "acidity" },
    { value: "ulcers_on_tongue", label: "ulcers on tongue" },
    { value: "skin_peeling", label: "skin peeling" },
    { value: "silver_like_dusting", label: "silver like dusting" },
    { value: "small_dents_in_nails", label: "small dents in nails" },
    { value: "inflammatory_nails", label: "inflammatory nails" },
    { value: "blister", label: "blister" },
    { value: "red_sore_around_nose", label: "red sore around_nose" },
    { value: "yellow_crust_ooze", label: "yellow crust ooze" }
  ];

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
  }
  return (
    <div className=" bg-cover " style={{ backgroundImage: `url(${bg})` }} >
      <div className=" flex items-center justify-center min-h-screen" >
        <div className="">

          <div className="grid justify-center items-center ">

            <h2 className="mb-4">Choose Symptoms: </h2>

            <div className=" flex">
              <Select
                options={optionList}
                placeholder="Select Symptoms"
                value={selectedOptions}
                onChange={handleSelect}
                isSearchable={true}
                className="w-[25rem]"
                isMulti
              />
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  ml-4">Find</button>
            </div>
          </div>
          <div className="flex gap-4 justify-center mt-10">
            <DisesCard name='Hairfall' per='25' />
            <DisesCard name='Cold' per='45' />
            <DisesCard name='Pneumonia' per='90' />
          </div>
        </div>

      </div>

    </div>
  );
}