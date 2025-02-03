import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCities,
  selectCities,
  selectStatus,
  setSelectedCity,
  selectSelectedCity,
} from "../../redux/citiesSlice/citiesSlice";

function Input() {
  const dispatch = useDispatch();
  const cities = useSelector(selectCities);
  const status = useSelector(selectStatus);
  const selectedCity = useSelector(selectSelectedCity);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCities());
    }
  }, [status, dispatch]);

  const handleChange = (e) => {
    dispatch(setSelectedCity(e.target.value));
  };

  return (
    <select className="input" value={selectedCity} onChange={handleChange}>
      {cities.map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
}

export default Input;
