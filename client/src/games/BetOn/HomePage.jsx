import React from "react";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      
       <div className="welcome">
         <div className="game-description">
           <h2>Welcome to Bet On!</h2>
           <div className="game-rules">
               <div className="rule-item">
               A game built to test your intuition Skills
             </div>
             <div className="rule-item">
               <span className="rule-icon green-dot"></span>
               <span>Green button lights up <strong>80%</strong> of the time</span>
             </div>
             <div className="rule-item">
               <span className="rule-icon red-dot"></span>
               <span>Red button lights up <strong>20%</strong> of the time</span>
             </div>
             <div className="rule-item">
               <span className="rule-icon random-icon">🎲</span>
               <span>The lighting is <strong>completely random</strong> per turn</span>
             </div>
             <div className="rule-item">
               <span className="rule-icon target-icon">🎯</span>
              <span>Predict which color will light up next</span>
            </div>
           </div>
          <p className="challenge-text">
             Can you beat the odds? Test your intuition across 20 rounds!
          </p>
         
           <Link to="/StartBetOn"> <button className="start" >
             Start challenge
         </button></Link>
       </div>
     </div>
     
    </div>
  )
}

export default HomePage