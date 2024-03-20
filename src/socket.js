import socketio from './socket-socketio';
import sockjs from './socket-sockjs';

const PROTOCOLS = { socketio, sockjs };
export default function (socketUrl, customData, path, protocol, protocolOptions, getCurrentJwt) {
  protocol = protocol || 'socketio';
  const socketProtocol = PROTOCOLS[protocol];

  if (socketProtocol !== undefined) {
    return socketProtocol(socketUrl, customData, path, protocolOptions, getCurrentJwt);
  }
  throw new Error(`Undefined socket protocol ${protocol}`);
}
