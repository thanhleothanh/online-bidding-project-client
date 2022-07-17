import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';
import notify from '../../utils/notify';
import { auctionPost } from '../../redux/actions/auctionActions';

const ModalPostAuction = ({ isShow, closeModal }) => {
  const category = useRef(null);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const {
    auction: postAuction,
    loading: loadingPostAuction,
    error: errorPostAuction,
  } = useSelector((state) => state.auctionPost);
  useEffect(() => {
    if (!loadingPostAuction && (postAuction !== null || errorPostAuction)) {
      if (postAuction) {
        notify(false, 'Tạo bài đấu giá thành công!');
        reset();
      } else notify(true, errorPostAuction);
      dispatch({ type: 'AUCTION_POST_RESET' });
    }
  }, [loadingPostAuction]);

  const postNewTestHandler = (data) => {
    const payload = {
      description: data.description,
      timeStart: data.timeStart + ':00',
      timeEnd: data.timeEnd + ':00',
      priceStart: data.priceStart,
      priceStep: data.priceStep,
      category: {
        id: category.current,
      },
      item: {
        name: data.itemName,
        description: data.itemDescription,
        amount: data.itemAmount,
      },
    };
    if (
      window.confirm('Are you sure to post an auction with the details listed!')
    )
      dispatch(auctionPost(payload));
  };

  return (
    <Modal show={isShow} onClose={closeModal}>
      <div className='w-full pb-10 h-7/10'>
        <div className='text-xl font-bold text-left text-gray-200 lg:text-2xl'>
          Auction Info
        </div>
        <form
          className='flex flex-col w-full bg-gray-700'
          onSubmit={handleSubmit(postNewTestHandler)}
        >
          <label className='modalFormLabel'>Auction Description</label>
          <input
            className='modalFormField'
            type='text'
            autoComplete='off'
            required
            {...register('description')}
          />

          <div className='flex w-full mt-2 space-x-5'>
            <div className='flex flex-col w-1/2'>
              <label className='modalFormLabel'>Time Start</label>
              <input
                className='modalFormField'
                type='datetime-local'
                autoComplete='off'
                required
                {...register('timeStart')}
              />
            </div>

            <div className='flex flex-col w-1/2'>
              <label className='modalFormLabel'>Time End</label>
              <input
                className=' modalFormField'
                type='datetime-local'
                autoComplete='off'
                required
                {...register('timeEnd')}
              />
            </div>
          </div>

          <div className='flex w-full mt-2 space-x-5'>
            <div className='flex flex-col w-1/2'>
              <label className='modalFormLabel'>Start Price</label>
              <input
                className='modalFormField'
                type='number'
                autoComplete='off'
                required
                {...register('priceStart')}
              />
            </div>

            <div className='flex flex-col w-1/2'>
              <label className='modalFormLabel'>Price Step</label>
              <input
                className='modalFormField'
                type='number'
                autoComplete='off'
                required
                {...register('priceStep')}
              />
            </div>
          </div>

          <div className='mt-2'>
            <label className='modalFormLabel'>Category</label>
            <select
              className='modalFormField form-select'
              onChange={(e) => (category.current = e.target.value)}
              required
            >
              <option value={null}>Choose a category...</option>
              <option value={1}>Đồ điện tử</option>
              <option value={2}>Thời trang</option>
              <option value={3}>Đồ nội thất</option>
              <option value={4}>Giải trí</option>
              <option value={5}>Nhà cửa</option>
              <option value={6}>Sức khoẻ</option>
              <option value={7}>Thú cưng</option>
              <option value={8}>Nghệ thuật</option>
              <option value={9}>Trang sức</option>
              <option value={10}>Thực phẩm</option>
              <option value={11}>Khoa học</option>
            </select>
          </div>

          <div className='mt-5 text-xl font-bold text-left text-gray-200 lg:text-2xl'>
            Auction Item
          </div>

          <label className='modalFormLabel'>Item Name</label>
          <input
            className='modalFormField'
            type='text'
            autoComplete='off'
            required
            {...register('itemName')}
          />

          <label className='mt-2 modalFormLabel'>Item Description</label>
          <input
            className='modalFormField'
            type='text'
            autoComplete='off'
            required
            {...register('itemDescription')}
          />

          <label className='mt-2 modalFormLabel'>Item Amount</label>
          <input
            className='modalFormField'
            type='number'
            autoComplete='off'
            required
            {...register('itemAmount')}
          />

          <button className='mt-5 modalFormButton' type='submit'>
            Post Auction
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalPostAuction;
