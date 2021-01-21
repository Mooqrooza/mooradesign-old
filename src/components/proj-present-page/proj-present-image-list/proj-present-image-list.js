import React, { useRef, useEffect } from 'react';
import './proj-present-image-list.css';
import ProjPresentImageItem from '../proj-present-image-item';
/* Modules for Redux */
import { connect } from 'react-redux';


const ProjPresentImageList = ({projImages, stateClass, showPage, txtColorNew, lessWidth1010}) => {
  const ppImgListRef = useRef();
  useEffect(() => {

  })
  if (!showPage) return (<div className='pp-content'></div>);
  return (
    <div ref={ppImgListRef} className={`pp-content ${lessWidth1010 && 'lessWidth1010'}`} >
      { projImages.map( (item, idx) => {
        return <ProjPresentImageItem image={item} key={`k${idx}`} id={idx} txtColorNew={txtColorNew} /> })
      }
    </div>
  );
};

/* Redux store and dispatch to props */
const mapStateToProps = ({
  projectsPresent: {
    projImages,
    stateClass,
    showPage,
    txtColorNew },
  responsiveQuery: { lessWidth1010 }
}) => {
  return { projImages, stateClass, showPage,  txtColorNew, lessWidth1010 }
};

export default connect(mapStateToProps)(ProjPresentImageList);
