import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CustomSelectet.css';

const CustomSelect = ({
  isClearable,
  isSearchable,
  isDisabled,
  options,
  value,
  placeholder,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}) => {
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(
    isMulti ? value || [] : value ? [value] : []
  );

  useEffect(() => {
    setSelectedValues(isMulti ? value || [] : value ? [value] : []);
  }, [value, isMulti]);

  const handleSelectChange = (option) => {
    if (isMulti) {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((val) => val !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onChangeHandler(newSelectedValues);
    } else {
      setSelectedValues([option]);
      onChangeHandler(option);
      setIsOpen(false);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    const newValue = isMulti ? [] : null;
    // setSelectedValues(newValue);
    onChangeHandler(newValue);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    onSearchHandler(e.target.value);
  };

  const handleMenuToggle = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
      onMenuOpen();
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className={`custom-select ${isDisabled ? 'disabled' : ''}`}>
      <div className="custom-select-header" onClick={handleMenuToggle}>
        {isClearable &&
          (isMulti
            ? selectedValues?.length > 0
            : selectedValues?.length > 0) && (
            <button className="clear-btn" onClick={handleClear}>
              ×
            </button>
          )}

        <span className="selected-value">
          {selectedValues.length > 0
            ? isMulti
              ? selectedValues.map((val) => val.value).join(', ')
              : selectedValues[0].label
            : placeholder}
        </span>
        <span className="dropdown-icon">▼</span>
      </div>
      {isOpen && (
        <div className="custom-select-menu">
          {isSearchable && (
            <input
              type="text"
              className="search-input"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search..."
            />
          )}
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`option-item ${
                    selectedValues.some((val) => val.value === option.value)
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => handleSelectChange(option)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li>No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  isGrouped: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChangeHandler: PropTypes.func.isRequired,
  onMenuOpen: PropTypes.func,
  onSearchHandler: PropTypes.func,
};
export default CustomSelect;
