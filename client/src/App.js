import './App.css';
import {useEffect, useState} from 'react';

function App() {

  var [Status, setStatus] = useState("");
  var StatusMsg;

  useEffect(()=>{
    document.getElementById("form").addEventListener('submit', async (event)=>{
      event.preventDefault();
      setStatus('loading');
      var email = {
        "email": document.getElementById('email').value
      }
      try {
        let response = await fetch('http://127.0.0.1:8090/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
        })
        if(response.ok){
          let msg = await response.text();
          if(msg === "Subscription added")
          {
            setStatus("success");
          }
          else{
            if(msg === "User already exists"){
              setStatus('failure1')
            }
            else{
              console.log(msg);
              setStatus('failure2')
            }
          }
        }
        else{
          setStatus('failure2')
        }
      } catch (error) {
        console.log(error);
        setStatus('failure2');
      }

    })
  },[])

  if(Status==="success"){
    StatusMsg = "You have successfully subscribed";
  }
  else if(Status==="failure1"){
    StatusMsg = "This account is already subscribed";
  }
  else if(Status === "failure2"){
    StatusMsg = "Something went wrong. Please try again later";
  }

  return (
    <div className="App">
      <div id="form-title">
        <i className="fa fa-solid fa-envelope-open-text fa-3x" id="icon"></i>
        Subscribe to our newsletter to receive regular updates
      </div>
      <div id="response-msg" className={Status}>
        {StatusMsg}
      </div>
      <form id="form">
        <label>
          Email:
          <input type="email" placeholder="harshul@gloodai.com" id="email" required/>
        </label>
        <button type="submit">Subscribe</button>
      </form>
      
    </div>
  );
}

export default App;
