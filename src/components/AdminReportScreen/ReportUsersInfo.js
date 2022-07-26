import React from 'react';
import { Link } from 'react-router-dom';

const ReportUsersInfo = ({ report }) => {
  return (
    <div className='flex flex-col w-full space-y-2'>
      <div className='w-full'>
        <div className='text-xl font-semibold text-left'>Reporter:</div>
        <div className='flex justify-between'>
          <div className='font-semibold text-left'>Username:</div>
          <div className='text-right'>
            <Link to={`/profiles/${report.userReporter.profile.id}`}>
              <span className='underline'>
                {report.userReporter
                  ? report.userReporter.profile.username ?? 'n/a'
                  : 'No reporter info found!'}
              </span>
            </Link>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='font-semibold text-left'>Name:</div>
          <div className='text-right'>
            {report.userReporter
              ? report.userReporter.profile.name ?? 'n/a'
              : 'No reporter info found!'}
          </div>
        </div>
        <div className='mt-5 text-xl font-semibold text-left'>
          Reported User:
        </div>
        <div className='flex justify-between'>
          <div className='font-semibold text-left'>Username:</div>
          <div className='text-right'>
            <Link to={`/profiles/${report.userReported.profile.id}`}>
              <span className='underline'>
                {report.userReported
                  ? report.userReported.profile.username ?? 'n/a'
                  : 'No reported user info found!'}
              </span>
            </Link>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='font-semibold text-left'>Name:</div>
          <div className='text-right'>
            {report.userReported
              ? report.userReported.profile.name ?? 'n/a'
              : 'No reported user info found!'}
          </div>
        </div>
      </div>
      {report && report.reportResult && (
        <div className='flex justify-between'>
          <div className='font-semibold text-left text-orange-500'>
            Report Result:
          </div>
          <div className='font-semibold text-left text-orange-500'>
            {report.reportResult.result}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportUsersInfo;
