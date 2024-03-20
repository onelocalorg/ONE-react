// GoogleMapAutocomplete.tsx

import React from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const AddressMapApiComponent = ({
  inputRef,
  className,
  setValue,
  placeholder,
  parentStyle,
  register,
  value,
  onChangeAddress,
  onLocationSelect,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  if (loadError) return <div>Error loading maps</div>;

  const changeValue = (type, value) => {
    if (type === "editing") {
      onChangeAddress(value);
    } else {
      onLocationSelect(value.formatted_address);
    }
  };

  const handlePlaceChanged = (autocomplete) => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      console.error("No geometry or location data in place object:", place);
      return;
    }

    setValue(inputRef, place);
    changeValue("selecting", place);
  };

  return (
    <Autocomplete
      className={parentStyle}
      onLoad={(autocomplete) => {
        window.google.maps.event.addListener(
          autocomplete,
          "place_changed",
          () => {
            handlePlaceChanged(autocomplete);
          }
        );
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        className={`${className}`}
        value={value}
        onChange={(event) => {
          changeValue("editing", event);
        }}
      />
    </Autocomplete>
  );
};

export default AddressMapApiComponent;
