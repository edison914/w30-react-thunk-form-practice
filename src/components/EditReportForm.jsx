import { useParams } from 'react-router-dom';
import ReportForm from './ReportForm';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { loadSingleReportTrunk } from '../store/reports';

const EditReportForm = () => {
  //use dispatch
  const dispatch = useDispatch();

  const { reportId } = useParams();
  //const report = {}; // populate from Redux store
    //code added
  useEffect (() => {
      dispatch(loadSingleReportTrunk(reportId))
  },[dispatch, reportId])

  const report  = useSelector((state) => state.reports[reportId])
  //console.log(report)
  if (!report) return(<></>);

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    Object.keys(report).length > 1 && (
      <>
        <ReportForm
          report={report}
          formType="Update Report"
        />
      </>
    )
  );
};

export default EditReportForm;
