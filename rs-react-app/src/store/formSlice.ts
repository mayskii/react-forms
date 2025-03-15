import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  image?: string | null | undefined;
  country: string;
}

interface FormsState {
  data: FormData[];
  countries: string[];
}

const initialState: FormsState = {
  data: [],
  countries: ['USA', 'Canada', 'Germany', 'France', 'UK', 'Japan'],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.data.push(action.payload);
    },
    setCountries: (state, action: PayloadAction<string[]>) => {
      state.countries = action.payload;
    },
  },
});

export const { addFormData, setCountries } = formsSlice.actions;
export default formsSlice.reducer;
