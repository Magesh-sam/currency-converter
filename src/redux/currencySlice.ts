import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyProps {
  success: boolean;
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    timestamp: number;
    rate: number;
  };
  date: string;
  result: number;
}

const APIKEY = "pERHN5MQZdjEVKE14QzgVX0FjIh01Pq3";

const initialState = {
  loading: false,
  currencyData: {} as CurrencyProps,
  error: "",
};

export const fetchCurrency = createAsyncThunk<
  CurrencyProps,
  { from: undefined | string; to: undefined | string; amount: number }
>("currency/fetchCurrency", async ({ from, to, amount }) => {
  const response = await axios.get(
    `https://api.apilayer.com/exchangerates_data/convert?from=${from}&to=${to}&amount=${amount}&apikey=${APIKEY}`
  );
  return response.data;
});

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrency.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCurrency.fulfilled,
        (state, action: PayloadAction<CurrencyProps>) => {
          (state.loading = false), (state.currencyData = action.payload);
        }
      )
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.loading = false;
        (state.currencyData = {} as CurrencyProps),
          (state.error = action.error.message || "something went wrong");
      });
  },
});

export default currencySlice.reducer;
