import React from "react";

import "./App.css";
import CustomSelect from "./components/customSelect/CustomSelect";

const options = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
];

const groupedOptions = [
  {
    label: "Group 1",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
    ],
  },
  {
    label: "Group 2",
    options: [
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ],
  },
];

function App() {
  const handleChange = (selectedOption) => {
    // console.log("Selected:", selectedOption);
  };

  const handleMenuOpen = () => {
    // console.log("Menu opened");
  };

  const handleSearch = (searchText) => {
    // console.log("Searching:", searchText);
  };

  return (
    <div className="App">
      <h1>Custom Select Component</h1>
      <div className="components">
        <CustomSelect
          isClearable={true}
          isSearchable={true}
          isDisabled={false}
          options={options}
          value={null}
          placeholder="Select an option"
          isGrouped={false}
          isMulti={false}
          onChangeHandler={handleChange}
          onMenuOpen={handleMenuOpen}
          onSearchHandler={handleSearch}
        />

        <CustomSelect
          isClearable={true}
          isSearchable={true}
          isDisabled={false}
          options={groupedOptions}
          value={null}
          placeholder="Select multiple options"
          isGrouped={true}
          isMulti={true}
          onChangeHandler={handleChange}
          onMenuOpen={handleMenuOpen}
          onSearchHandler={handleSearch}
        />
      </div>
    </div>
  );
}

export default App;
