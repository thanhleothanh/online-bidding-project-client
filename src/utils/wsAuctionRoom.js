import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { API_URL } from './config';

var stompClient = null;
export const connect = (username, auctionId, auctionBids, setAuctionBids) => {
  const socket = new SockJS(`${API_URL}/ws`);
  stompClient = Stomp.over(socket);
  stompClient.connect({ username }, () => {
    stompClient.subscribe(`/topic/auctions/${auctionId}/bids`, (payload) => {
      const newBid = JSON.parse(payload.body);
      // console.log(newBid);
      // console.log(auctionBids);
      setAuctionBids((auctionBids) => [{ ...newBid }, ...auctionBids]);
    });
  });
};

export const disconnect = () => {
  if (stompClient !== null) stompClient.disconnect();
  console.log('disconnected');
};
