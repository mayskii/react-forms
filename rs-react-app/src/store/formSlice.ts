import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  image: string;
  country: string;
}

interface FormsState {
  data: FormData[];
}

const initialState: FormsState = { data: [] };

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.data.push(action.payload);
    },
  },
});

export const { addFormData } = formsSlice.actions;
export default formsSlice.reducer;
