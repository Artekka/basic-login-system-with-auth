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

  const [accountList, setAccountList] = useState([]);

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
    Axios.get('http://localhost:3001/login').then((response) => {
      console.log(response);
    });
  };

  const getAccountList = () => {
    Axios.get('http://localhost:3001/login').then((accountResponse) => {
      setAccountList(accountResponse.data);
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

        <button 
        onClick={getAccountList}
        >Get Account Info</button>


          
        <div className="showAccountInfo">

        {accountList.map((val,key) => {
            return (
              <div> 
              Account: <br /> {val.accounts_name}
            </div>
            )
          })}
          

        </div>

      </div>
    </div>
  );
}

export default App;
