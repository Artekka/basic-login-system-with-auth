import './App.css';
import {useState} from "react";
import Axios from "axios";

function App() {

  // create states

  const [regAccountName, setAccountName] = useState('');
  const [regEmail, setEmail] = useState('');
  const [regPassword, setPassword] = useState('');

  const [logAccountName, getAccountName] = useState('');
  const [logEmail, getEmail] = useState('');
  const [logPassword, getPassword] = useState('');

  // const [accountIndex, getAccountIndex] = useState('');

  let accountArray = [];

  // function to confirm what info is being passed through before implemented database
  /* const registrationInfo = () => {
    console.log(regAccountName + " " + regEmail + " " + regPassword);
    accountArray.push([regEmail,regPassword]);
    console.log(accountArray);
  };

  const loginInfo = () => {
    console.log(logEmail + " " + logPassword);
  }; */

  const addAccount = () => {
    // CHANGE THIS LATER
    // Make POST request passing in values from the
    // form. then() promise that occurs after the
    // POST request is completed.
    Axios.post('http://localhost:3001/register', {
      accountName: regAccountName,
      email: regEmail,
      password: regPassword
    }).then(() => {
      console.log("SUCCESS: Account registered!");
    });
  };

  const loginAccount = () => {
    // CHANGE THIS LATER
    Axios.get('http://localhost:3001/login', {
      accountName: logAccountName,
      password: logPassword
    });
  };

  return (
    <div className="App">
      
      <div className="regForm">
        <header><h1>Register Your Kingdom</h1></header>
        
        <label>Account Name:</label>
        <input type="text" 
          onChange={(event) => { setAccountName(event.target.value);}}
          required
        />
        
        <label>Email Address:</label>
        <input type="text" 
          onChange={(event) => { setEmail(event.target.value);}}
          required
        />

        <label>Password:</label>
        <input type="text" 
          onChange={(event) => { setPassword(event.target.value);}}
          required
        />

        <button 
        onClick={addAccount}
        >Register</button>

      </div>
<div className="spacer">
   
</div>
<hr />
      <div className="logForm">
      <header><h1>Log Into Your Kingdom</h1></header>
        
        <label>Account Name:</label>
        <input type="text" 
          onChange={(event) => { getEmail(event.target.value);}}
          value = ''
          required
        />
        
        {/* <label>Email Address:</label>
        <input type="text" 
          onChange={(event) => { getEmail(event.target.value);}}
          value = {logEmail}
          required
        /> */}

        <label>Password:</label>
        <input type="text" 
          onChange={(event) => { getPassword(event.target.value);}}
          value = ''
          required
        />

        <button 
        onClick={loginAccount}
        >Log In</button>
      </div>
    </div>
  );
}

export default App;
