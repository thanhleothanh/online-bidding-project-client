import { toast } from 'react-toastify';

export default (message = 'Bạn có thông báo mới!') => {
  toast.info(message, {
    position: 'bottom-left',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};
