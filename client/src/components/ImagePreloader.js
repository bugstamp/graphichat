import React from 'react';

import loginBgImage from '../assets/images/login-bg_1920_80.jpg';
import regBgImage from '../assets/images/reg-bg__1920_65.jpg';

const ImagePreloader = () => (
  <div className="image-preloader" style={{ display: 'none' }}>
    <img src={loginBgImage} alt="" />
    <img src={regBgImage} alt="" />
  </div>
);

export default ImagePreloader;
