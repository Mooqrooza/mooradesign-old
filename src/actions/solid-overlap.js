/* Import redux store */
import store from '../store.js';

/********************************** SIDE FUNCS ********************************/
/* Overlap position value check */
const overlapCoverCheck = async () => {
  return new Promise((resolve, reject) => {
    const obj = document.getElementsByClassName('overlap-mover')[0];
    const tmr = setInterval(() => {
      if (obj.offsetLeft === 0 ) { clearInterval(tmr); return resolve(); }
    },10);
  })
};

/* Overlap opacity value check */
const overlapOpacityCheck = async () => {
  return new Promise((resolve, reject) => {
    const obj = document.getElementsByClassName('overlap-mover')[0];
    const tmr = setInterval(() => {
      const opy = window.getComputedStyle(obj).getPropertyValue("opacity");
      if (opy > 0.99 ) { clearInterval(tmr); return resolve(); }
    },10);
  })
};

/******************************* OVERLAP ACTIONS ******************************/
/* Solid Overlap Actions & Creators */
const overlapToInfoPage = (bgColorOld, bgColorNew) => ({
  type: "SLIDE_TO_INFO_PAGE",
  payload: {
    mainStateClass: 'slideToInfo',
    childStateClass: 'slideToInfo',
    bgColorOld: bgColorOld,
    bgColorNew: bgColorNew,
  },
});
const overlapFromInfoPage = (bgColorOld, bgColorNew) => ({
  type: 'SLIDE_FROM_INFO_PAGE',
  payload: {
    mainStateClass: 'slideFromInfo',
    childStateClass: 'slideFromInfo',
    bgColorOld: bgColorOld,
    bgColorNew: bgColorNew,
  },
});
const overlapToProjPage = (bgColorOld, bgColorNew) => ({
  type: "SLIDE_TO_PROJ_PAGE",
  payload: {
    mainStateClass: 'slideToProj',
    childStateClass: 'slideToProj',
    bgColorOld: bgColorOld,
    bgColorNew: bgColorNew,
  }
});
const overlapFromProjPage = (bgColorOld, bgColorNew) => ({
  type: 'SLIDE_FROM_PROJ_PAGE',
  payload: {
    mainStateClass: 'slideFromProj',
    childStateClass: 'slideFromProj',
    bgColorOld: bgColorOld,
    bgColorNew: bgColorNew,
  },
});
const overlapToPrevProj = ( dispatch, bgColorOld, bgColorNew ) => {
  dispatch({type:'RESET_OVERLAP_ANIMATION'});
  setTimeout(() =>
  dispatch({
    type: 'SLIDE_TO_PREV_PROJ',
    payload: {
      mainStateClass: 'slideToPrevProj',
      childStateClass: 'slideToPrevProj',
      bgColorOld: bgColorOld,
      bgColorNew: bgColorNew,
    },
  }), 30)
};
const overlapToNextProj = ( dispatch, bgColorOld, bgColorNew ) => {
  dispatch({type:'RESET_OVERLAP_ANIMATION'});
  setTimeout(() =>
  dispatch({
    type: 'SLIDE_TO_NEXT_PROJ',
    payload: {
      mainStateClass: 'slideToNextProj',
      childStateClass: 'slideToNextProj',
      bgColorOld: bgColorOld,
      bgColorNew: bgColorNew,
    },
  }), 30)
};

export {
  overlapToInfoPage,
  overlapFromInfoPage,
  overlapToProjPage,
  overlapFromProjPage,
  overlapToPrevProj,
  overlapToNextProj,
  overlapCoverCheck,
  overlapOpacityCheck,
};
