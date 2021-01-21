const initialState = {
 projImages: [],
 projInfo: [],
 showPage: false,
 stateClass: 'hidden',
 bgColorOld: '##ca3232',
 bgColorNew: '##ca3232',
 txtColorOld: '#ffffff',
 txtColorNew: '#ffffff',
 prevProjLoading: false,
 nextProjLoading: false,
}

const projectsPresent = ( state = initialState, action ) => {
  const payload = action.payload;
  switch (action.type) {
    case 'NEXT_PROJ_LOADING_BEGIN':
      return { ...state, nextProjLoading: true, prevProjLoading: false };
    case 'PREV_PROJ_LOADING_BEGIN':
      return { ...state, prevProjLoading: true, nextProjLoading: false, };
    case 'CLEAR_PROJ_MEDIA':
      return {
        ...state,
         projImages: [],
         projInfo: [],
         bgColorNew: '#ca3232',
         txtColorNew: '#ffffff',
      };
    case 'SHOW_PROJ_PAGE':
      return {
        ...state,
        projImages: payload.projImages,
        showPage: payload.showPage,
        stateClass: payload.stateClass,
        projInfo: payload.projInfo,
        bgColorNew: payload.bgColorNew,
        txtColorNew: payload.txtColorNew,
      };
    case 'FILL_PROJ_PAGE':
      return {
        ...state,
        projImages: payload.projImages,
        projInfo: payload.projInfo,
        bgColorNew: payload.bgColorNew,
        txtColorNew: payload.txtColorNew,
      };
    case 'HIDE_PROJ_PAGE':
      return {
        ...state,
        stateClass: 'hide'
      };
   default: return state;
  }
};

export default projectsPresent;
