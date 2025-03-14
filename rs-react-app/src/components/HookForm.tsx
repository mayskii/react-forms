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
}

export default function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(
      addFormData({ ...data, password: '', image: '', gender: '', country: '' })
    );
    navigate('/');
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

      <button type="submit">Submit</button>
    </form>
  );
}
