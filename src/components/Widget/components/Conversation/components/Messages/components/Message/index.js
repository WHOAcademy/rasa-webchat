import React, { PureComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PROP_TYPES } from 'constants';
import DocViewer from '../docViewer';
import './styles.scss';
import ThemeContext from '../../../../../../ThemeContext';

class Message extends PureComponent {
  render() {
    const { docViewer, linkTarget } = this.props;
    const sender = this.props.message.get('sender');
    // NOTE: `sender === 'response'` means message by the chatbot,
    // while `sender === 'client'` means message by the user
    const text = this.props.message.get('text');
    const customCss = this.props.message.get('customCss') && this.props.message.get('customCss').toJS();

    if (customCss && customCss.style === 'class') {
      customCss.css = customCss.css.replace(/^\./, '');
    }

    const { userTextColor, userBackgroundColor, assistTextColor, assistBackgoundColor } = this.context;
    let style;
    if (sender === 'response' && customCss && customCss.style === 'class') {
      style = undefined;
    } else if (sender === 'response' && customCss && customCss.style) {
      style = { cssText: customCss.css };
    } else if (sender === 'response') {
      style = { color: assistTextColor, backgroundColor: assistBackgoundColor };
    } else if (sender === 'client') {
      style = { color: userTextColor, backgroundColor: userBackgroundColor };
    }

    const classNameForTextMessage = "rw-message-text";
    const classNameForTextMessageReactions = "rw-message-text-reactions";

    return (
      <div
        className={sender === 'response' && customCss && customCss.style === 'class' ?
          `rw-response ${customCss.css}` :
          `rw-${sender}`}
        style={style}
      >
        {sender === 'response' ? (
          <>
            <div
              className={classNameForTextMessage}
            >
              <ReactMarkdown
                className={'rw-markdown'}
                source={text}
                linkTarget={(url) => {
                  if (!url.startsWith('mailto') && !url.startsWith('javascript')) return '_blank';
                  return undefined;
                }}
                transformLinkUri={null}
                renderers={{
                  link: props =>
                    docViewer ? (
                      <DocViewer src={props.href}>{props.children}</DocViewer>
                    ) : (
                      <a href={props.href} target={linkTarget || '_blank'} rel="noopener noreferrer" onMouseUp={e => e.stopPropagation()}>{props.children}</a>
                    )
                }}
              />
            </div>
            <div
              className={classNameForTextMessageReactions}
            >
              <div>
                <p>👍</p>
              </div>
              <div>
                <p>👍</p>
              </div>
            </div>
          </>
        ) : (
          <div
            className={classNameForTextMessage}
          >
            {text}
          </div>
        )}
      </div>
    );
  }
}


Message.contextType = ThemeContext;
Message.propTypes = {
  message: PROP_TYPES.MESSAGE,
  docViewer: PropTypes.bool,
  linkTarget: PropTypes.string
};

Message.defaultTypes = {
  docViewer: false,
  linkTarget: '_blank'
};

const mapStateToProps = state => ({
  linkTarget: state.metadata.get('linkTarget'),
  docViewer: state.behavior.get('docViewer')
});

export default connect(mapStateToProps)(Message);
