import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import close from 'assets/clear-button.svg';
import offlineAvatar from 'assets/cognity_offline.svg';
import fullscreen from 'assets/fullscreen_button.svg';
import fullscreenExit from 'assets/fullscreen_exit_button.svg';
import './style.scss';
import ThemeContext from '../../../../ThemeContext';

const Header = ({
  title,
  subtitle,
  fullScreenMode,
  toggleFullScreen,
  toggleChat,
  showCloseButton,
  showFullScreenButton,
  connected,
  connectingText,
  closeImage,
  profileAvatar,
  offlineMode
}) => {
  const { mainColor } = useContext(ThemeContext);
  const avatar = offlineMode ? offlineAvatar : profileAvatar;
  return (
    <div className="rw-header-and-loading">
      <div
        style={{ backgroundColor: mainColor }}
        className={`rw-header ${subtitle ? 'rw-with-subtitle' : ''} ${offlineMode ? 'rw-offline-header' : ''}`}
      >
        {
          avatar && (
            <img src={avatar} className="rw-avatar" alt="chat avatar" />
          )
        }
        <div className="rw-header-buttons">
          {
            showFullScreenButton &&
            <button className="rw-toggle-fullscreen-button" onClick={toggleFullScreen}>
              <img
                className={`rw-toggle-fullscreen ${fullScreenMode ? 'rw-fullScreenExitImage' : 'rw-fullScreenImage'}`}
                src={fullScreenMode ? fullscreenExit : fullscreen}
                alt="toggle fullscreen"
              />
            </button>
          }
          {
            showCloseButton &&
            <button className="rw-close-button" onClick={toggleChat}>
              <img
                className={`rw-close ${closeImage ? '' : 'rw-default'}`}
                src={closeImage || close}
                alt="close"
              />
            </button>
          }
        </div>
        <h4 className={`rw-title ${avatar && 'rw-with-avatar'}`}>{title}</h4>
        {subtitle && <span className={profileAvatar && 'rw-with-avatar'}>{subtitle}</span>}
      </div>
      {
        !connected &&
        <span className="rw-loading">
          {connectingText}
        </span>
      }
    </div>);
};

Header.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  fullScreenMode: PropTypes.bool,
  toggleFullScreen: PropTypes.func,
  toggleChat: PropTypes.func,
  showCloseButton: PropTypes.bool,
  showFullScreenButton: PropTypes.bool,
  connected: PropTypes.bool,
  connectingText: PropTypes.string,
  closeImage: PropTypes.string,
  profileAvatar: PropTypes.string,
  offlineMode: PropTypes.bool
};

export default Header;
