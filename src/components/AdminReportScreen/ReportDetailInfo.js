import React from 'react';

const ReportDetailInfo = ({ report }) => {
  return (
    <div className='flex flex-col w-full space-y-2'>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Description:</div>
        <div className='text-right'>
          {report.description ?? 'No description added!'}
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Created At:</div>
        {report.createdAt ?? null}
      </div>
      <div className='flex flex-col'>
        <div className='font-semibold text-left'>Report Images:</div>
        <div className='flex space-x-3 overflow-x-auto '>
          {report &&
            report.reportImages &&
            report.reportImages.length !== 0 &&
            report.reportImages.map((reportImage) => {
              return (
                <>
                  <img
                    src={reportImage.imageUrl}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = '/images/auction_img.jpg';
                    }}
                    className='object-cover rounded-md w-72 h-72'
                  />
                </>
              );
            })}
          {report &&
            report.reportImages &&
            report.reportImages.length === 0 &&
            'No report images added!'}
        </div>
      </div>
    </div>
  );
};

export default ReportDetailInfo;
