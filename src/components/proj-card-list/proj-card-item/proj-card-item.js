import React, {Component} from 'react';
import "./proj-card-item.css";
/* Services */
import { withProjectsService } from '../../hoc'
import { compose } from '../../../utils';
/* Modules for Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clickProjCard, mouseenterProjCard, mouseleaveProjCard } from '../../../actions';

/* Loading inicator for project card */
const ProjLoadingIndicator = ({stateClass}) => {
    return (
     <div className = {`proj-card-loader ${stateClass}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
   )
};

/* Project card item */
class ProjCardItem extends Component  {
  prevStClass = '';
  render() {
    const { id, title, cards, lessWidth600, clickProjCard, mouseenterProjCard, mouseleaveProjCard } = this.props;
    const { letterSize, stateClass } = cards[id-1];
    return (
      <div
       className = {`proj-card ${lessWidth600 && 'lessWidth600'}`}
       onClick = {() => { clickProjCard()}}
       onMouseEnter = {() => mouseenterProjCard()}
       onMouseLeave = {() => mouseleaveProjCard()} >
        <div className = {`proj-card-word-1 ${stateClass}`} style={{fontSize: letterSize }} >{title[0]}</div>
        <div className = {`proj-card-word-2`} ></div>
        <div className = {`proj-card-square`} >
          <div className = {stateClass} ></div>
          <div className = {stateClass} ></div>
          <div className = {stateClass} ></div>
          <div className = {stateClass} ></div>
        </div>
        {!lessWidth600 &&
          <div className={`proj-card-word-line ${stateClass}`}>
            <div>
              <svg  width="100%" height="3px" >
                <line x1="0" y1="0.6" x2="100%" y2="0.6" fill="none" stroke="#ca3232" strokeWidth="1.4" />
              </svg>
            </div>
          </div>
        }
        {stateClass==='loadingBegin' && <ProjLoadingIndicator stateClass = {stateClass}/>}
        <div className="hidden"></div>
      </div>
    )
  }
};

/* Redux store and dispatch to props */
const mapStateToProps = ({
  projectCards: {cards},
  redButton: { stateClass: flyOutClass },
  responsiveQuery: {lessWidth600} }) => {
  return { cards, flyOutClass, lessWidth600 };
};

const mapDispatchToProps = (dispatch, { projectsService, id }) => {
  return bindActionCreators({
    clickProjCard: clickProjCard({ projectsService, id }),
    mouseenterProjCard: mouseenterProjCard(id),
    mouseleaveProjCard: mouseleaveProjCard(id),
   }, dispatch );
};

/* Export SoundControl with Connect & Compose */
export default compose(
  withProjectsService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ProjCardItem);
