import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { API_URL } from './config';

var stompClient = null;
export const connect = (auctionId, auctionBids, setAuctionBids) => {
  const socket = new SockJS(`${API_URL}/ws`);
  stompClient = Stomp.over(socket);
  stompClient.connect({}, () => {
    stompClient.subscribe(`/topic/auctions/${auctionId}/bids`, (payload) => {
      const message = JSON.parse(payload.body);
      console.log(message.data);
      console.log(auctionBids);
      setAuctionBids((auctionBids) => [{ ...message.data }, ...auctionBids]);
    });
  });
};

export const disconnect = () => {
  if (stompClient !== null) stompClient.disconnect();
  console.log('disconnected');
};
