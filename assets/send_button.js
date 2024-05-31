import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ThemeContext from '../src/components/Widget/ThemeContext';

function Send({ ready }) {
  const { mainColor } = useContext(ThemeContext);

 if (!ready) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
    </svg>
  );
 }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <rect
        y="40"
        width="40"
        height="40"
        rx="20"
        transform="rotate(-90 0 40)"
        fill="url(#paint0_linear_7985_12786)"
      />
      <path
        d="M21.0777 26.0024V16.6592L24.1359 19.7176C24.2871 19.8688 24.4863 19.9456 24.6855 19.9456C24.8847 19.9456 25.0839 19.8688 25.2351 19.7176C25.5399 19.4128 25.5399 18.9208 25.2351 18.616L20.8449 14.2232C20.8401 14.2184 20.8353 14.2184 20.8329 14.2136C20.7657 14.1488 20.6889 14.0912 20.5977 14.0528C20.5089 14.0144 20.4153 14.0024 20.3241 14C20.2977 14 20.2737 14.0024 20.2473 14.0048C20.1849 14.0096 20.1225 14.0216 20.0625 14.0408C20.0313 14.0504 20.0025 14.06 19.9713 14.0744C19.9065 14.1056 19.8465 14.1464 19.7889 14.1944C19.7745 14.2064 19.7577 14.2112 19.7457 14.2232C19.7409 14.228 19.7409 14.2328 19.7361 14.2352L15.2352 18.736C14.9256 19.0456 14.9184 19.5568 15.2328 19.8592C15.5376 20.152 16.0224 20.1496 16.3224 19.8472L19.5177 16.652V26C19.5177 26.4296 19.8657 26.7776 20.2953 26.7776C20.7297 26.78 21.0777 26.432 21.0777 26.0024Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7985_12786"
          x1="2.8972"
          y1="53.5514"
          x2="23.9252"
          y2="42.8037"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#6738EF"/>
          <stop offset="1" stop-color="#0081FF"/>
        </linearGradient>
      </defs>
    </svg>
  );
}


Send.propTypes = {
  ready: PropTypes.bool
};

export default Send;
