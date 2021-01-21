import React from 'react';
import './explosion-screen.css';
/* Modules for Redux */
import { connect } from 'react-redux';

const ExplosionScreen = ({ lifes }) => {
  let stateClass = '';
  if (lifes<1) stateClass = 'shot';
  return (
    <div className={`explosion-screen ${stateClass}`} ></div>
  )
};

/* Redux store and dispatch to props */
const mapStateToProps = ({ logo: { lifes } }) => {
  return { lifes }
};

export default connect(mapStateToProps)(ExplosionScreen);
