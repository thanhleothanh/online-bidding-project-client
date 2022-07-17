import ReactDOM from 'react-dom';

export default function Modal({ show, onClose, title, children }) {
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };
  const modalContent = show ? (
    <div className='fixed top-0 z-20 flex items-center justify-center w-full h-full overflow-hidden bg-black bg-opacity-40 '>
      <div className='flex flex-col justify-between w-11/12 bg-gray-700 border-2 border-orange-600 rounded-md lg:w-8/12 overflow-y-scoll scollbar-thin max-h-7/10'>
        <div className='flex justify-between px-3 py-2 bg-gray-700 rounded-md'>
          <div className='font-semibold xl:text-lg'>{title && title}</div>
          <button onClick={handleClose}>
            <i className='text-gray-200 fas fa-times fa-lg' />
          </button>
        </div>
        <div className='px-3 overflow-auto lg:px-7'>{children}</div>
      </div>
    </div>
  ) : null;

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root')
  );
}
