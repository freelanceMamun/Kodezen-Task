import './App.css';
import CustomSelect from './codejen';
import { useState } from 'react';
const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
  { value: '6', label: 'Option 6' },
  { value: '7', label: 'Option 7' },
  { value: '8', label: 'Option 8' },
];

function App() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [multiSelectedValues, setMultiSelectedValues] = useState([]);

  const handleChange = (value) => {
    console.log('Selected value:', value);
    setSelectedValue(value);
  };

  const handleMultiChange = (values) => {
    console.log('Selected values:', values);
    setMultiSelectedValues(values);
  };

  const handleSearch = (text) => {
    console.log('Search text:', text);
  };

  return (
    <main className="main-wrapper">
      <h2> Custom select component</h2>
      <div className="App" style={{ display: 'flex', gap: '20px' }}>
        <CustomSelect
          isClearable={true}
          isSearchable={true}
          isDisabled={false}
          options={options}
          value={selectedValue}
          placeholder="Select an option"
          isGrouped={false}
          isMulti={false}
          onChangeHandler={handleChange}
          onMenuOpen={() => console.log('Menu opened')}
          onSearchHandler={handleSearch}
        />
        <CustomSelect
          isClearable={true}
          isSearchable={true}
          isDisabled={false}
          options={options}
          value={multiSelectedValues}
          placeholder="Select multiple options"
          isGrouped={false}
          isMulti={true}
          onChangeHandler={handleMultiChange}
          onMenuOpen={() => console.log('Menu opened')}
          onSearchHandler={handleSearch}
        />
      </div>
    </main>
  );
}

export default App;
