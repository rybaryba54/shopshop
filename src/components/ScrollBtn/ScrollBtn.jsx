import React from 'react';
import arrow from '../../assets/arrow.svg';

const ScrollBtn = () => {
  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <button onClick={toTop} className='myBtn' title="Go to top">
        <img src={arrow} className='btnImg' alt="arrow" />
      </button>
    </>
  );
};

export default ScrollBtn;
