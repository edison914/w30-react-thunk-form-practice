import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { createNewReportThunk, updateReportThunk } from '../store/reports';

const ReportForm = ({ report, formType }) => {
  const navigate = useNavigate();
  const [understanding, setUnderstanding] = useState(report?.understanding);
  const [improvement, setImprovement] = useState(report?.improvement);
  const [errors, setErrors] = useState({});

  //code below
  const dispatch = useDispatch();

  //must be async because of the dispatch is waiting on the fetch result
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    report = { ...report, understanding, improvement };

    let res;
    if (formType === 'Update Report') {
      //must await for the return from the dispatch
      res = await dispatch(updateReportThunk(report))
      //console.log(res)
    } else {
      //must await for the return from the dispatch
      res = await dispatch(createNewReportThunk(report))
      //console.log(res)
    }

    if (res.id) {
      navigate(`/reports/${res.id}`)
    } else {
      setErrors(res.errors)
    }
  };

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <form onSubmit={handleSubmit}>
      <h2>{formType}</h2>
      <div className="errors">{errors.understanding}</div>
      <label>
        Understanding:
        <input
          type="text"
          value={understanding}
          onChange={(e) => setUnderstanding(e.target.value)}
        />
      </label>
      <div className="errors">{errors.improvement}</div>
      <label>
        Improvement:
        <textarea
          value={improvement}
          onChange={(e) => setImprovement(e.target.value)}
        />
      </label>
      <button type="submit">{formType}</button>
    </form>
  );
};

export default ReportForm;
