/** Action Type Constants: */
export const LOAD_REPORTS = 'reports/LOAD_REPORTS';
export const RECEIVE_REPORT = 'reports/RECEIVE_REPORT';
export const UPDATE_REPORT = 'reports/UPDATE_REPORT';
export const REMOVE_REPORT = 'reports/REMOVE_REPORT';

/**  Action Creators: */
export const loadReports = (reports) => ({
  type: LOAD_REPORTS,
  reports
});

export const receiveReport = (report) => ({
  type: RECEIVE_REPORT,
  report
});

export const editReport = (report) => ({
  type: UPDATE_REPORT,
  report
});

export const removeReport = (reportId) => ({
  type: REMOVE_REPORT,
  reportId
});

/** Thunk Action Creators: */

// Your code here
export const loadReportsThunk = () => async (dispatch) => {
  const response = await fetch ('/api/reports');
  //console.log(res.json())
  if (response.ok) {
    const data = await response.json();
    dispatch(loadReports(data));
  }
};
//delete report
export const deleteReportThunk = (id) => async (dispatch) => {

  const res = await fetch (`/api/reports/${id}`, {
    method: "DELETE"
  })

  if (res.ok) {
    dispatch(removeReport(id))
  } else {
    const err = await res.json()
    return err;
  }
};

//create loadsinglereport
export const loadSingleReportTrunk = (reportId) => async (dispatch) => {
  const res = await fetch (`/api/reports/${reportId}`)

  if (res.ok) {
    const data = await res.json()
    dispatch(receiveReport(data))
    return data
  } else {
    const err = await res.json()
    return err;
  }
}
//new report thunk
export const createNewReportThunk = (newForm) => async (dispatch) => {
  //console.log(newForm)
  const res = await fetch ("/api/reports", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newForm)
  })
  //console.log(res.ok)
  if (res.ok) {
    //console.log(`is this ran`)
    const data = await res.json()
    dispatch(receiveReport(data))
    return data
  } else {
    const err = await res.json()
    return err;
  }
}

//update report thunk
export const updateReportThunk = (report) => async (dispatch) => {
  const res = await fetch (`/api/reports/${report.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report),
  })
  console.log(res)
  if (res.ok) {
    console.log(`is this ran 2`)
    const data = await res.json()
    dispatch(editReport(data))
    return data
  } else {
    //if there are erro saying res.json is not defined
    //likely due to await is not used for fetch
    const err = await res.json()
    return err;
  }
}


/** Selectors: */

/** Reducer: */

/** The reports reducer is complete and does not need to be modified */
const reportsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REPORTS: {
      const reportsState = {};
      action.reports.forEach((report) => {
        reportsState[report.id] = report;
      });
      return reportsState;
    }
    case RECEIVE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case UPDATE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case REMOVE_REPORT: {
      const newState = { ...state };
      delete newState[action.reportId];
      return newState;
    }
    default:
      return state;
  }
};

export default reportsReducer;
