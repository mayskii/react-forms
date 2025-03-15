import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Link } from 'react-router-dom';

export default function MainPage() {
  const formData = useSelector((state: RootState) => state.forms.data);

  return (
    <div>
      <h1>Main page</h1>

      <nav>
        <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        <Link to="/hook-form">Hook Form</Link>
      </nav>

      <div>
        {formData.length === 0 ? (
          <p>No form data submitted yet.</p>
        ) : (
          formData.map((data, index) => (
            <div key={index} style={{ padding: '10px', marginBottom: '10px' }}>
              <p>
                <strong>Name:</strong> {data.name}
              </p>
              <p>
                <strong>Age:</strong> {data.age}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Password:</strong> {data.password}
              </p>
              <p>
                <strong>Gender:</strong> {data.gender}
              </p>
              <p>
                <strong>Country:</strong> {data.country}
              </p>
              {data.image && (
                <div>
                  <strong>Image:</strong>
                  <img
                    src={data.image}
                    alt="uploaded"
                    style={{ maxWidth: '100px', marginTop: '10px' }}
                  />
                </div>
              )}
              <p>
                <strong>Agreement Accepted:</strong>{' '}
                {data.agreement ? 'Yes' : 'No'}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
