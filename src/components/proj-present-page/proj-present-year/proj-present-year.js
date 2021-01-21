import React from 'react';
import './proj-present-year.css';
/* Modules for Redux */
import { connect } from 'react-redux';

const ProjPresentYear = ({stateClass, txtColorNew, bgColorNew, projYear }) => {
  if (projYear === undefined) {projYear=['%','&','#','?']};
  return (
    <div className={`pp-year ${stateClass}`}>
      <div className='pp-year-numbs-bg' style={{ backgroundColor: bgColorNew }}></div>
      <div className='pp-year-numbs'>
        <div className='pp-year-numb' style={{ color: txtColorNew }} >
          <div className={stateClass} style={{ color: txtColorNew }} >{projYear[0]}</div>
        </div>
        <div className='pp-year-numb' style={{ color: txtColorNew }} >
          <div className={stateClass} style={{ color: txtColorNew }} >0</div>
          <div className={stateClass} style={{ color: txtColorNew }} >1</div>
          <div className={stateClass} style={{ color: txtColorNew }} >2</div>
          <div className={stateClass} style={{ color: txtColorNew }} >{projYear[1]}</div>
        </div>
        <div className='pp-year-numb'>
          <div className={stateClass} style={{ color: txtColorNew }} >0</div>
          <div className={stateClass} style={{ color: txtColorNew }} >1</div>
          <div className={stateClass} style={{ color: txtColorNew }} >2</div>
          <div className={stateClass} style={{ color: txtColorNew }} >3</div>
          <div className={stateClass} style={{ color: txtColorNew }} >{projYear[2]}</div>
        </div>
        <div className='pp-year-numb'>
          <div className={stateClass} style={{ color: txtColorNew }} >0</div>
          <div className={stateClass} style={{ color: txtColorNew }} >1</div>
          <div className={stateClass} style={{ color: txtColorNew }} >2</div>
          <div className={stateClass} style={{ color: txtColorNew }} >3</div>
          <div className={stateClass} style={{ color: txtColorNew }} >4</div>
          <div className={stateClass} style={{ color: txtColorNew }} >5</div>
          <div className={stateClass} style={{ color: txtColorNew }} >{projYear[3]}</div>
        </div>
      </div>
    </div>
  )
};

// Redux store and dispatch to props ******************************************
const mapStateToProps = ({
  projectsPresent: { stateClass, txtColorNew, bgColorNew, projInfo },
 }) => {
  return { stateClass, txtColorNew, bgColorNew, projYear: projInfo.year }
};

export default connect(mapStateToProps)(ProjPresentYear);
