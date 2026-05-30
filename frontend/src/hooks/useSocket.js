import { useEffect, useCallback } from 'react';
import { useSocket } from '../contexts/SocketContext';

const useSocketEvent = (eventName, handler) => {
  const { socket } = useSocket();

  const stableHandler = useCallback(handler, [handler]);

  useEffect(() => {
    if (!socket) return;
    socket.on(eventName, stableHandler);
    return () => socket.off(eventName, stableHandler);
  }, [socket, eventName, stableHandler]);
};

export default useSocketEvent;
