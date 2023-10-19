import React, { useEffect, useState } from 'react';
import './App.css';
import EmiDisplay from './emiDisplay';
import { MyContext } from './myContext';

function EmiCalc() {
  const intrestValue = {
    principleLabel: 'Loan Amount:',
    tenureLabel: 'Tenure (Years)',
    irLabel: 'Interest Rate (% P.A.)',
    principleAmt: 2500000,
    tenure: 30,
    pa: 8.5,
  };
  const [text, setText] = useState(intrestValue);
  const [emiValue,setEmival]=useState('');
  useEffect(()=>{
    emiCalculation();
  },[text])
  
  const emiCalculation = () => {
    let principleAmount = text.principleAmt;
    let tenure = text.tenure;
    let rateofIntrest = text.pa;

    const monthlyInterest = rateofIntrest / 12 / 100;
    const tenureMonthly = tenure * 12;

    const emi =
      (principleAmount *
        monthlyInterest *
        Math.pow(1 + monthlyInterest, tenureMonthly)) /
      (Math.pow(1 + monthlyInterest, tenureMonthly) - 1);

    setEmival(Math.ceil(emi));
  };
  const handleChange = (event) => {
    let changeValue = event.target.className;
    let changeamt = event.target.value;
    const updateValue = { ...text, [changeValue]: changeamt };
    setText(updateValue);
  };

  return (
    <>
    <MyContext.Provider value={[text,emiValue]}>
      <div className='form-calculator'>


        <div className="emiContainer">
          <div className='form-group'>
            <label>
              {text.principleLabel}
            </label>
            <div className="inputTxtGrp">
              <input
                type="text"
                className="principleAmt"
                value={text.principleAmt}
                onChange={handleChange}
              />
              <span>₹</span></div>
            <input
              type="range"
              min="100000"
              max="100000000"
              value={text.principleAmt}
              onChange={handleChange}
              className="principleAmt"
              id="principleAmt"
            />
          </div>
          <div className='form-group'>
            <label>{text.tenureLabel}</label>
            <div className="inputTxtGrp">
              <input
                type="text"
                className="tenure"
                value={text.tenure}
                onChange={handleChange}
              />
              <span>
                &#128198;	</span></div>
            <input
              type="range"
              min="1"
              max="30"
              value={text.tenure}
              onChange={handleChange}
              className="tenure"
              id="tenure"
            />
          </div>
          <div className='form-group'>
            <label>{text.irLabel}</label>
            <div className="inputTxtGrp">
              <input
                type="text"
                className="pa"
                value={text.pa}
                onChange={handleChange}
              />
              <span>
                📈	</span></div>
          </div>
          <button id ="emiBtn"onClick={emiCalculation}>EMI Calculate</button>
        </div>
        <EmiDisplay/>

      </div>
      </MyContext.Provider>
      {/* <button onClick={emiCalculation}>EMI Calculate</button> */}
    </>
  );

}

export default EmiCalc;
