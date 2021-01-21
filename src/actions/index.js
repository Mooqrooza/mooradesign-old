/* Import overlap actions */
import {
  overlapToInfoPage,
  overlapFromInfoPage,
  overlapToProjPage,
  overlapFromProjPage,
  overlapToPrevProj,
  overlapToNextProj,
  overlapCoverCheck,
  overlapOpacityCheck,
} from './solid-overlap';
/* Import redux store */
import store from '../store.js';
/* Import audio object for control bground sound */
import { audioObject } from '../utils';
/* Variables */
const dispatch = store.dispatch;
const getState = store.getState;
/* Win size control */
let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

/***************************** RESPONSIVE ACTIONS *****************************/
window.addEventListener("resize", () => {
  winWidth = window.innerWidth;
  winHeight = window.innerHeight;
  dispatch({ type: 'WIN_HEIGHT', payload: winHeight });
  switch (true) {
    case winHeight < 500  : dispatch({type: 'LESS_HEIGHT_500'}); break;
    case winHeight < 600  : dispatch({type: 'LESS_HEIGHT_600'}); break;
    case winHeight < 700  : dispatch({type: 'LESS_HEIGHT_700'}); break;
    case winHeight < 800  : dispatch({type: 'LESS_HEIGHT_800'}); break;
    case winHeight < 1000 : dispatch({type: 'LESS_HEIGHT_1000'}); break;
    case winHeight > 999  : dispatch({type: 'MORE_HEIGHT_999'}); break;
  }
  switch (true) {
    case winWidth < 500   : dispatch({type: 'LESS_WIDTH_500'}); break;
    case winWidth < 600   : dispatch({type: 'LESS_WIDTH_600'}); break;
    case winWidth < 800   : dispatch({type: 'LESS_WIDTH_800'}); break;
    case winWidth < 1000  : dispatch({type: 'LESS_WIDTH_1000'}); break;
    case winWidth < 1010  : dispatch({type: 'LESS_WIDTH_1010'}); break;
    case winWidth < 1200  : dispatch({type: 'LESS_WIDTH_1200'}); break;
    case winWidth > 1199  : dispatch({type: 'MORE_WIDTH_1199'}); break;
  }
});

/************ FETCH PROJECTS & REDIRECT DATA TO COMPONENTS ACTIONS ************/
const projectsRequested = () => ({ type: 'FETCH_PROJECTS_REQUEST' });
const projectsLoaded = (projects) => ({ type: 'FETCH_PROJECTS_SUCCESS', payload: projects });
const projectsError = (error) => ({ type: 'FETCH_PROJECTS_FAILURE', payload: error });
/* Get and redirect needed data to components */
const useProjectsData = (projects) => {
  const cards = projects.map( (item) => {
    const sizes = [50,90,100,48,60];
    const size = sizes[Math.round(Math.random()*4)];
    return ({ id: item.id, stateClass: 'none',
      offSens: false, letterSize: size, showed: false });
  });
  dispatch(updateProjCards(cards));
};
/* Fetch projects data */
const fetchProjects = (projectsService) => () => (dispatch) => {
  projectsService.getProjects().then((projects) => {
    window.dispatchEvent(new Event('resize'));
    useProjectsData(projects);
    setTimeout(() => {
      dispatch(projectsLoaded(projects));
      dispatch(mainAnimationPlay());
      setTimeout(() => mainAnimationInitial(),500)
      setTimeout(() => reactRemarkShow(), 2500);
    },1200);
  }).catch( (error) => { dispatch(projectsError(error)) } );
};

/************************* MAIN ANIMATION ACTIONS *****************************/
/* Looped animation state */
const mainAnimationPlay = () => ({ type:'MAIN_ANIMATION_PLAY' });
const mainAnimationPause = () => ({ type:'MAIN_ANIMATION_PAUSE' });
/* Show first animations */
const mainAnimationInitial = () => {
  dispatch({ type:'MAIN_ANIMATION_INITIAL'});
  setTimeout(() => dispatch({ type:'MAIN_ANIMATION_LOOP'}), 2000);
};

