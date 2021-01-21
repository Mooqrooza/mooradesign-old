import React from 'react';
import './proj-present-image-item.css';

const ProjPresentImageItem = ({ image, id, txtColorNew }) => {
  return (
    <div className='pp-img-container' >
      <img alt='%$##' className='pp-img' src={image} />
      <div className='pp-img-counter' style={{ color: txtColorNew }}>{id+1}</div>
    </div>
  )

};

export default ProjPresentImageItem;
