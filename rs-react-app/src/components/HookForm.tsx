import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addFormData } from '../store/formSlice';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../validationSchema';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'male' | 'female';
  country: string;
  image?: string | null | undefined;
}

export default function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      />
      {errors.name && <p>{errors.name.message}</p>}

      <input
        {...register('age', { required: 'Age is required' })}
        type="number"
        placeholder="Age"
      />
      {errors.age && <p>{errors.age.message}</p>}

      <input
        {...register('email', { required: 'Email is required' })}
        type="email"
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        {...register('password', { required: 'Password is required' })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <p>{errors.password.message}</p>}

      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageUpload}
      />
      {errors.image && <p>{errors.image.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
