import { useReducer, useRef, useEffect } from "react";
import './App.css';
import { ImStopwatch } from "react-icons/im";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

function reducer(state, action) {
  switch(action.type) {
    case "START": 
    return { ...state, isTicking: true };
    case "PAUSE": 
    return { ...state, isTicking: false };
    case "RESET": 
    return { clock: 0, isTicking: false };
    case "TICK": 
    return { ...state, clock: state.clock + 1 };
    default: return state;
  }
}

const initialState = {
  clock: 0,
  isTicking: false
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const myTimerRef = useRef(0);
  const container = useRef();

  useGSAP(
    () => {
        gsap.from('h1', { duration: 1.3, y: -80, ease: "power0.easeNone", opacity: 0, delay: 1 });
        gsap.from('.btn-container', { duration: 1.3, y: 80, ease: "power0.easeNone", opacity: 0, delay: 1 });
        gsap.from('.center', { duration: 1.3, x: -80, ease: "power0.easeNone", opacity: 0, delay: 2 });
    },
    { scope: container }
);

  useEffect(() => {
    if (!state.isTicking) {
      return;
    }
    myTimerRef.current = setInterval(() => dispatch({type: "TICK"}), 1000);
    return () => {
      clearInterval(myTimerRef.current);
      myTimerRef.current = 0;
    }
  }, [state.isTicking])

  return (
    <div className="App" ref={container}>
      <h1><ImStopwatch className="icon" />Stopwatch</h1>
      <div className="center">
        <div className="time">
      <p className="timer-face">{state.clock}</p>
      </div>
      <div className="seconds-container">
      <p className="second">s</p>
      </div>
      </div>
      <div className="btn-container">
      <button className="btn start" onClick={() => dispatch({type: "START"})}>Start</button>
      <button className="btn pause" onClick={() => dispatch({type: "PAUSE"})}>Pause</button>
      <button className="btn reset" onClick={() => dispatch({type: "RESET"})}>Reset</button>
      </div>
    </div>
  );
}

export default App;
