import React from 'react';
import InfoPageBackground from './info-page-background';
import InfoPageContacts from './info-page-contacts';
import InfoPageCloseButton from './info-page-close-button';
import './info-page.css';
/* Modules for Redux */
import { connect } from 'react-redux';

const InfoPage = ({ setTop, setLeft, infoPage, stateClass, windowHeight, lessWidth500, clickIpCloseButton }) => {
  let ipContentTop = '50%';
  if ( windowHeight ) { ipContentTop = windowHeight/2 }
  return (
    <div className={`info-page ${stateClass}`} >
      <InfoPageBackground />
      <div className='ip-content' style={{ top: ipContentTop }}>
        <InfoPageCloseButton />
        <div className='ip-text-wrapper'>
          <div className={`ip-text-1 ${lessWidth500 && 'lessWidth500'}`}>
            <span>Mooradesign</span> - дизайн гвоздей, пепельниц, арбалетов и прочей х... <br />
            Заряжаюсь кофеином, полетами на марс, бывает от сети.
          </div>
          <InfoPageContacts />
        </div>
      </div>

    </div>
  )
};

/* Redux store to props */
const mapStateToProps = ({ infoPage: { stateClass }, responsiveQuery: { windowHeight, lessWidth500 } }) => {
  return { stateClass, windowHeight, lessWidth500 }
};

export default connect(mapStateToProps)(InfoPage);
