import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addFormData } from '../store/formSlice';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../validationSchema';
import { RootState } from '../store';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  country: string;
  image?: string | null | undefined;
  agreement: boolean;
}

export default function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.forms.countries);

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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(addFormData(data));
    navigate('/');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          setValue('image', reader.result);
          handleFieldChange('image');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name', { required: 'Name is required' })}
        placeholder="Name"
        onChange={() => handleFieldChange('name')}
        className={`${updatedFields.name ? 'updated-field' : ''} ${errors.name ? 'error-field' : ''}`}
      />
      {errors.name && <p>{errors.name.message}</p>}

      <input
        {...register('age', { required: 'Age is required' })}
        type="number"
        placeholder="Age"
        onChange={() => handleFieldChange('age')}
        className={`${updatedFields.age ? 'updated-field' : ''} ${errors.age ? 'error-field' : ''}`}
      />
      {errors.age && <p>{errors.age.message}</p>}

      <input
        {...register('email', { required: 'Email is required' })}
        type="email"
        placeholder="Email"
        onChange={() => handleFieldChange('email')}
        className={`${updatedFields.email ? 'updated-field' : ''} ${errors.email ? 'error-field' : ''}`}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        {...register('password', { required: 'Password is required' })}
        type="password"
        placeholder="Password"
        onChange={() => handleFieldChange('password')}
        className={`${updatedFields.password ? 'updated-field' : ''} ${errors.password ? 'error-field' : ''}`}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <input
        {...register('confirmPassword', {
          required: 'Confirm Password is required',
        })}
        type="password"
        placeholder="Confirm Password"
        onChange={() => handleFieldChange('confirmPassword')}
        className={`${updatedFields.confirmPassword ? 'updated-field' : ''} ${errors.confirmPassword ? 'error-field' : ''}`}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <select
        {...register('gender', { required: 'Gender is required' })}
        onChange={() => handleFieldChange('gender')}
        className={`${updatedFields.gender ? 'updated-field' : ''} ${errors.gender ? 'error-field' : ''}`}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && <p>{errors.gender.message}</p>}

      <select
        {...register('country', { required: 'Country is required' })}
        onChange={() => handleFieldChange('country')}
        className={`${updatedFields.country ? 'updated-field' : ''} ${errors.country ? 'error-field' : ''}`}
      >
        <option value="">Select a country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      {errors.country && <p>{errors.country.message}</p>}

      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageUpload}
        className={`${updatedFields.image ? 'updated-field' : ''} ${errors.image ? 'error-field' : ''}`}
      />
      {errors.image && <p>{errors.image.message}</p>}

      <label>
        <input
          {...register('agreement', {
            required: 'You must accept the terms and conditions',
          })}
          type="checkbox"
          onChange={() => handleFieldChange('agreement')}
          className={`${updatedFields.agreement ? 'updated-field' : ''} ${errors.agreement ? 'error-field' : ''}`}
        />
        Accept terms and conditions
      </label>
      {errors.agreement && <p>{errors.agreement.message}</p>}

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
