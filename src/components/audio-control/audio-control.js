import React, {Component} from 'react';
import './audio-control.css';
/* Import services*/
import { withProjectsService } from '../hoc';
import { compose } from '../../utils';
/* Import modules for Redux */
import { fetchBgAudio, clickAudioButton } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* Audio control component */
class AudioControl extends Component {
  componentDidMount() { this.props.fetchBgAudio(); };
  render() {
    let { audioLoadingErr, clickAudioButton, stateClass, bttColor, play, lessWidth500 } = this.props;
    if (audioLoadingErr) {/* Fuck! */}
    if (play === null) {play='Loading sound...'} else {
      play ? play='Play' : play='Pause';
    }
    return (
      <div className={`audio-control ${lessWidth500 && 'lessWidth500'}`}>
        <div className={`audio-info ${stateClass}`} style={{ color: bttColor === '#ca3232' ? '#fff' : bttColor }}>
          <svg width='100%' height='3' className={`ai-line-1 ${stateClass}`} >
            <g opacity='0'><rect x="0" y="0" width="100%" height="1"  fill={bttColor} /></g>
          </svg>
          <svg width='100%' height='3' className={`ai-line-2 ${stateClass}`} >
            <g opacity='0'><rect x="0" y="0" width="100%" height="1"  fill={bttColor} /></g>
          </svg>
          {play}
        </div>
        <div className={`audio-button ${stateClass}`} onClick={() => clickAudioButton()} >
          <svg className={`abtt-circles ${stateClass}`} viewBox="0 0 64 64">
            <g>
              <rect width="64" height="64" fill="none"/>
              <path d="M63,32A31,31,0,0,1,1,32" fill="none" stroke={bttColor} strokeWidth='1.6' />
            </g>
            <g>
              <rect width="64" height="64" fill="none"/>
              <path d="M1,32a30.9,30.9,0,0,1,9.1-21.9" fill="none" stroke={bttColor} strokeWidth='1.6' />
            </g>
            <g>
              <rect width="64" height="64" fill="none"/>
              <path d="M1,32A30.9,30.9,0,0,1,3.4,19.9" fill="none" stroke={bttColor} strokeWidth='1.6' />
            </g>
          </svg>
          <div className='abtt-noise-lines' >
            <div className={stateClass} style={{backgroundColor: bttColor}} ></div>
            <div className={stateClass} style={{backgroundColor: bttColor }} ></div>
            <div className={stateClass} style={{backgroundColor: bttColor}}></div>
            <div className={stateClass} style={{backgroundColor: bttColor }}></div>
            <div className={stateClass} style={{backgroundColor: bttColor}}></div>
          </div>
        </div>
      </div>
    )
  }
};

/* Redux store and dispatch to props */
const mapStateToProps = ({
  audioControl: {
    audioLoadingErr,
    stateClass,
    bttColor,
    play },
    responsiveQuery: { lessWidth500 },
  }) => {
  return {
    audioLoadingErr,
    stateClass,
    bttColor,
    lessWidth500,
    play,
  };
};

const mapDispatchToProps = (dispatch, {projectsService}) => {
  return bindActionCreators({
    fetchBgAudio: fetchBgAudio(projectsService),
    clickAudioButton: clickAudioButton(),
   }, dispatch );
};

/* Export SoundControl with Connect & Compose */
export default compose(
  withProjectsService(),
  connect(mapStateToProps, mapDispatchToProps)
)(AudioControl);
