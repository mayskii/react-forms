import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addFormData } from '../store/formSlice';
import { useNavigate } from 'react-router-dom';

export default function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(
      addFormData({
        name: nameRef.current?.value || '',
        age: Number(ageRef.current?.value) || 0,
        email: emailRef.current?.value || '',
        password: '',
        gender: '',
        image: '',
        country: '',
      })
    );

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" ref={nameRef} />
      <input type="number" placeholder="Age" ref={ageRef} />
      <input type="email" placeholder="Email" ref={emailRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
