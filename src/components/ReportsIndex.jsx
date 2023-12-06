import { Link } from 'react-router-dom';
import ReportIndexItem from './ReportIndexItem';
import { resetDatabase } from '../mocks/storage';
import { useDispatch, useSelector} from 'react-redux'
import { loadReportsThunk } from '../store/reports';
import { useEffect } from 'react';

const ReportsIndex = () => {
  //const reports = []; // populate from Redux store

  const dispatch = useDispatch();

  const reports = useSelector((state) => Object.values(state.reports));
  //console.log(reports)

  useEffect (() => {
    dispatch(loadReportsThunk());
  }, [dispatch]);

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <section>
      <ul>
        {reports.map((report) => (
          <ReportIndexItem
            report={report}
            key={report.id}
          />
        ))}
      </ul>
      <Link
        className="back-button new"
        to="/reports/new"
      >
        New Report
      </Link>
      <button onClick={resetDatabase}>Reset the Database</button>
    </section>
  );
};

export default ReportsIndex;
