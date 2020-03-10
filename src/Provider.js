import React from 'react';
import './App.css';

export default function Provider(props) {  
    return (
      <div>
         <img className="photo-img" src={props.image} alt="image" align="middle"/>      
         <div className="provider-name">{props.name}</div> 
         <div className="provider-subspecialties">{props.subspecialties && props.subspecialties.map(row => 
               <div> {row}</div>
         )}</div> 
      </div>
    );
  }