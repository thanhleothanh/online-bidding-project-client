import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  reportAdminJudge,
  reportAdminGetAll,
  reportAdminDelete,
} from '../redux/actions/reportActions';
import Header from '../components/Header';
import Alert from '../components/Alert';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ReportResultChooser from '../components/AdminReportScreen/ReportResultChooser';
import PagingButtons from '../components/PagingButtons';
import ReportDetailInfo from '../components/AdminReportScreen/ReportDetailInfo';
import ReportUsersInfo from '../components/AdminReportScreen/ReportUsersInfo';
import ReactTooltip from 'react-tooltip';
import notify from '../utils/notify';

const AdminReportScreen = ({ history }) => {
  const dispatch = useDispatch();
  const currentAuctionId = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [choosenResult, setChoosenResult] = useState(undefined);
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    reports: allReports,
    page: pageAllReports,
    pageTotal: pageTotalAllReports,
    loading: loadingAllReports,
    error: errorAllReports,
  } = useSelector((state) => state.reportAdminGetAll);

  const {
    success: deletedReport,
    loading: loadingDeleteReport,
    error: errorDeleteReport,
  } = useSelector((state) => state.reportAdminDelete);
  useEffect(() => {
    if (!loadingDeleteReport && (deletedReport || errorDeleteReport)) {
      if (deletedReport) {
        notify(false, 'Xoá phiếu báo cáo thành công!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else notify(true, errorDeleteReport);
      dispatch({ type: 'REPORT_ADMIN_DELETE_RESET' });
    }
  }, [loadingDeleteReport]);

  const {
    result: judgedReport,
    loading: loadingJudgeReport,
    error: errorJudgeReport,
  } = useSelector((state) => state.reportAdminJudge);
  useEffect(() => {
    if (!loadingJudgeReport && (judgedReport !== null || errorJudgeReport)) {
      if (judgedReport) {
        notify(false, 'Duyệt phiếu báo cáo thành công!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else notify(true, errorJudgeReport);
      dispatch({ type: 'REPORT_ADMIN_JUDGE_RESET' });
    }
  }, [loadingJudgeReport]);

  useEffect(() => {
    if (!userInfo) history.push('/login');
    if (userInfo && userInfo.role !== 'ADMIN') history.push('/login');
  }, [userInfo]);

  useEffect(() => {
    dispatch(reportAdminGetAll(currentPage, choosenResult));
  }, [currentPage, choosenResult]);

  const approveButtonClickedHandler = (reportId) => {
    currentAuctionId.current = reportId;
    if (window.confirm('Are you sure to appove this report ticket?'))
      dispatch(reportAdminJudge(reportId, { result: 'ACCEPTED' }));
  };

  const rejectButtonClickedHandler = (reportId) => {
    currentAuctionId.current = reportId;
    if (window.confirm('Are you sure to reject this report ticket?'))
      dispatch(reportAdminJudge(reportId, { result: 'REJECTED' }));
  };

  const deleteButtonClickedHandler = (reportId) => {
    currentAuctionId.current = reportId;
    if (window.confirm('Are you sure to delete this report ticket?'))
      dispatch(reportAdminDelete(reportId));
  };

  return (
    <>
      <div className='relative flex flex-col w-full h-auto min-h-screen p-5 space-y-5 animate-fadeIn'>
        <div className='flex w-full'>
          <div className='w-full h-full xl:w-2/3'>
            <div className='flex invisible xl:visible'>
              <input
                type='search'
                id='search'
                name='search'
                placeholder='Search...'
                className='font-bold rounded-md inputField'
              />
            </div>
          </div>
          <div className='w-full xl:w-1/3'>
            <div className='absolute top-0 right-0 flex justify-end p-5 xl:static xl:p-0'>
              <Header />
            </div>
          </div>
        </div>
        <div className='w-full my-5'>
          {/* buttons section */}
          <div className='flex justify-between'>
            <ReportResultChooser
              choosenResult={choosenResult}
              setChoosenResult={setChoosenResult}
            />
          </div>
          <div className='my-3'>
            {currentPage != null && allReports && allReports.length !== 0 && (
              <PagingButtons
                setCurrentPage={setCurrentPage}
                page={pageAllReports}
                pageTotal={pageTotalAllReports}
              />
            )}
          </div>
          {/* reports table section */}
          {userInfo && loadingAllReports ? (
            <Loader
              className='mt-3'
              loader={Math.floor(Math.random() * 10 + 1)}
              color={Math.floor(Math.random() * 10 + 1)}
            />
          ) : errorAllReports ? (
            <Alert className='mt-3'>{errorAllReports}</Alert>
          ) : (
            <>
              <tr className='sticky top-0 flex w-full text-gray-100 bg-orange-600 rounded-t-md'>
                <th className='w-1/12 py-7'>ID</th>
                <th className='w-10/12 py-7'>Report Info</th>
                <th className='w-1/12 py-7'></th>
              </tr>
              <div className='w-full overflow-hidden rounded-md'>
                <table className='w-full overflow-x-auto table-fixed '>
                  <thead>
                    <tr>
                      <th className='w-1/12'></th>
                      <th className='w-10/12'></th>
                      <th className='w-1/12'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allReports &&
                      allReports.length !== 0 &&
                      allReports.map((report) => {
                        return (
                          <tr className='text-center text-gray-200 bg-gray-700 border-orange-500 border-y-2'>
                            <td className='py-10'>{report.id}</td>
                            <td className='flex flex-col py-10 lg:px-5'>
                              <ReportUsersInfo report={report} />
                              <br />
                              <ReportDetailInfo report={report} />
                            </td>
                            <td className='py-10 space-x-1'>
                              {report.reportResult === null && (
                                <>
                                  <button data-for='approve' data-tip='Approve'>
                                    <i
                                      onClick={() =>
                                        approveButtonClickedHandler(report.id)
                                      }
                                      className='fas fa-thumbs-up fa-lg hover:text-orange-500'
                                    />
                                  </button>

                                  <button data-for='reject' data-tip='Reject'>
                                    <i
                                      onClick={() =>
                                        rejectButtonClickedHandler(report.id)
                                      }
                                      className='fas fa-thumbs-down fa-lg hover:text-orange-500'
                                    />
                                  </button>

                                  <button data-for='delete' data-tip='Delete'>
                                    <i
                                      onClick={() =>
                                        deleteButtonClickedHandler(report.id)
                                      }
                                      className='fas fa-trash fa-lg hover:text-orange-500'
                                    />
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <ReactTooltip id='reject' place='top' effect='float' />
              <ReactTooltip id='approve' place='top' effect='float' />
              <ReactTooltip id='delete' place='top' effect='float' />
            </>
          )}
          {allReports && allReports.length === 0 && (
            <Message type='info' className='w-full '>
              No report found!
            </Message>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminReportScreen;
