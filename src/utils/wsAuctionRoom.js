import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

var stompClient = null;
export const connect = (auctionId, auctionBids, setAuctionBids) => {
  const socket = new SockJS('http://localhost:8080/ws');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, (frame) => {
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
