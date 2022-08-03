import toPrice from './toPrice';

const generateSubmitAuctionNotification = (notification) => {
  return `Someone has recently submitted a new auction, auction #${notification.notificationAuction.auction.id}`;
};

const generateReviewAuctionNotification = (notification) => {
  return `An admin has recently reviewed your auction #${notification.notificationAuction.auction.id}`;
};

const generateStartAuctionNotification = (notification) => {
  return `Your auction #${notification.notificationAuction.auction.id} has started`;
};

const generateNewBidNotification = (notification) => {
  if (notification.notificationAuction.auction.highestPrice === 0) {
    return `Your auction #${notification.notificationAuction.auction.id} has no bid yet, waiting for someone to raise the price`;
  } else
    return `Someone raise the price for auction #${
      notification.notificationAuction.auction.id
    }. Current highest price: ${toPrice(
      notification.notificationAuction.auction.highestPrice
    )}`;
};

const generateEndAuctionNotification = (notification) => {
  if (notification.notificationAuction.auction.status === 'CANCELED') {
    return `Your auction #${notification.notificationAuction.auction.id} has ended, no one attended your auction :(`;
  } else
    return `Auction #${
      notification.notificationAuction.auction.id
    } has ended. Final price: ${toPrice(
      notification.notificationAuction.auction.highestPrice
    )}`;
};

const generateCreateReportNotification = (notification) => {
  return `Someone posted a new report ticket, report ticket #${notification.notificationReport.report.id}`;
};

const generateJudgeReportNotification = (notification) => {
  return `An admin has recently judged your report ticket #${notification.notificationReport.report.id}`;
};

const generateNotification = (notification) => {
  switch (notification.notificationType) {
    case 'SUBMIT_AUCTION':
      return generateSubmitAuctionNotification(notification);
    case 'REVIEW_AUCTION':
      return generateReviewAuctionNotification(notification);
    case 'START_AUCTION':
      return generateStartAuctionNotification(notification);
    case 'NEW_BID_AUCTION':
      return generateNewBidNotification(notification);
    case 'END_AUCTION':
      return generateEndAuctionNotification(notification);
    case 'CREATE_REPORT':
      return generateCreateReportNotification(notification);
    case 'JUDGE_REPORT':
      return generateJudgeReportNotification(notification);
  }
};

export default generateNotification;