/*************************** PROJECT CARDS ACTIONS ****************************/
const updateProjCards = (cards) => ({ type: 'PROJ_CARDS_UPDATE', payload: cards });
/* Select loading project card */
const setLoadStyleToProjCard = (cards, id) => {
  cards = cards.map( item => {
    if (id === item.id) return ({
      ...item, stateClass: 'loadingBegin', offSens: true, showed: true });
    if (item.stateClass === 'loadingBegin') return ({ ...item, stateClass: 'hoverOff', offSens: false });
   return item;
 });
  dispatch(updateProjCards(cards));
};
/* Sens Off for all project cards, update cards arr  */
const sensOffProjCardsStyles = (cards) => {
  cards = cards.map( item => ({ ...item, offSens: true }) );
  dispatch(updateProjCards(cards));
};
/* Sens Off for all project cards, update cards arr  */
const resetProjCardsStyles = () => {
  let cards = getState().projectCards.cards.slice(0);
  cards = cards.map( item => ({ ...item, stateClass: 'none', offSens: false }) );
  dispatch(updateProjCards(cards));
};
/* Set fly animate for all project cards, update cards arr  */
const updateProjCardsFlyOut = () => {
  let cards = getState().projectCards.cards.slice(0);
  cards = cards.map( item => ({...item, offSens: true, stateClass: 'flyOut' }) );
  dispatch(updateProjCards(cards));
};
/* Set fly animate for all project cards, update cards arr  */
const updateProjCardsFlyBack = () => {
  let cards = getState().projectCards.cards.slice(0);
  cards = cards.map( item => ({...item, offSens: false, stateClass: 'flyBack' }) );
  dispatch(updateProjCards(cards));
};
/* Set mouse enter style for current card, update cards arr */
const mouseenterProjCard = (id) => () => () => {
  const cards  = getState().projectCards.cards.slice(0);
  const card = cards[id-1];
  if (card.offSens) return;
  card.stateClass = 'hoverOn';
  dispatch(updateProjCards(cards));
};
/* Set mouse leave style for current card, update cards arr */
const mouseleaveProjCard = (id) => () => () => {
  const cards = getState().projectCards.cards.slice(0);
  const card = cards[id-1];
  if (card.offSens) return;
  card.stateClass = 'hoverOff';
  dispatch(updateProjCards(cards));
};
/* Project card ckick & start to showing project present page */
const clickProjCard = ({ projectsService, id }) => () => () => {
  const cards  = getState().projectCards.cards.slice(0);
  const card = cards[id-1];
  const project = getState().main.projects[id-1];
  if (card.loading) return; /* Exit */
  setLoadStyleToProjCard(cards, card.id);
  projectsService.getProjectImages(id).then(images => {
      dispatch(overlapToProjPage('#ffffff','#ca3232'));
      mainAnimationPause();
      overlapCoverCheck().then(() => {
        scrollUp();
        showProjsPage({ dispatch, images, project })
      });
  }).catch(error => dispatch(projectsError(error)) );
};

/*************************** PROJECT PRESENT ACTIONS **************************/
const showPpCloseButton = () => ({type: 'SHOW_PP_CLOSE_BUTTON'});
const hidePpCloseButton = () => ({type: 'HIDE_PP_CLOSE_BUTTON'});
const clickPpCloseButton = () => () => (dispatch) => {
  dispatch(hidePpCloseButton());
    dispatch(overlapFromProjPage('#ca3232','#ca3232'));
    overlapOpacityCheck().then(() => {
      scrollUp();
      dispatch(mainAnimationPlay());
      dispatch(setAudioButtonColor("#ca3232"));
      dispatch(hideProjsPage());
      dispatch(clearProjsPage());
      resetProjCardsStyles();
    });
};
const clearProjsPage = () => ({type: 'CLEAR_PROJ_MEDIA'});
const hideProjsPage = () => ({type: 'HIDE_PROJ_PAGE'})
/* Show project present page */
/* Call from clickProjCard action */
const showProjsPage = ({ dispatch, images, project }) => {
  let colors = project.colors.split(/\s*,\s*/,7);
  dispatch({
    type: 'SHOW_PROJ_PAGE',
    payload: {
      projImages: images,
      stateClass: 'show',
      projInfo: project,
      showPage: true,
      txtColorNew: colors[0],
      bgColorNew: colors[1],
    }
  });
  dispatch(setAudioButtonColor(colors[0]));
  setTimeout( () => { dispatch(showPpCloseButton()) }, 500);
};
const rollNextProjButton = () => ({ type:'ROLL_PP_NEXT_BUTTON'});
const rollPrevProjButton = () => ({ type:'ROLL_PP_PREV_BUTTON'});
const rollOffNextProjButton = () => ({ type:'ROLLOFF_PP_NEXT_BUTTON'});
const rollOffPrevProjButton = () => ({ type:'ROLLOFF_PP_PREV_BUTTON'});
const clickPpNextButton = (projectsService) => () => (dispatch, getState) => {
  if (getState().projPresentButtons.nextBttBussy) { return { /* Fuck! */ } }
  const projects = getState().main.projects;
  let cards = getState().projectCards.cards.slice(0);
  let inx = cards.findIndex( i => i.showed === true );
  if (inx === -1) { return { /* Fuck! */ } }
  let project = projects[inx];
  const oldColors = project.colors.split(/\s*,\s*/,7);
  let colors = ['#fffs','#ca3232'];
  inx > cards.length-2 ? inx = 0 : inx++;
  project = projects[inx];
  colors = project.colors.split(/\s*,\s*/,7);
  dispatch( rollOffPrevProjButton() );
  dispatch( rollNextProjButton() );
  /* Wait Iamges loading */
  projectsService.getProjectImages( project.id )
    .then( (images) => {
      cards = cards.map( (item) => {
        if (item.id === project.id) { return { ...item, showed: true } }
        else return { ...item, showed: false } });
      dispatch( updateProjCards(cards) );
      overlapToNextProj( dispatch, oldColors[1], colors[1] );
      overlapCoverCheck().then(() => {
        scrollUp();
        fillProjectPresent({ dispatch, images, project , colors });
        dispatch( rollOffNextProjButton() );
      });
    }).catch( (err) => { /* Fuck! */ });
};

