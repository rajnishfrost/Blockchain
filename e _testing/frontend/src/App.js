import axios from "axios"
import {useState} from "react"

function App() {
  const [balance, setBalance] = useState(0);
  const [balanceInput , setBalanceInput] = useState()

const findBalance = () => {
    axios({
      method : "POST" ,
      url : "http://localhost:2001/balanceOf" ,  
      data : balanceInput ,
      headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
  }).then((d) => {
      setBalance(d.data)
    })
  }
  


  return (
   <>
   <div>
    <div>
      <h1>Balance Of = {balance}</h1>
      <input type="text" onChange={(e) => {setBalanceInput({data : e.target.value})}}/>
      <button onClick={() => {findBalance();}}>find</button>
      <h3></h3>
    </div>
   </div>
   </>
  );
}

export default App;
