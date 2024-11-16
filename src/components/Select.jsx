import React, { useEffect, useState } from "react";

const Select = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError("Failed to fetch countries: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (event) => {
    const selectedCountryCode = event.target.value;
    const selectedCountry = countries.find(
      (country) => country.cca3 === selectedCountryCode
    );
    onSelectCountry(selectedCountry);
  };

  if (loading) {
    return <div>Loading countries...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <select style={styles.select} onChange={handleChange}>
      <option value="">Select a Country</option>
      {countries.map((country) => (
        <option key={country.cca3} value={country.cca3}>
          {country.name.common}
        </option>
      ))}
    </select>
  );
};

const styles = {
  select: {
    fontFamily: "monospace",
    padding: "10px",
    fontSize: "16px",
    width: "260px",
  },
};

export default Select;