const clickPpPrevButton = (projectsService) => () => (dispatch, getState) => {
  if (getState().projPresentButtons.prevBttBussy) { return; /* Fuck! */ }
  const projects = getState().main.projects;
  let cards = getState().projectCards.cards.slice(0);
  let inx = cards.findIndex( i => i.showed === true );
  if (inx === -1) { return { /* Fuck! */ } }
  let project = projects[inx];
  const oldColors = project.colors.split(/\s*,\s*/,7);
  let colors = ['#ffffff','#ca3232'];
  inx < 1 ? inx = cards.length-1 : inx--;
  project = projects[inx];
  colors = project.colors.split(/\s*,\s*/,7);
  dispatch( rollOffNextProjButton() );
  dispatch( rollPrevProjButton() );
  /* Wait Iamges loading */
  projectsService.getProjectImages( project.id )
    .then( (images) => {
      cards = cards.map( (item) => {
        if (item.id === project.id) { return { ...item, showed: true } }
        else return { ...item, showed: false } });
      dispatch( updateProjCards(cards) );
      overlapToPrevProj(dispatch, oldColors[1], colors[1]);
      overlapCoverCheck().then(() => {
        scrollUp();
        fillProjectPresent({ dispatch, images, project, colors });
        dispatch(  rollOffPrevProjButton() );
      });
    }).catch( (err) => { /* Fuck! */ });
};

const fillProjectPresent = ({ dispatch, images, project, colors }) => {
  dispatch({
    type: 'FILL_PROJ_PAGE',
    payload: {
      projImages: images,
      projInfo: project,
      txtColorNew: colors[0],
      bgColorNew: colors[1],
    }
  });
  dispatch(setAudioButtonColor(colors[0]));
};

/**************************** RED BUTTON ACTIONS ******************************/
const flyOutRedButton = () => ({ type:'RED_BUTTON_FLY_OUT' });
const flyBackRedButton = () => ({ type:'RED_BUTTON_FLY_BACK' });
const clickRedButton = (projectsService) => () => (dispatch, getState) => {
  projectsService.cancelAxToken();
  updateProjCardsFlyOut();
  dispatch(flyOutRedButton());
  setTimeout( () => {
    dispatch(setAudioButtonColor("#ffffff"));
    dispatch(overlapToInfoPage('#ffffff','#ca3232'));
    dispatch(mainAnimationPause());
    audioObject.onLowpassFilter();
    overlapCoverCheck().then(() => {
      dispatch(showInfoPageContent());
      dispatch(showInfoPage());
      scrollUp();
      setTimeout( () => dispatch(showIpCloseButton()), 700);
    });
  }, 600);
};

