import React, { useState, useEffect } from "react";
import "./customSelect.css";

const CustomSelect = ({
  isClearable,
  isSearchable,
  isDisabled,
  options = [],
  value,
  placeholder,
  isGrouped,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}) => {
  const [selectedValue, setSelectedValue] = useState(
    value || (isMulti ? [] : null)
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isMenuOpen && onMenuOpen) {
      onMenuOpen();
    }
  }, [isMenuOpen, onMenuOpen]);

  const handleSelect = (option) => {
    if (isDisabled) return;
    if (isMulti) {
      const isSelected = selectedValue.some(
        (item) => item.value === option.value
      );
      const newValue = isSelected
        ? selectedValue.filter((item) => item.value !== option.value)
        : [...selectedValue, option];
      setSelectedValue(newValue);
      onChangeHandler(newValue);
    } else {
      setSelectedValue(option);
      onChangeHandler(option);
    }
  };

  const handleClear = () => {
    if (isDisabled) return;
    if (isMulti && selectedValue.length > 0) {
      const newValue = selectedValue.slice(0, -1);
      setSelectedValue(newValue);
      onChangeHandler(newValue);
    } else {
      setSelectedValue(isMulti ? [] : null);
      onChangeHandler(isMulti ? [] : null);
    }
  };

  const handleSearch = (e) => {
    if (isDisabled) return;
    setSearchTerm(e.target.value);
    if (onSearchHandler) {
      onSearchHandler(e.target.value);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderOptions = () => {
    if (isGrouped) {
      return options.map((group) => (
        <div key={group.label} className="kzui-select__group">
          <div className="kzui-select__group-label">{group.label}</div>
          {group.options.map((option) => (
            <div
              key={option.value}
              className={`kzui-select__option ${
                selectedValue.some((item) => item.value === option.value)
                  ? "kzui-select__option--selected"
                  : ""
              } ${isDisabled ? "kzui-select__option--disabled" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      ));
    } else {
      return filteredOptions.map((option) => (
        <div
          key={option.value}
          className={`kzui-select__option ${
            isMulti && selectedValue.some((item) => item.value === option.value)
              ? "kzui-select__option--selected"
              : ""
          } ${isDisabled ? "kzui-select__option--disabled" : ""}`}
          onClick={() => handleSelect(option)}
        >
          {option.label}
        </div>
      ));
    }
  };

  return (
    <div className={`kzui-select ${isDisabled ? "kzui-select--disabled" : ""}`}>
      {isSearchable && (
        <input
          type="text"
          className="kzui-select__search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder={placeholder}
          disabled={isDisabled}
        />
      )}
      <div
        className="kzui-select__placeholder"
        onClick={() => !isDisabled && setIsMenuOpen(!isMenuOpen)}
      >
        {isMulti
          ? selectedValue?.map((item) => item.label).join(", ") || placeholder
          : selectedValue
          ? selectedValue.label
          : placeholder}
      </div>
      {isClearable &&
        (isMulti ? selectedValue.length > 0 : selectedValue) &&
        !isDisabled && (
          <button onClick={handleClear} className="kzui-select__clear">
            Clear
          </button>
        )}
      {isMenuOpen && <div className="kzui-select__menu">{renderOptions()}</div>}
    </div>
  );
};

export default CustomSelect;
