import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFormData } from '../store/formSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';

export default function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.forms.countries);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const agreementRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updatedFields, setUpdatedFields] = useState<{
    [key: string]: boolean;
  }>({});

  const handleFieldChange = (field: string) => {
    setUpdatedFields((prevState) => ({
      ...prevState,
      [field]: true,
    }));

    setTimeout(() => {
      setUpdatedFields((prevState) => ({
        ...prevState,
        [field]: false,
      }));
    }, 3000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        setError('Only PNG and JPEG images are allowed');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImageBase64(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    const name = nameRef.current?.value.trim() || '';
    const age = Number(ageRef.current?.value) || 0;
    const email = emailRef.current?.value.trim() || '';
    const password = passwordRef.current?.value || '';
    const confirmPassword = confirmPasswordRef.current?.value || '';
    const gender = genderRef.current?.value || '';
    const country = countryRef.current?.value || '';
    const agreement = agreementRef.current?.checked || false;

    if (!name.match(/^[A-ZА-Я][a-zа-я]*$/)) {
      setError('Name must start with an uppercase letter');
      return;
    }
    if (age <= 0 || age > 140) {
      setError('Age must be a positive number greater 0 and less 140');
      return;
    }
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setError('Invalid email format');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agreement) {
      setError('You must accept the terms and conditions');
      return;
    }

    dispatch(
      addFormData({
        name,
        age,
        email,
        password,
        gender,
        country,
        image: imageBase64,
        agreement,
      })
    );

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="name"
        type="text"
        placeholder="Name"
        ref={nameRef}
        onChange={() => handleFieldChange('name')}
        className={`${updatedFields.name ? 'updated-field' : ''}`}
      />

      <input
        id="age"
        type="number"
        placeholder="Age"
        ref={ageRef}
        onChange={() => handleFieldChange('age')}
        className={`${updatedFields.age ? 'updated-field' : ''}`}
      />
      <input
        id="email"
        type="email"
        placeholder="Email"
        ref={emailRef}
        onChange={() => handleFieldChange('email')}
        className={`${updatedFields.email ? 'updated-field' : ''}`}
      />

      <input
        id="password"
        type="password"
        placeholder="Password"
        ref={passwordRef}
        onChange={() => handleFieldChange('password')}
        className={`${updatedFields.password ? 'updated-field' : ''}`}
      />

      <input
        id="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        ref={confirmPasswordRef}
        onChange={() => handleFieldChange('confirmPassword')}
        className={`${updatedFields.confirmPassword ? 'updated-field' : ''}`}
      />

      <select
        id="gender"
        ref={genderRef}
        onChange={() => handleFieldChange('gender')}
        className={`${updatedFields.gender ? 'updated-field' : ''}`}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <select
        id="country"
        ref={countryRef}
        onChange={() => handleFieldChange('country')}
        className={`${updatedFields.country ? 'updated-field' : ''}`}
      >
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <label htmlFor="fileInput">Upload Image:</label>
      <input
        id="fileInput"
        type="file"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className={`${updatedFields.image ? 'updated-field' : ''}`}
      />

      <label htmlFor="agreement">
        Accept Terms & Conditions
        <input
          id="agreement"
          type="checkbox"
          ref={agreementRef}
          onChange={() => handleFieldChange('agreement')}
          className={`${updatedFields.agreement ? 'updated-field' : ''}`}
        />
      </label>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
