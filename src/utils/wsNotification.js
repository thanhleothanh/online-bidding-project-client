import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { API_URL } from './config';
import notifyNotification from '../utils/notifyNotification';

var stompClient = null;
export const connect = (username, getNewNotifications) => {
  const socket = new SockJS(`${API_URL}/ws`);
  stompClient = Stomp.over(socket);
  stompClient.connect({ username }, () => {
    stompClient.subscribe(`/user/queue/notifications`, (payload) => {
      const notifying = JSON.parse(payload.body);
      console.log(notifying);
      if (notifying) {
        notifyNotification();
      }
      getNewNotifications();
    });
  });
};

export const disconnect = () => {
  if (stompClient !== null) stompClient.disconnect();
  console.log('disconnected');
};
