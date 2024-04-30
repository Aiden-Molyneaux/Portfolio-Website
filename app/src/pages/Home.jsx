import React from 'react';
import heartSVG from '../assets/heart.svg';

export default function Home() {
  window.localStorage.setItem('location', JSON.stringify({ path: '/home' }));
  
  return (
    <>
      <div className='homeContent'>
        <h1>AIDEN MOLYNEAUX</h1>
        <h2>PASSIONATE PROGRAMMER & FULL-STACK DEVELOPER</h2>
        <p className='topMargin'>MY HEART BEATS TO PROGRAM</p>
      </div>
      <div className='heartContainer'>
        <img src={heartSVG} alt='A red geometric heart drawing, animated to be beating' className='heartSVG'/>
      </div>
    </>
  );
}