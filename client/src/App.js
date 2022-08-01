import './App.css';
import {useState} from "react";
import Axios from "axios";

function App() {

  // create states

  const [regAccountName, setAccountName] = useState('');
  const [regEmail, setEmail] = useState('');
  const [regPassword, setPassword] = useState('');

  const [logAccountName, getAccountName] = useState('');
  // const [logEmail, getEmail] = useState('');
  const [logPassword, getPassword] = useState('');

  const [logStatus, setLogStatus] = useState('');


  const addAccount = () => {
    // CHANGE THIS LATER
    // Make POST request passing in values from the
    // form. then() promise that occurs after the
    // POST request is completed.
    Axios.post('http://localhost:3001/register', {
      accountName: regAccountName,
      email: regEmail,
      password: regPassword
    }).then((response) => {
      console.log("SUCCESS! Account registered: " + `${regAccountName}`)
      console.log(response.data);
    });
  };

  const loginAccount = () => {
    Axios.post('http://localhost:3001/login', {
      accountName: logAccountName,
      password: logPassword
    }).then((response) => {
      console.log(`SUCCESS! Account logged in: ${logAccountName}`)
      console.log(response.data);
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
          onChange={(e) => { getAccountName(e.target.value);}}
        />

        <label>Password:</label>
        <input 
          type="text" 
          onChange={(e) => { getPassword(e.target.value);}}
        />

        <button 
        onClick={loginAccount}
        >Log In</button>



      </div>
    </div>
  );
}

export default App;
