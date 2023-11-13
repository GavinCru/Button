import { useState } from 'react';
import './App.css';
import usePasswordGenerator from './hooks/use-password-geneeratror';
import PasswordStrengthIndicator from './components/strengthChecker';
import Button from './components/Button';
import Checkbox from './components/Checkbox';

function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData]
    checkboxData[i].state = !checkboxData[i].state
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator()

  return (
    <div className="container">
      {/* Password Text and Copy*/}
      {password && (
        <div className='header'>
          <div className="title">{password}</div>
          <Button
           text={copied ? "Copied" : "copy"}
            onClick={handleCopy} 
            customClass="copyBtn" 
            />
        </div>
      )}
      {/* Character length */}
      <div className='charlength'>
        <span>
          <label>Character length</label>
          <label>{length}</label>
        </span>
        <input
          type='range'
          min='4'
          max='20'
          // value={}
          onChange={(e) => setLength(e.target.value)}
        // onChange={}
        />
      </div>
      {/* Checkboxes */}
      <div className='checkboxes'>
        {checkboxData.map((checkbox, index) => {
          return (
            <Checkbox
            key={index}
            title={checkbox.title}
            onChange={() => handleCheckboxChange(index)}
            state={checkbox.state}
          />
        );
      })}
      </div>
      {/* Strength */}
      <PasswordStrengthIndicator password={password} />

      {/* Error handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {/* Generate Button */}
      <Button
           text="Generate Password"
            onClick={() => generatePassword(checkboxData, length)} 
            customClass="generateBtn" 
            />
    </div>
  );
}

export default App;
