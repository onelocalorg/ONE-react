/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef, useEffect } from "react";
import ModalComponent from "./ModalCompnent";
import Style from "../Styles/OfferPostComponent.module.css";
import Select, { components } from "react-select";
import everyOne from "../images/everyone.svg";
import person from "../images/person.svg";
import DropDwon from "../images/drop-down-black.svg";
import { uploadImageAPI } from "../api/services";
import Graits from "../images/Graits.svg";
import Money from "../images/Money.png";
import Other from "../images/Other.svg";
import Resources from "../images/Resources.svg";
import Setting from "../images/setting.svg";
import { debounce } from "lodash";
import { whoSearcher } from "../api/services";
import ToasterComponent from "./ToasterComponent";
import WhoUserBadgeComponent from "./WhoUserBadgeComponent";
import { IoIosClose } from "react-icons/io";
import DatePickerHookForm from "../Components/DatePickerHookForm";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AddressMapApiComponent from "../Components/AddressMapApiComponent";

function OfferPostComponent({ show, onHide, body, className }) {
  return (
    // <div>OfferPostComponent</div>
    <ModalComponent
      show={show}
      hideFunc={onHide}
      body={body}
      className={className}
      isHeaderHight={true}
      header={<div className={Style.headerHeight}></div>}
    />
  );
}

const dataWhat = [
  {
    value: "Graits",
    text: "Graits",
    imgurl: Graits,
  },
  {
    value: "Other",
    text: "Other",
    imgurl: Other,
  },
  {
    value: "Skills",
    text: "Skills",
    imgurl: Setting,
  },
  {
    value: "Money",
    text: "Money",
    imgurl: Money,
  },
  {
    value: "Resources",
    text: "Resources",
    imgurl: Resources,
  },
];
// const OfferPostComponent;