/***************************** INFO PAGE ACTIONS ******************************/
const showInfoPage = () => ({ type: "SHOW_INFO_PAGE" });
const hideInfoPage = () => ({ type: "HIDE_INFO_PAGE" });
const showIpCloseButton = () => ({ type: 'SHOW_IP_CLOSE_BUTTON' });
const hideIpCloseButton = () => ({ type: 'HIDE_IP_CLOSE_BUTTON' });
const showInfoPageContent = () => ({ type: 'SHOW_IP_CONTENT'});
const hideInfoPageContent = () => ({ type: 'HIDE_IP_CONTENT'});
const clickIpCloseButton = () => () => (dispatch, getState) => {
  dispatch(hideInfoPageContent());
  dispatch(overlapFromInfoPage('#ca3232','#ca3232') );
  dispatch(hideIpCloseButton());
  audioObject.offLowpassFilter();
  overlapOpacityCheck().then(() => {
    updateProjCardsFlyBack();
    dispatch(setAudioButtonColor("#ca3232"));
    dispatch(flyBackRedButton());
    dispatch(hideInfoPage());
    dispatch(mainAnimationPlay());
  });
};

/******************************  AUDIO ACTIONS ********************************/
const clickAudioButton = () => () => (dispatch, getState) => {
  let stateClass = '';
  const play = !getState().audioControl.play;
  if (!getState().audioControl.audioLoaded) {
    stateClass = getState().audioControl.stateClass;
    stateClass.indexOf('freeClick1') === -1 ?
      stateClass='loading freeClick1' : stateClass='loading freeClick2';
    dispatch({ type: 'FREE_CLICK_AUDIO_BUTTON', payload: stateClass });
    return};
  if (play) {
    if (!getState().audioControl.pageIsHide) {audioObject.offLowpassFilterFast()}
    audioObject.playAudioObject(); stateClass = 'play';
  } else { audioObject.pauseAudioObject(); stateClass = 'pause'; }
  dispatch({
    type: 'CLICK_AUDIO_BUTTON',
    payload: {
      stateClass: stateClass,
      play: play,
    }
  });
};
const setBgAudio = (audioFile) => ({type: 'SET_BG_AUDIO', payload: audioFile});
const setAudioButtonColor = (bttColor) => ({ type: 'SET_AUDIO_BUTTON_COLOR', payload: bttColor });
const bgAudioRequested = () => ({ type: 'FETCH_BG_AUDIO_REQUEST' });
const bgAudioLoaded = () => ({type: 'FETCH_BG_AUDIO_SUCCESS', payload: true});
const bgAudioError = (err) => ({type: 'FETCH_BG_AUDIO_FAILURE', payload: err});
const fetchBgAudio = (projectsService) => () => (dispatch) => {
  dispatch(bgAudioRequested());
  projectsService.getBgAudio().then((audio) => {
    dispatch(setBgAudio(audio));
    dispatch(bgAudioLoaded());
    audioObject.setAudioObject(audio);
  }).catch( (err) => dispatch(bgAudioError(err)) );
};

/******************************** LOGO ACTIONS ********************************/
const countLogoKicks = (kickCount) => ({ type: 'COUNT_LOGO_KICKS', payload: kickCount });
const countLogoLifes = (lifes) => ({ type: 'COUNT_LOGO_LIFES', payload: lifes });
const showLogoLifes= () => ({ type: 'SHOW_LOGO_LIFES'});
const hideLogoLifes= () => ({ type: 'HIDE_LOGO_LIFES'});
const logoDestroyed= () => ({ type: 'LOGO_DESTROYED'});
const logoFirstShow= () => ({ type: 'LOGO_FIRST_SHOW'});

const clickLogo = () => () => () => {
  let lifes = getState().logo.lifes;
  let kickCount = getState().logo.kickCount+1;
  dispatch(countLogoKicks(kickCount));
  if (kickCount < 3) return;
  dispatch(showLogoLifes());
  if (kickCount === 3) return;
  lifes < 1 ? lifes = 0 : lifes--;
  dispatch(countLogoLifes(lifes));
  if (lifes === 0) {
    audioObject.lowpassFilterLogoDestroy();
    dispatch(logoDestroyed());
    return;
  }
};

/*************************** REACT REMARK ACTIONS *****************************/
const reactRemarkShow = () => { dispatch({ type: 'REACT_REMARK_SHOW' }); };
const reactRemarkHide = () => { dispatch({ type: 'REACT_REMARK_HIDE' }); };

const scrollUp = () => {
  window.scrollTo(0,0);
  window.scroll(0,0);
};


/* EXPORT ACTIONS & A-CREATORS */
export {
  fetchProjects,
  fetchBgAudio,
  clickProjCard,
  mouseenterProjCard,
  mouseleaveProjCard,
  mainAnimationPlay,
  mainAnimationPause,
  clickRedButton,
  clickPpCloseButton,
  clickIpCloseButton,
  clickPpPrevButton,
  clickPpNextButton,
  clickAudioButton,
  clickLogo,
};
