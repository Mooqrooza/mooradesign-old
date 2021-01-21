import React, {Component, Fragment} from 'react';
import './app.css';
/* Import other components */
import MainBackground from '../main-background';
import Header from '../header';
import MainTxtElements from '../main-txt-elements';
import ProjCardList from '../proj-card-list';
import RedButtonElements from '../red-button-elements';
import Footer from '../footer';
import SolidOverlap from '../solid-overlap';
import InfoPage from '../info-page';
import ProjPresentPage from '../proj-present-page';
import AudioControl from '../audio-control';
import LoadingScreen from '../loading-screen';
import ReactedRemark from '../reacted-remark';
import ExplosionScreen from '../explosion-screen';
/* Import modules for Redux */
import { connect } from 'react-redux';

/* Main App */
class App extends Component {
  render() {
    return (
      <Fragment>
        <MainBackground />
        <Header />
        <div className="main-content" >
          <MainTxtElements />
          <ProjCardList />
          <RedButtonElements />
        </div>
        <Footer />
        <InfoPage />
        <ProjPresentPage />
        <SolidOverlap />
        <AudioControl />
        <LoadingScreen />
        <ExplosionScreen />
      </Fragment>
    );
  }
};

//<ReactedRemark />

/* Redux store and dispatch to props */
const mapStateToProps = ({ mainAnimations: {initialPlay, playState} }) => {
  return { initialPlay, playState }
};

/* Export App with connect-redux */
export default connect(mapStateToProps)(App);