const Modal = () => {
  const [Modal, setModalClose] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    value: "everyone",
    text: "everyone",
    imgurl: everyOne,
  });

  const [query, setQuery] = useState("");
  const [list, setYourList] = useState([]);
  const [serachUserData, setSerachUserData] = useState([]);
  const [AddressValue, setAddressValue] = useState("");

  const schema = yup.object().shape({
    date: yup.string(),
  });

  const { watch, control } = useForm({
    resolver: yupResolver(schema),
  });

  const formVal = watch();

  const debouncedSearchQuery = debounce(async (query) => {
    if (query !== "") {
      try {
        const resp = await whoSearcher(query);
        if (resp.success === true || resp.success === "true") {
          console.log("setSerachUserData", resp?.data);
          setSerachUserData(resp?.data);
        }
      } catch (error) {
        ToasterComponent(`${error.message}`, 2000);
        console.log(error);
      }
    }
  }, 500); // 500 milliseconds delay

  // Effect to handle the actual debounced search query
  useEffect(() => {
    if (query) {
      debouncedSearchQuery(query);
    }
    // Cleanup function to cancel the debounced call if the component unmounts
    return () => {
      debouncedSearchQuery.cancel();
    };
  }, [query]);

  const [selectedOption2, setSelectedOption2] = useState({
    value: "Other",
    text: "Other",
    imgurl: Other,
  });

  const data = [
    {
      value: "everyone",
      text: "everyone",
      imgurl: everyOne,
    },
    {
      value: "person",
      text: "person",
      imgurl: person,
    },
  ];
  const onHide = () => {
    setModalClose(false);
  };

  const handleUpload = async (uploadData) => {
    const res = await uploadImageAPI(uploadData);
    setIsLoading(false);
    const resImg = { imageUrl: res.data.imageUrl, key: res.data.key };
    setImages([...images, resImg]);
  };

  const handleChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setIsLoading(true);
      const [fileNameWithoutExtension] = selectedFile["name"].split(".");
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      const uploadKey = "createPostImg";

      reader.onload = () => {
        // Make a fileInfo Object

        const baseURL = reader.result;
        console.log(baseURL);
        console.log("fileNameWithoutExtension", fileNameWithoutExtension);
        const uploadData = {
          uploadKey: uploadKey,
          imageName: fileNameWithoutExtension,
          base64String: baseURL,
        };
        handleUpload(uploadData);
      };
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const removeFromList = (userToRemove) => {
    setYourList((prevList) => {
      const updatedList = prevList.filter(
        (existingUser) => existingUser.id !== userToRemove.id
      );
      // setValue("listofPayer", updatedList);
      return updatedList;
    });
  };
  const hiddenFileInput = useRef(null);

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={DropDwon} />
      </components.DropdownIndicator>
    );
  };

  const customSingleValue = ({ data }) => (
    <div>
      {" "}
      <img src={data.imgurl} />
    </div>
  );

  const handleInputChange = (inputValue) => {
    if (selectedOption.value === "person") {
      setQuery(inputValue);
    }
  };

  const onChangeAddress = (event) => {
    setAddressValue(event.target.value);
  };

  const onLocationSelect = (value) => {
    setAddressValue(value);
  };

  const addToList = (user) => {
    // if (list.length === 1 || list.lenght > 0) {
    //   // ToasterComponent("Cann't add more than one user", 2000);
    //   setQuery("");
    //   // setValue("who", "");
    //   setSerachUserData([]);
    // } else {
    setYourList((prevList) => {
      const isUserAlreadyAdded = prevList.some(
        (existingUser) => existingUser.id === user.id
      );

      if (isUserAlreadyAdded) {
        // setValue("listofPayer", prevList);
        return prevList;
      }
      // setValue("listofPayer", [...prevList, user]);
      return [...prevList, user];
    });

    setSerachUserData([]);
    setQuery("");
    // setValue("who", "");
    // }
  };

  return (
    <OfferPostComponent
      show={Modal}
      onHide={onHide}
      // className={Style.background}
      body={
        <div className={Style.background}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>Offer</div>
            <div>Request</div>
            <div>Graits</div>
          </div>
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <label className={Style.labelForm}>What</label>
            <input
              className={Style.inputForm}
              placeholder="What do you want to offer?"
            />
            <button className={Style.offerBtn}>- 1 +</button>
            <Select
              // placeholder="Select Option"
              defaultValue={{
                value: "everyone",
                text: "everyone",
                imgurl: everyOne,
              }}
              value={selectedOption2}
              options={dataWhat}
              components={{
                DropdownIndicator,
                IndicatorSeparator: () => null,
                // customSingleValue,
                // customOption,
                SingleValue: customSingleValue,
                // Option: customOption,
              }}
              // components={{
              //   SingleValue: customSingleValue,
              //   Option: customOption,
              // }}
              styles={{
                control: (baseStyles, state) => {
                  return {
                    ...baseStyles,
                    "&:hover": { borderColor: "#000000" },
                    borderColor: state.isFocused ? "#000000" : "#000000",
                    boxShadow: "none",
                    display: "flex",
                    flexDirection: "row-reverse",
                    border: "none", // Remove border
                    boxShadow: "none", // Remove focus border/box-shadow
                    display: "flex",
                    alignItems: "center",
                  };
                },
                option: (styles, state) => {
                  console.log("styles", styles, state.isSelected);
                  return {
                    ...styles,

                    "&:hover": { backgroundColor: "#fff" },
                    color: "#000",
                    backgroundColor: "#fff",
                  };
                },

                menu: (provided) => ({
                  ...provided,
                  width: "auto",
                  // minWidth: "100%", // Ensure minimum width matches the select control
                }),

                singleValue: (provided) => ({
                  ...provided,
                  display: "flex",
                  alignItems: "center",
                }),

                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: "0 8px",
                }),

                valueContainer: (provided) => ({
                  ...provided,
                  display: "flex", // Ensure the container uses flex display
                  flexWrap: "nowrap", // Prevent wrapping of content
                  alignItems: "center", // Center items vertically
                  // overflow: "hidden", // Add if you want to ensure content does not overflow
                  // Add more styling here as needed
                }),
              }}
              getOptionLabel={(e) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "0.5px",
                  }}
                >
                  <img src={e.imgurl} />
                  <span style={{ marginLeft: 5 }}>{e.text}</span>
                </div>
              )}
              onChange={(e) => {
                console.log("selectedOption2", selectedOption2);
                if (selectedOption2 !== "everyone") {
                  setSelectedOption2(e);
                }
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <label className={Style.labelForm}>Where</label>
            {/* <input
              className={Style.inputForm}
              placeholder="Where is this offer located?"
            /> */}
            <AddressMapApiComponent
              value={AddressValue}
              // parentStyle={`${Style.flexGrow1}`}
              // inputRef={"mainAddress"}
              // setValue={setValue}
              // register={register}
              // className={`${Style.timing} ${Style.outline} ${Style.bgGray} ${Style.textBlack} ${Style.wfull} ${Style.paadingX7} ${Style.borderOutline} ${Style.height} ${Style.borderRadius10}`}
              placeholder={"Google Address"}
              onChangeAddress={onChangeAddress}
              onLocationSelect={onLocationSelect}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <label className={Style.labelForm}>Post Body</label>
            <textarea className={Style.textArea_postBody} />
          </div>
          <div
            style={{
              display: "flex",
              gap: " 7px",
              width: "100%",
            }}
          >
            <label className={Style.labelForm}>To</label>

            <Select
              // placeholder="Select Option"
              defaultValue={{
                value: "everyone",
                text: "everyone",
                imgurl: everyOne,
              }}
              value={selectedOption}
              options={data}
              onInputChange={handleInputChange}
              components={{ DropdownIndicator }}
              styles={{
                control: (baseStyles, state) => {
                  return {
                    ...baseStyles,
                    "&:hover": { borderColor: "#000000" },
                    borderColor: state.isFocused ? "#000000" : "#000000",
                    boxShadow: "none",
                    flex: 1,
                  };
                },
                option: (styles, state) => {
                  console.log("styles", styles, state.isSelected);
                  return {
                    ...styles,
                    backgroundColor: state.isSelected ? "#000000" : "#fff",
                    "&:hover": { backgroundColor: "#fff" },
                  };
                },
                container: (provided) => ({
                  ...provided,
                  width: "100%",
                }),
              }}
              getOptionLabel={(e) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "0.5px",
                  }}
                >
                  <span style={{ marginLeft: 5 }}>{e.text}</span>
                </div>
              )}
              onChange={(e) => {
                setSelectedOption(e);
              }}
            />

            {selectedOption && (
              <div style={{ lineHeight: "25px", alignSelf: "center" }}>
                {<img src={selectedOption.imgurl} />}
              </div>
            )}
          </div>

          <div>
            <div className={Style.userWrapper}>
              {serachUserData &&
                serachUserData.length > 0 &&
                serachUserData
                  .filter(
                    (searchUser) =>
                      // Keep the user if they are not found in yourList
                      !list.some((listUser) => listUser.id === searchUser.id)
                  )
                  .map((user) => (
                    <WhoUserBadgeComponent
                      key={user?.id}
                      dataItem={user}
                      onClickAddData={() => addToList(user)}
                    />
                  ))}
            </div>
          </div>
          <div className={Style.dialogItem}>
            <div className={Style.userIconWrapper}>
              {list &&
                list.length > 0 &&
                serachUserData.length === 0 &&
                list.map((picofuser) => (
                  <div key={picofuser.id} className={Style.posRelative}>
                    <img
                      src={picofuser?.pic}
                      alt="user"
                      className={Style.userimage}
                    />
                    <IoIosClose
                      className={Style.iconCross}
                      onClick={() => removeFromList(picofuser)}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <label className={Style.labelForm}>For</label>
            <input
              className={Style.inputForm}
              placeholder="What reciprocity do you want?"
            />
            <button className={Style.offerBtn}>- 1 +</button>
            <Select
              // placeholder="Select Option"
              defaultValue={{
                value: "everyone",
                text: "everyone",
                imgurl: everyOne,
              }}
              value={selectedOption2}
              options={dataWhat}
              components={{
                DropdownIndicator,
                IndicatorSeparator: () => null,
                // customSingleValue,
                // customOption,
                SingleValue: customSingleValue,
                // Option: customOption,
              }}
              // components={{
              //   SingleValue: customSingleValue,
              //   Option: customOption,
              // }}
              styles={{
                control: (baseStyles, state) => {
                  return {
                    ...baseStyles,
                    "&:hover": { borderColor: "#000000" },
                    borderColor: state.isFocused ? "#000000" : "#000000",
                    boxShadow: "none",
                    display: "flex",
                    flexDirection: "row-reverse",
                    border: "none", // Remove border
                    boxShadow: "none", // Remove focus border/box-shadow
                    display: "flex",
                    alignItems: "center",
                  };
                },
                option: (styles, state) => {
                  console.log("styles", styles, state.isSelected);
                  return {
                    ...styles,

                    "&:hover": { backgroundColor: "#fff" },
                    color: "#000",
                    backgroundColor: "#fff",
                  };
                },

                menu: (provided) => ({
                  ...provided,
                  width: "auto",
                  // minWidth: "100%", // Ensure minimum width matches the select control
                }),

                singleValue: (provided) => ({
                  ...provided,
                  display: "flex",
                  alignItems: "center",
                }),

                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: "0 8px",
                }),

                valueContainer: (provided) => ({
                  ...provided,
                  display: "flex", // Ensure the container uses flex display
                  flexWrap: "nowrap", // Prevent wrapping of content
                  alignItems: "center", // Center items vertically
                  // overflow: "hidden", // Add if you want to ensure content does not overflow
                  // Add more styling here as needed
                }),
              }}
              getOptionLabel={(e) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "0.5px",
                  }}
                >
                  <img src={e.imgurl} />
                  <span style={{ marginLeft: 5 }}>{e.text}</span>
                </div>
              )}
              onChange={(e) => {
                console.log("selectedOption2", selectedOption2);
                if (selectedOption2 !== "everyone") {
                  setSelectedOption2(e);
                }
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <label className={Style.labelForm}>When</label>
            <div className={Style.inputForm}>
              <DatePickerHookForm
                control={control}
                className={`${Style.wfull} ${Style.bgTransparent}`}
                name="date"
                // maxDate={new Date(eventData.end_date)}
                minDate={new Date()}
                placeholder="When is this available?"
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <label className={Style.labelForm}>Tags</label>
            <input
              className={Style.inputForm}
              placeholder="Add tags or people?"
            />
          </div>
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <label className={Style.labelForm}>Image</label>
            <label
              // htmlFor="addImagePopUp"
              className={Style.btnImg}
              style={{ cursor: "pointer" }}
              onClick={handleClick}
            >
              + add images
            </label>
            <input
              onChange={handleChange}
              accept={"image/png, image/jpeg, image/svg"}
              id={"addImagePopUp"}
              className={`${Style.dnone}`}
              type="file"
              style={{ display: "none" }}
              ref={hiddenFileInput}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            {images.map((e) => {
              console.log("e.imgUrl", e.imageUrl);
              return (
                <img
                  src={e.imageUrl}
                  alt="image not able to load"
                  className={Style.postImage}
                />
              );
            })}
          </div>
        </div>
      }
    />
  );
};

export default Modal;
