import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Link } from 'react-router-dom';

export default function MainPage() {
  const formData = useSelector((state: RootState) => state.forms.data);

  return (
    <div className="main-container">
      <h1 className="main-title">Main page</h1>

      <nav className="nav">
        <Link to="/uncontrolled-form" className="nav-link">
          Uncontrolled Form
        </Link>
        <Link to="/hook-form" className="nav-link">
          Hook Form
        </Link>
      </nav>

      <div className="form-data-container">
        {formData.length === 0 ? (
          <p className="no-data-message">No form data submitted yet.</p>
        ) : (
          formData.map((data, index) => (
            <div key={index} className="card">
              <h2 className="card-title">Submitted Data #{index + 1}</h2>
              <div className="field">
                <label className="field-label">Name:</label>
                <p className="field-value">{data.name}</p>
              </div>
              <div className="field">
                <label className="field-label">Age:</label>
                <p className="field-value">{data.age}</p>
              </div>
              <div className="field">
                <label className="field-label">Email:</label>
                <p className="field-value">{data.email}</p>
              </div>
              <div className="field">
                <label className="field-label">Password:</label>
                <p className="field-value">{data.password}</p>
              </div>
              <div className="field">
                <label className="field-label">Gender:</label>
                <p className="field-value">{data.gender}</p>
              </div>
              <div className="field">
                <label className="field-label">Country:</label>
                <p className="field-value">{data.country}</p>
              </div>
              {data.image && (
                <div className="field">
                  <label className="field-label">Image:</label>
                  <img src={data.image} alt="uploaded" className="image" />
                </div>
              )}
              <div className="field">
                <label className="field-label">Agreement Accepted:</label>
                <p className="field-value">{data.agreement ? 'Yes' : 'No'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
