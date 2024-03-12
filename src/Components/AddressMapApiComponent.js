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
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries,
  });

  // Use useFormContext to get the setValue method from react-hook-form
  // const { setValue } = useForm(); // Ensure that this component is within a FormProvider

  if (!isLoaded) return <div>Loading...</div>;
  if (loadError) return <div>Error loading maps</div>;

  const handlePlaceChanged = (autocomplete) => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      console.error("No geometry or location data in place object:", place);
      return;
    }
    // console.log(place);
    // console.log(
    //   place?.mainAddress?.name,
    //   place?.mainAddress?.formatted_address
    // );

    setValue(inputRef, place);
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
      <input type="text" placeholder={placeholder} className={`${className}`} />
    </Autocomplete>
  );
};

export default AddressMapApiComponent;
