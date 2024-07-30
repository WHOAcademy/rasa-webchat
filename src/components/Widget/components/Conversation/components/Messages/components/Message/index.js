import React, { useContext, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUserMessage, emitUserMessage } from 'actions';

import { PROP_TYPES } from 'constants';
import DocViewer from '../docViewer';
import './styles.scss';
import ThemeContext from '../../../../../../ThemeContext';

const classNameForTextMessage = "rw-message-text";
const classNameForTextMessageReactions = "rw-message-text-reactions";
const classNameForSingleTextMessageReaction = "rw-message-text-single-reaction";
const allowedMessageReactions = ['👍', '👎'];

function MessageReaction({emoji, selectedReaction, setSelectedReaction, wasMessageReactedTo, setWasMessageReactedTo, sendReaction }) {
  return (
    <div
      className={
        classNameForSingleTextMessageReaction
        + (emoji === selectedReaction ? ' sent' : '')
        + (wasMessageReactedTo ? ' reacted' : '')
      }
      onClick={
        (e) => {
          e.stopPropagation();

          const payload = `/must_orchestrate{"reaction":"${emoji}"}`;
          const title = emoji;
          sendReaction(payload, title);

          setSelectedReaction(emoji);
          setWasMessageReactedTo(true);
        }
      }
      onMouseUp={e => e.stopPropagation()}
    >
      {emoji}
    </div>
  );
}

function Message(props) {
  const { docViewer, linkTarget, sendReaction } = props;
  const sender = props.message.get('sender');
  // NOTE: `sender === 'response'` means message by the chatbot,
  // while `sender === 'client'` means message by the user
  const text = props.message.get('text');
  const customCss = props.message.get('customCss') && props.message.get('customCss').toJS();

  if (customCss && customCss.style === 'class') {
    customCss.css = customCss.css.replace(/^\./, '');
  }

  const { userTextColor, userBackgroundColor, assistTextColor, assistBackgoundColor } = useContext(ThemeContext);
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

  const [selectedReaction, setSelectedReaction] = useState('');
  const [wasMessageReactedTo, setWasMessageReactedTo] = useState(false);

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
            className={classNameForTextMessageReactions + (wasMessageReactedTo ? ' reacted' : '')}
          >
            {allowedMessageReactions.map((reaction, reactionIndex) => (
              <MessageReaction
                key={reactionIndex}
                emoji={reaction}
                selectedReaction={selectedReaction}
                setSelectedReaction={setSelectedReaction}
                sendReaction={sendReaction}
                wasMessageReactedTo={wasMessageReactedTo}
                setWasMessageReactedTo={setWasMessageReactedTo}
              ></MessageReaction>
            ))}
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


Message.contextType = ThemeContext;
Message.propTypes = {
  message: PROP_TYPES.MESSAGE,
  docViewer: PropTypes.bool,
  linkTarget: PropTypes.string,
  sendReaction: PropTypes.func
};

Message.defaultTypes = {
  docViewer: false,
  linkTarget: '_blank'
};

const mapStateToProps = state => ({
  linkTarget: state.metadata.get('linkTarget'),
  docViewer: state.behavior.get('docViewer')
});

const mapDispatchToProps = dispatch => ({
  sendReaction: (payload, title) => {
    dispatch(addUserMessage(title, false, true));
    dispatch(emitUserMessage(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
