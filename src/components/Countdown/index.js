import React, { useState, useEffect } from 'react';
import './styles.css';

const Countdown = () => {
  const [timerOn, setTimerOn] = useState(false);
  const [timerStart, setTimerStart] = useState(0);
  const [timerTime, setTimerTime] = useState(0);

  useEffect(() => {
    let timer = null;
    if (timerOn) {
      timer = setInterval(() => {
        if (timerTime > 0) {
          setTimerTime(timerTime => timerTime - 1);
        } else {
          clearInterval(timer);
          setTimerOn(false);
          alert('Countdown ended');
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerOn, timerTime]);

  const startTimer = () => {
    setTimerOn(true);
    setTimerStart(timerTime);
    setTimerTime(timerTime);
  };

  const stopTimer = () => {
    setTimerOn(false);
  };

  const resetTimer = () => {
    if (timerOn === false) {
      setTimerTime(timerStart);
    }
  };

  const adjustTimer = input => {
    const max = 216000000;
    if (!timerOn) {
      if (input === 'incHours' && timerTime + 3600 < max) {
        setTimerTime(timerTime + 3600);
      } else if (input === 'decHours' && timerTime - 3600 >= 0) {
        setTimerTime(timerTime - 3600);
      } else if (input === 'incMinutes' && timerTime + 60 < max) {
        setTimerTime(timerTime + 60);
      } else if (input === 'decMinutes' && timerTime - 60 >= 0) {
        setTimerTime(timerTime - 60);
      } else if (input === 'incSeconds' && timerTime + 1 < max) {
        setTimerTime(timerTime + 1);
      } else if (input === 'decSeconds' && timerTime - 1 >= 0) {
        setTimerTime(timerTime - 1);
      }
    }
  };

  let seconds = Math.floor(timerTime % 60) % 60 === 0 ? '00' : Math.floor(timerTime % 60) % 60;
  let minutes = Math.floor((timerTime / 60) % 60) === 0 ? '00' : Math.floor((timerTime / 60) % 60);
  let hours =
    Math.floor((timerTime / 3600) % 60) === 0 ? '00' : Math.floor((timerTime / 3600) % 60);

  return (
    <div className='Countdown'>
      <div className='Countdown-header'>Countdown</div>
      <div className='Countdown-label'>Hours : Minutes : Seconds</div>
      <div className='Countdown-display'>
        <button onClick={() => adjustTimer('incHours')}>&#8679;</button>
        <button onClick={() => adjustTimer('incMinutes')}>&#8679;</button>
        <button onClick={() => adjustTimer('incSeconds')}>&#8679;</button>

        <div className='Countdown-time'>
          {hours} : {minutes} : {seconds}
        </div>

        <button onClick={() => adjustTimer('decHours')}>&#8681;</button>
        <button onClick={() => adjustTimer('decMinutes')}>&#8681;</button>
        <button onClick={() => adjustTimer('decSeconds')}>&#8681;</button>
      </div>

      {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
        <button className='Button-start' onClick={startTimer}>
          Start
        </button>
      )}
      {timerOn === true && timerTime >= 1 && (
        <button className='Button-stop' onClick={stopTimer}>
          Stop
        </button>
      )}
      {timerOn === false && (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
        <button className='Button-start' onClick={startTimer}>
          Resume
        </button>
      )}

      {(timerOn === false || timerTime < 1) && (timerStart !== timerTime && timerStart > 0) && (
        <button className='Button-reset' onClick={resetTimer}>
          Reset
        </button>
      )}
    </div>
  );
};

export default Countdown;
