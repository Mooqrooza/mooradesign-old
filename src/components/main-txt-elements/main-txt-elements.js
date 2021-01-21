import React from 'react';
import MainTxtLines from './main-txt-lines'
import MainTxtH1 from './main-txt-h1';
import './main-txt-elements.css';
/* Modules for Redux */
import { connect } from 'react-redux';

const MainTxtElements = ({ stateClass, lessWidth600 }) => {
  let badText = 'ТЫ РАЗРУШИЛ МОЙ ЛОГОТИП';
  badText = badText.split();
  return (
    <div className={`main-txt-place ${lessWidth600 && 'lessWidth600'}`}>
      <div>
        <MainTxtH1 />
      </div>
      <MainTxtLines />
      <div>
        <h2 className = {`main-txt-2 ${stateClass} ${lessWidth600 && 'lessWidth600'}`} >
          WEB-ДИЗАЙН, АНИМАЦИЯ, ЛОГОТИПЫ, сардельки...
        </h2>
      </div>
    </div>
  )
};

/* Redux store to props */
const mapStateToProps = ({ mainAnimations: { stateClass }, responsiveQuery: { lessWidth600} }) => {
  return { stateClass, lessWidth600 }
};

/* Export MainTxtElements */
export default connect(mapStateToProps)(MainTxtElements);
