const ToPrice = (price) => {
  return price.toLocaleString('vi', {
    style: 'currency',
    currency: 'VND',
  });
};

export default ToPrice;
