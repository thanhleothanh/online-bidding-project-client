import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';
import notify from '../../utils/notify';
import { reportPost } from '../../redux/actions/reportActions';
import Loader from '../../components/Loader';
import { itemUploadImage } from '../../redux/actions/itemActions';
import Alert from '../Alert';

const ModalPostReport = ({ isShow, closeModal, userId }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [reportImages, setReportImages] = useState([]);
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    profile: getProfileById,
    loading: loadingGetProfileById,
    error: errorGetProfileById,
  } = useSelector((state) => state.profileGetById);

  const {
    report: postReport,
    loading: loadingPostReport,
    error: errorPostReport,
  } = useSelector((state) => state.reportPost);
  useEffect(() => {
    if (
      isShow &&
      !loadingPostReport &&
      (postReport !== null || errorPostReport)
    ) {
      if (postReport) {
        notify(false, 'Tạo phiếu báo cáo thành công!');
        closeModal();
        reset();
        setReportImages([]);
      } else notify(true, errorPostReport);
      dispatch({ type: 'REPORT_POST_RESET' });
    }
  }, [loadingPostReport]);

  const {
    image: reportImage,
    loading: loadingImageUpload,
    error: errorImageUpload,
  } = useSelector((state) => state.itemUploadImage);
  useEffect(() => {
    if (
      isShow &&
      !loadingImageUpload &&
      (reportImage !== null || errorImageUpload)
    ) {
      if (reportImage) {
        notify(false, 'Upload image thành công!');
        setReportImages((reportImages) => [
          { imageUrl: reportImage.secure_url, publicId: reportImage.public_id },
          ...reportImages,
        ]);
      } else notify(true, errorImageUpload);
      dispatch({ type: 'ITEM_UPLOAD_IMAGE_RESET' });
    }
  }, [loadingImageUpload, isShow]);

  const postReportHandler = (data) => {
    const payload = {
      description: data.description,
      userReporter: {
        id: userInfo.id,
      },
      userReported: {
        id: userId,
      },
      reportImages: [...reportImages],
    };
    if (
      window.confirm('Are you sure to post an auction with the details listed!')
    )
      dispatch(reportPost(payload));
  };

  const uploadImage = async (e) => {
    dispatch(itemUploadImage(e.target.files));
  };

  return (
    <Modal show={isShow} onClose={closeModal}>
      {loadingGetProfileById ? (
        <Loader
          className={'py-3'}
          loader={Math.floor(Math.random() * 10 + 1)}
          color={Math.floor(Math.random() * 10 + 1)}
        />
      ) : errorGetProfileById ? (
        <Alert className={'mt-3'}>{errorGetProfileById}</Alert>
      ) : (
        getProfileById && (
          <div className='w-full pb-10 h-7/10'>
            <div className='flex flex-col xl:flex-row'>
              <div className='flex flex-col w-full bg-gray-700 xl:pr-2 xl:w-1/2'>
                <div className='text-xl font-bold text-left text-gray-200 lg:text-2xl'>
                  This person's info
                </div>
                <label className='modalFormLabel'>Username</label>
                <input
                  className='modalFormField'
                  type='text'
                  readOnly
                  value={getProfileById.username}
                />

                <label className='mt-2 modalFormLabel'>Name</label>
                <input
                  className='modalFormField'
                  type='text'
                  readOnly
                  value={getProfileById.name}
                />
              </div>

              <form
                className='flex flex-col w-full bg-gray-700 xl:pl-2 xl:w-1/2'
                onSubmit={handleSubmit(postReportHandler)}
              >
                <div className='mt-5 text-xl font-bold text-left text-gray-200 xl:mt-0 lg:text-2xl'>
                  Report Info
                </div>

                <label className='modalFormLabel'>Description</label>
                <textarea
                  className='modalFormField '
                  rows={5}
                  type='text'
                  autoComplete='off'
                  required
                  {...register('description')}
                />

                <label className='mt-2 modalFormLabel'>
                  Report Images (Tối đa 5 ảnh)
                </label>
                {loadingImageUpload || reportImages.length >= 5 ? (
                  <input
                    className='modalFormField'
                    disabled
                    type='file'
                    autoComplete='off'
                    onChange={uploadImage}
                  />
                ) : (
                  <input
                    className='modalFormField'
                    type='file'
                    autoComplete='off'
                    onChange={uploadImage}
                  />
                )}

                {loadingImageUpload ? (
                  <Loader
                    className={'py-3'}
                    loader={Math.floor(Math.random() * 10 + 1)}
                    color={Math.floor(Math.random() * 10 + 1)}
                  />
                ) : (
                  <div className='flex mt-2 space-x-3 overflow-x-auto text-gray-200 scrollbar-thin'>
                    {reportImages &&
                      reportImages.length !== 0 &&
                      reportImages.map((itemImage) => {
                        return (
                          <>
                            <img
                              src={itemImage.imageUrl}
                              className='object-cover rounded-md w-44 h-44'
                            />
                          </>
                        );
                      })}
                    {reportImages &&
                      reportImages.length === 0 &&
                      'No report images added!'}
                  </div>
                )}

                {loadingPostReport ? (
                  <button
                    className='mt-5 opacity-50 modalFormButton hover:bg-orange-600'
                    disabled
                  >
                    Loading...
                  </button>
                ) : (
                  <button className='mt-5 modalFormButton' type='submit'>
                    Post Report
                  </button>
                )}
              </form>
            </div>
          </div>
        )
      )}
    </Modal>
  );
};

export default ModalPostReport;
