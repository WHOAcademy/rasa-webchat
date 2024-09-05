
/* ---------------------------------------------------------------------
NOTE: this adaptation is the only way to associate user messages to the
desired user ID on the server-side database of conversations, since
there are limitations on what can be customized on the server side of
Rasa and, if changing its sender ID from the session ID in the input
channel, the output channel incorrectly returns any message wrongly
using the sender ID in place of the session ID; indeed:
- this (i.e. server-side code that specifies the recepient ID to any
  output channel) cannot be customized:
  https://github.com/RasaHQ/rasa/blob/6339856514897056716bb531acb8489c9cf05d26/rasa/core/processor.py#L811
- and a session ID cannot explicitly be set on the client side, being
  a design decision of Rasa Webchat:
  https://github.com/botfront/rasa-webchat/issues/233#issuecomment-668213188-permalink
- and there is someone suggesting a solution similar to ours:
  https://github.com/botfront/rasa-webchat/issues/166#issuecomment-984888543-permalink
--------------------------------------------------------------------- */

const localStorageKeyForRasa = 'chat_session';
const timeInMsToHideReceivedMessageDuringTypingIndicator = 1000;

const aiTutorEnabled = (document.getElementById('inside-vle').value === 'yes');
const aiTutorCourseId = (aiTutorEnabled? document.getElementById('course-id').value : null);
const keycloakToken = document.getElementById('user-keycloak-token').value;
const lxpUserId = document.getElementById('user-id').value;  // NOTE: required to be unique
const lxpUserName = document.getElementById('user-name').value;
const lxpLanguage = document.getElementById('platform-language').value;
const rasaHostUrl = document.getElementById('rasa-host-url').value;

if (aiTutorEnabled) {
  document.documentElement.style.setProperty("--chatbot-gradient-color", "linear-gradient(135deg, #eb54ff, #00ffe9)");
} else {
  document.getElementById("course-background").style.visibility = "hidden";
  document.body.style.backgroundImage = "url()";
}

// smart way to let the Rasa Webchat client-side implementation
// start by already adapting a predefined, desired session ID that
// is imposed to the server directly on socket.io connection request and
// that automatically becomes the user ID internally used by Rasa:
window.localStorage.setItem(
  localStorageKeyForRasa,
  JSON.stringify(
    {
      "params": {
        "isChatOpen": false,
        "isChatVisible": true,
      },
      "version": "1.0.2"
    }
  )
)

const load = () => {
  if (!WebChat) setTimeout(load, 100);
  if (WebChat) WebChat.default(
    {
      socketUrl: rasaHostUrl,
      getCurrentJwt: () => { return keycloakToken; },
      initPayload: '/must_orchestrate',
      customData: {
        aiTutorCourseId: aiTutorCourseId,
        userName: lxpUserName,
        languageCode: lxpLanguage
      },
      customMessageDelay: function(){ return 0; },
      showCloseButton: true,
      title: aiTutorEnabled? "AI Tutor" : "Cognity",
      subtitle: aiTutorEnabled? "Course-Specific Chatbot" : "General-Purpose Chatbot",
      inputTextFieldHint: aiTutorEnabled ? "You can make a new request." : "Type your message here...",
      displayTypingIndication: true,
      customMessageDelay: message => timeInMsToHideReceivedMessageDuringTypingIndicator,
      profileAvatar: 'https://whoalxppublicstorage.blob.core.windows.net/machine-learning/chatbot-icon-0-0-0.svg',
      openLauncherImage: 'https://whoalxppublicstorage.blob.core.windows.net/machine-learning/chatbot-icon-0-0-0.svg',
      showMessageDate: true,
      onSocketEvent: {
        connect: () => {
          console.log('connected ✓');
          window.localStorage.setItem(
            localStorageKeyForRasa,
            JSON.stringify(
              {
                "session_id": lxpUserId
              }
            )
          )
        }
      },
    },
    null
  );
}
setTimeout(load, 200);
