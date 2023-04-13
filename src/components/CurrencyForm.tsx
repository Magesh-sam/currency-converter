import React, { useState, FormEvent } from "react";
import { options } from "../redux/symbols";
import Select from "react-select";
import "../styles/currencyform.css";
import type { RootState, AppDispatcher } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrency } from "../redux/currencySlice";

export const CurrencyForm = () => {
  const [from, setFrom] = useState<undefined | string>("");
  const [to, setTo] = useState<undefined | string>("");
  const [amount, setAmount] = useState(1);

  const { loading, currencyData, error } = useSelector(
    (state: RootState) => state.currency
  );
  const dispatch = useDispatch<AppDispatcher>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchCurrency({ from, to, amount }));
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          paddingTop: "50px",
          textDecoration: "2px solid underline",
          textUnderlineOffset: "10px",
        }}
      >
        Currency Converter
      </h1>
      <form onSubmit={(e) => handleSubmit(e)} className="currencyform">
        <div className="formControl">
          <label>From</label>
          <Select
            onChange={(e) => setFrom(e?.value)}
            className="select"
            isClearable
            options={options}
          />
        </div>
        <div className="formControl">
          <label>To</label>
          <Select
            onChange={(e) => setTo(e?.value)}
            className="select"
            isClearable
            options={options}
          />
        </div>
        <div className="formControl">
          <label>Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="amount"
            type="number"
            min={1}
          />
        </div>
        <button className="submitbtn" type="submit">
          Convert
        </button>
      </form>
      {loading && (
        <h2
          style={{
            color: "rgba(0,0,180,0.7)",
            textAlign: "center",
            marginTop: "35px",
          }}
        >
          Converting Currency...
        </h2>
      )}
      {!loading && error.length > 0 ? (
        <h2
          style={{ color: "red", textAlign: "center", marginTop: "35px" }}
        >{`${error}, Try Again!`}</h2>
      ) : null}
      {!loading && currencyData.success ? (
        <div className="result">
          <h2>{`Result: ${currencyData?.result} ${currencyData.query.to}`}</h2>
          <h3>{`1 ${currencyData.query.from} = ${currencyData.info.rate} ${currencyData.query.to}`}</h3>
        </div>
      ) : null}
    </div>
  );
};
