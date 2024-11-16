import React, { useState } from "react";
import Select from "./components/Select";

const CenteredSelect = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    if (country) {
      setCoordinates(
        country.capitalInfo?.latlng || "Coordinates not available"
      );
    }
  };

  const countryDetails = selectedCountry
    ? {
        name: selectedCountry.name.common,
        capital: selectedCountry.capital,
        region: selectedCountry.region,
        coordinates: coordinates ? coordinates : "Not available",
      }
    : null;

  return (
    <div style={styles.container}>
      <div>
        <h1>Select a Country:</h1>
        <Select onSelectCountry={handleCountrySelect} />
        {countryDetails && (
          <div style={styles.details}>
            <h2>Details</h2>
            <pre>{JSON.stringify(countryDetails, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "monospace",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    margin: 0,
    textAlign: "center",
  },
  details: {
    marginTop: "15px",
    padding: "20px",
    border: "1px solid black",
    borderRadius: "6px",
    backgroundColor: "#f9f9f9",
    whiteSpace: "pre-wrap",
    textAlign: "center",
  },
};

export default CenteredSelect;
