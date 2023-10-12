import React, { useContext } from 'react';
import './App.css';
import { MyContext } from './myContext';

const EmiDisplay = ()=>{
    const  [userInput,emiValue] = useContext(MyContext)
return(
    <>
    <div className='emiDisplay'>
          <h3>Your EMI Details</h3>
          <label>Loan EMI</label>
          <h4>₹ {emiValue} </h4>
          <hr/>
          <label>Principal Amount</label>
          <h4>₹ {userInput.principleAmt} </h4>
          <hr/>
          <label>Total Interest Payable</label>
          <h4>₹ {(emiValue *(userInput.tenure * 12))- userInput.principleAmt }</h4>
          <hr/>
          <label>Total Payment</label>
          <h4>₹ {emiValue *(userInput.tenure * 12)}</h4>
        </div>
    </>
)
}

export default EmiDisplay;