import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Modal from '../Modal';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import notify from '../../utils/notify';
import { auctionPut } from '../../redux/actions/auctionActions';
import { itemPut } from '../../redux/actions/itemActions';

const ModalEditAuction = ({ isShow, closeModal, auctionId }) => {
  const category = useRef(null);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const {
    register: registerItem,
    handleSubmit: handleSubmitItem,
    reset: resetItem,
  } = useForm();

  const {
    auction: currentAuction,
    loading: loadingCurrentAuction,
    error: errorCurrentAuction,
  } = useSelector((state) => state.auctionGetById);

  const {
    auction: putAuction,
    loading: loadingPutAuction,
    error: errorPutAuction,
  } = useSelector((state) => state.auctionPut);
  useEffect(() => {
    if (!loadingPutAuction && (putAuction !== null || errorPutAuction)) {
      if (putAuction) {
        notify(false, 'Cập nhật bài đấu giá thành công!');
        reset();
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else notify(true, errorPutAuction);
      dispatch({ type: 'AUCTION_PUT_RESET' });
    }
  }, [loadingPutAuction]);
  const {
    item: putItem,
    loading: loadingPutItem,
    error: errorPutItem,
  } = useSelector((state) => state.itemPut);
  useEffect(() => {
    if (!loadingPutItem && (putItem !== null || errorPutItem)) {
      if (putItem) {
        notify(false, 'Cập nhật item thành công!');
        resetItem();
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else notify(true, errorPutItem);
      dispatch({ type: 'ITEM_PUT_RESET' });
    }
  }, [loadingPutItem]);

  const putAuctionHandler = (data) => {
    const payload = {
      description: data.description,
      timeStart: data.timeStart + ':00',
      timeEnd: data.timeEnd + ':00',
      priceStart: data.priceStart,
      priceStep: data.priceStep,
      category: {
        id: category.current,
      },
    };
    if (
      window.confirm('Are you sure to update auction with the details listed!')
    )
      dispatch(auctionPut(auctionId, payload));
  };

  const putItemHandler = (data) => {
    const payload = {
      name: data.itemName,
      description: data.itemDescription,
      amount: data.itemAmount,
    };
    if (window.confirm('Are you sure to update item with the details listed!'))
      dispatch(itemPut(currentAuction.item.id, payload));
  };

  return (
    <Modal
      show={isShow}
      onClose={() => {
        closeModal();
        reset();
        resetItem();
      }}
    >
      <div className='w-full pb-10 h-7/10'>
        {loadingCurrentAuction ? (
          <Loader
            className='mt-3'
            loader={Math.floor(Math.random() * 10 + 1)}
            color={Math.floor(Math.random() * 10 + 1)}
          />
        ) : errorCurrentAuction ? (
          <Alert className='mt-3'>{errorCurrentAuction}</Alert>
        ) : (
          auctionId &&
          currentAuction && (
            <div className='flex'>
              <form
                className='flex flex-col w-1/2 pr-2 bg-gray-700'
                onSubmit={handleSubmit(putAuctionHandler)}
              >
                <div className='text-xl font-bold text-left text-gray-200 lg:text-2xl'>
                  Auction Info
                </div>
                <label className='modalFormLabel'>Auction Description</label>
                <input
                  className='modalFormField'
                  type='text'
                  defaultValue={currentAuction.description ?? null}
                  autoComplete='off'
                  required
                  {...register('description')}
                />

                <div className='flex w-full mt-2'>
                  <div className='flex flex-col w-1/2 pr-2'>
                    <label className='modalFormLabel'>Time Start</label>
                    <input
                      className='modalFormField'
                      type='datetime-local'
                      defaultValue={
                        currentAuction.timeStart
                          ? currentAuction.timeStart.substring(0, 16) ?? null
                          : null
                      }
                      autoComplete='off'
                      required
                      {...register('timeStart')}
                    />
                  </div>

                  <div className='flex flex-col w-1/2 pl-2'>
                    <label className='modalFormLabel'>Time End</label>
                    <input
                      className=' modalFormField'
                      type='datetime-local'
                      defaultValue={
                        currentAuction.timeEnd
                          ? currentAuction.timeStart.substring(0, 16) ?? null
                          : null
                      }
                      autoComplete='off'
                      required
                      {...register('timeEnd')}
                    />
                  </div>
                </div>

                <div className='flex w-full mt-2'>
                  <div className='flex flex-col w-1/2 pr-2'>
                    <label className='modalFormLabel'>Start Price</label>
                    <input
                      className='modalFormField'
                      type='number'
                      defaultValue={currentAuction.priceStart ?? 0}
                      autoComplete='off'
                      required
                      {...register('priceStart')}
                    />
                  </div>

                  <div className='flex flex-col w-1/2 pl-2'>
                    <label className='modalFormLabel'>Price Step</label>
                    <input
                      className='modalFormField'
                      type='number'
                      defaultValue={currentAuction.priceStep ?? 0}
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
                    defaultValue={
                      currentAuction.category
                        ? currentAuction.category.id ?? null
                        : null
                    }
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

                {loadingPutAuction ? (
                  <button
                    className='mt-5 opacity-50 modalFormButton hover:bg-orange-600'
                    disabled
                  >
                    Loading...
                  </button>
                ) : (
                  <button className='mt-5 modalFormButton' type='submit'>
                    Update Auction
                  </button>
                )}
              </form>

              <form
                className='flex flex-col justify-start w-1/2 pl-2 bg-gray-700'
                onSubmit={handleSubmitItem(putItemHandler)}
              >
                <div className='text-xl font-bold text-left text-gray-200 lg:text-2xl'>
                  Auction Item
                </div>

                <label className='modalFormLabel'>Item Name</label>
                <input
                  className='modalFormField'
                  type='text'
                  defaultValue={
                    currentAuction.item ? currentAuction.item.name ?? '' : ''
                  }
                  autoComplete='off'
                  required
                  {...registerItem('itemName')}
                />

                <label className='mt-2 modalFormLabel'>Item Description</label>
                <input
                  className='modalFormField'
                  type='text'
                  defaultValue={
                    currentAuction.item
                      ? currentAuction.item.description ?? ''
                      : ''
                  }
                  autoComplete='off'
                  required
                  {...registerItem('itemDescription')}
                />

                <label className='mt-2 modalFormLabel'>Item Amount</label>
                <input
                  className='modalFormField'
                  type='number'
                  defaultValue={
                    currentAuction.item ? currentAuction.item.amount ?? 0 : 0
                  }
                  autoComplete='off'
                  required
                  {...registerItem('itemAmount')}
                />
                {loadingPutItem ? (
                  <button
                    className='mt-5 opacity-50 modalFormButton hover:bg-orange-600'
                    disabled
                  >
                    Loading...
                  </button>
                ) : (
                  <button className='mt-5 modalFormButton' type='submit'>
                    Update Item
                  </button>
                )}
              </form>
            </div>
          )
        )}
      </div>
    </Modal>
  );
};

export default ModalEditAuction;
