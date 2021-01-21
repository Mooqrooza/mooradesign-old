import React, {Component} from 'react';
import ProjCardItem from './proj-card-item'
import './proj-card-list.css';
/* Modules for Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProjects } from '../../actions';
/* Service modules */
import { withProjectsService } from '../hoc';
import { compose } from '../../utils';


/* Project list container */
class ProjCardList extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  };
  render() {
    const { projects, projsLoading, projsLoadingErr, lessWidth600, stateClass } = this.props;
    if (projsLoading) return <div></div>;
    if (projsLoadingErr) return <div></div>;
    return (
      <div className={`proj-card-list ${lessWidth600 && 'lessWidth600'} ${stateClass}`} >
        { projects.map( (item) => {
            const {id, ...props } = item;
            return <ProjCardItem {...props} key={`k${id}`} id={id} />
         }) }
      </div>
    )
  }
};

/* Redux store and dispatch to props */
const mapStateToProps = ({
  main: { projects, projsLoading, projsLoadingErr },
  responsiveQuery: {lessWidth600},
  mainAnimations: {stateClass} }) => {
  return { projects, projsLoading, projsLoadingErr, lessWidth600, stateClass };
};
const mapDispatchToProps = (dispatch, { projectsService }) => {
  return bindActionCreators({
    fetchProjects: fetchProjects( projectsService ),
  }, dispatch );
};

/* Export ProjectListContainer with Connect & Compose */
export default compose(
  withProjectsService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ProjCardList);
