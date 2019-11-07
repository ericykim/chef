import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import cn from 'classnames';
import styles from './styles.css';

const Countdown = ({ className, startTime }) => {
  const [timerOn, setTimerOn] = useState(false);
  const [timerStart, setTimerStart] = useState(startTime);
  const [timerTime, setTimerTime] = useState(timerStart);

  useEffect(() => {
    setTimerOn(false);
    setTimerStart(startTime);
    setTimerTime(startTime);
  }, [startTime]);

  useEffect(() => {
    let timer = null;
    if (timerOn) {
      timer = setInterval(() => {
        if (timerTime > 0) {
          setTimerTime((timerTime) => timerTime - 1);
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
      setTimerTime(startTime);
    }
  };

  let seconds =
    Math.floor(timerTime % 60) % 60 === 0
      ? '00'
      : Math.floor(timerTime % 60) % 60;
  let minutes =
    Math.floor((timerTime / 60) % 60) === 0
      ? '00'
      : Math.floor((timerTime / 60) % 60);

  return (
    <div className={cn(styles.countdown, className)}>
      <h2 className={styles.title}>Timer: </h2>
      <h2 className={styles.timer}>
        {minutes} : {seconds}
      </h2>

      <div className={styles.buttons}>
        {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
          <Button type={'secondary'} onClick={startTimer}>
            Start
          </Button>
        )}
        {timerOn === true && timerTime >= 1 && (
          <Button type={'secondary'} onClick={stopTimer}>
            Stop
          </Button>
        )}
        {timerOn === false &&
          (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
            <Button type={'secondary'} onClick={startTimer}>
              Resume
            </Button>
          )}

        {(timerOn === false || timerTime < 1) &&
          (timerStart !== timerTime && timerStart > 0) && (
            <Button type={'secondary'} onClick={resetTimer}>
              Reset
            </Button>
          )}
      </div>
    </div>
  );
};

export default Countdown;
