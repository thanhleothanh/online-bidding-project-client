import { toast } from 'react-toastify';

export default (isError, message = 'Thao tác đã được ghi nhận!') => {
  if (!isError)
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  else
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
};
