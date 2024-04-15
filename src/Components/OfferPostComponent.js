/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef, useEffect } from "react";
import ModalComponent from "./ModalCompnent";
import Style from "../Styles/OfferPostComponent.module.css";
import Select, { components } from "react-select";
import everyOne from "../images/everyone.svg";
import DropDwon from "../images/drop-down-black.svg";
import Other from "../images/Other.svg";
import { debounce } from "lodash";
import { whoSearcher, cratePost, uploadImageAPI } from "../api/services";
import ToasterComponent from "./ToasterComponent";
import WhoUserBadgeComponent from "./WhoUserBadgeComponent";
import { IoIosClose } from "react-icons/io";
import DatePickerHookForm from "../Components/DatePickerHookForm";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AddressMapApiComponent from "../Components/AddressMapApiComponent";
import Button from "./Button";
import Offer from "../Components/SVGR/Offer";
import Request from "../Components/SVGR/Request";
import GraitsSvG from "../Components/SVGR/Graits";
import { dataWhat, data } from "../api/constant";
import Loader from "./Loader";
import Plus from "../images/plus.svg";

function OfferPostComponent({ show, onHide, body, className }) {
  return (
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

// const OfferPostComponent;

const Modal = ({ currentFocus, setCurrentFocus, Modal, setModalClose }) => {
  // const [Modal, setModalClose] = useState(true);
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
  const [inputValue, setInputValue] = useState(selectedOption.value);
  const [what, setWhat] = useState("");
  const [whatquantity, setwhatQuantity] = useState(0);
  const [forQuanitity, setForQuntity] = useState(0);
  const [postBody, setPostBody] = useState("");
  const [For, setFor] = useState({
    value: "Other",
    text: "Other",
    imgurl: Other,
  });
  const [latLongObj, setLetLongObj] = useState({});
  const [forName, setForName] = useState("");
  const [tagCuurrentVal, setCurrentVal] = useState("");
  const [tags, setTags] = useState([]);

  const schema = yup.object().shape({
    date: yup.string(),
  });

  const { register, watch, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      mainAddress: {},
    },
  });

  const debouncedSearchQuery = debounce(async (query) => {
    if (query !== "") {
      try {
        setIsLoading(true);
        const resp = await whoSearcher(query);
        setIsLoading(false);
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

  const onHide = () => {
    setModalClose(false);
  };

  const handleUpload = async (uploadData) => {
    setIsLoading(true);
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
      return updatedList;
    });
  };
  const hiddenFileInput = useRef(null);

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={DropDwon} alt="Clik to View More Option" />
      </components.DropdownIndicator>
    );
  };

  const customSingleValue = ({ data }) => (
    <div>
      {" "}
      <img src={data.imgurl} alt="" />
    </div>
  );

  const handleInputChange = (inputValue) => {
    if (selectedOption.value === "person") {
      setQuery(inputValue.target.value);
      setInputValue(inputValue.target.value);
    } else {
      setQuery("");
    }

    if (inputValue.target.value === "") {
      setSerachUserData([]);
      // setInputValue(selectedOption.value);
    }
  };

  const onChangeAddress = (event) => {
    setAddressValue(event.target.value);
  };

  const onLocationSelect = (value) => {
    console.log("value", value);
    setAddressValue(value);
  };

  const setValue = (ref, place) => {
    const latLongObj = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    setLetLongObj(latLongObj);
  };

  const addToList = (user, point = null) => {
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

      // console.log("user", user);
      if (point) {
        user.point = point;
      }
      // setValue("listofPayer", [...prevList, user]);
      return [...prevList, user];
    });

    setSerachUserData([]);
    setQuery("");
    // setValue("who", "");
    // }
  };

  const clickOnPostOffer = async () => {
    console.log("images");
    const formVal = watch();

    const userId = list.map((e) => e.id);
    const sendImg = images.map((e) => e.key);
    // const what_type
    let body = {
      what_type: selectedOption2.value,
      what_name: what,
      what_quantity: whatquantity,
      // to_type: selectedOption.value,
      // to_offer_users: userId,
      for_type: For.value,
      for_name: forName,
      for_quantity: forQuanitity,

      where_address: AddressValue,
      where_lat: latLongObj.lat,
      where_lng: latLongObj.lng,
      content: postBody,
      tags: tags,
      post_image: sendImg,
    };

    if (currentFocus === "offer") {
      body.to_type = selectedOption.value;
      body.to_offer_users = userId;
      body.type = "offer";
      body.when = new Date(formVal.date).toISOString();
    }

    if (currentFocus === "request") {
      body.from_type = selectedOption.value;
      body.from_users = userId;
      body.type = "request";
      body.when = new Date(formVal.date).toISOString();
    }

    if (currentFocus === "gratis") {
      const userIdWithPoints = list.map((e) => {
        return {
          user_id: e.id,
          point: e.point,
        };
      });
      body = {
        type: "gratis",
        what_type: selectedOption2.value,
        what_name: what,
        what_quantity: whatquantity,
        to_type: selectedOption.value,
        to_users: userIdWithPoints,
        tags: tags,
        post_image: sendImg,
        content: postBody,
      };
    }
    setIsLoading(true);
    const res = await cratePost(body);
    setIsLoading(false);
    console.log("res", res);
  };
  const handleSubmit = () => {
    clickOnPostOffer();
  };

  return (
    <>
      <OfferPostComponent
        show={Modal}
        onHide={onHide}
        body={
          <div className={Style.background}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div
                className={Style.Menucontainer}
                onClick={() => {
                  setCurrentFocus("offer");
                  setWhat("");
                }}
              >
                <Offer stroke={currentFocus === "offer" ? "#007112" : "#000"} />
                <span
                  className={`${
                    currentFocus === "offer"
                      ? Style.greenMenuText
                      : Style.menuText
                  }`}
                >
                  Offer
                </span>
              </div>
              <div
                className={Style.Menucontainer}
                onClick={() => {
                  setCurrentFocus("request");
                  setWhat("");
                }}
              >
                <Request
                  stroke={currentFocus === "request" ? "#007112" : "#000"}
                />
                <span
                  className={`${
                    currentFocus === "request"
                      ? Style.greenMenuText
                      : Style.menuText
                  }`}
                >
                  Request
                </span>
              </div>
              <div
                className={Style.Menucontainer}
                onClick={() => {
                  setCurrentFocus("gratis");
                  setWhat("Gratis");
                }}
              >
                <GraitsSvG
                  stroke={currentFocus === "gratis" ? "#007112" : "#000"}
                />
                <span
                  className={`${
                    currentFocus === "gratis"
                      ? Style.greenMenuText
                      : Style.menuText
                  }`}
                >
                  Graits
                </span>
              </div>
            </div>
            <div className={Style.EachContainer}>
              <label className={Style.labelForm}>What</label>
              <input
                className={Style.inputForm}
                placeholder="What do you want to offer?"
                value={what}
                onChange={(event) => {
                  setWhat(event.target.value);
                }}
                disabled={currentFocus === "gratis" ? true : false}
              />
              <button className={Style.offerBtn}>
                <span
                  onClick={() => {
                    setwhatQuantity(whatquantity - 1);
                  }}
                  style={{
                    padding: "0 10px",
                  }}
                >
                  -
                </span>
                {whatquantity}{" "}
                <span
                  onClick={(e) => {
                    setwhatQuantity(whatquantity + 1);
                  }}
                  style={{
                    padding: "0 10px",
                  }}
                >
                  +
                </span>
              </button>
              <Select
                defaultValue={{
                  value: "Other",
                  text: "Other",
                  imgurl: Other,
                }}
                value={selectedOption2}
                options={dataWhat}
                components={{
                  DropdownIndicator,
                  IndicatorSeparator: () => null,
                  SingleValue: customSingleValue,
                }}
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
                      alignItems: "center",
                    };
                  },
                  option: (styles, state) => {
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
                    ...Style.valueContainer1,
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
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
                    <img src={e.imgurl} alt={e.text} />
                    <span style={{ marginLeft: 5 }}>{e.text}</span>
                  </div>
                )}
                onChange={(e) => {
                  setSelectedOption2(e);
                }}
              />
            </div>
            {currentFocus !== "gratis" && (
              <div className={Style.EachContainer}>
                <label className={Style.labelForm}>Where</label>
                <AddressMapApiComponent
                  value={AddressValue}
                  parentStyle={`${Style.flexGrow1}`}
                  inputRef={"mainAddress"}
                  setValue={setValue}
                  register={register}
                  className={`${Style.inputForm} ${Style.mapInput}`}
                  // className={`${Style.timing} ${Style.outline} ${Style.bgGray} ${Style.textBlack} ${Style.wfull} ${Style.paadingX7} ${Style.borderOutline} ${Style.height} ${Style.borderRadius10}`}
                  placeholder={"Google Address"}
                  onChangeAddress={onChangeAddress}
                  onLocationSelect={onLocationSelect}
                />
              </div>
            )}
            <div className={Style.EachContainer}>
              <label className={Style.labelForm}>Post Body</label>
              <textarea
                className={Style.textArea_postBody}
                onChange={(e) => {
                  setPostBody(e.target.value);
                }}
                value={postBody}
              />
            </div>
            <div className={Style.EachContainer}>
              <label className={Style.labelForm}>
                {currentFocus === "request" ? "From" : "To"}
              </label>

              <input
                className={Style.inputForm}
                placeholder="What do you want to offer?"
                value={inputValue}
                onChange={handleInputChange}
              />
              <Select
                defaultValue={{
                  value: "everyone",
                  text: "everyone",
                  imgurl: everyOne,
                }}
                value={selectedOption}
                options={data}
                components={{
                  DropdownIndicator,
                  IndicatorSeparator: () => null,
                  SingleValue: customSingleValue,
                }}
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
                      alignItems: "center",
                    };
                  },
                  option: (styles, state) => {
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
                    <img src={e.imgurl} alt={e.text} />
                    <span style={{ marginLeft: 5 }}>{e.text}</span>
                  </div>
                )}
                onChange={(e) => {
                  setSelectedOption(e);
                  setInputValue(e.text);
                }}
              />
            </div>

            <div>
              {currentFocus === "gratis" ? (
                <div className={Style.userWrapper}>
                  {serachUserData &&
                    serachUserData.length > 0 &&
                    serachUserData
                      .filter(
                        (searchUser) =>
                          !list.some(
                            (listUser) => listUser.id === searchUser.id
                          )
                      )
                      .map((user) => (
                        <WhoUserBadgeComponent
                          key={user?.id}
                          dataItem={user}
                          onClickAddData={(points) => {
                            addToList(user, points);
                          }}
                          isFromGraits={true}
                        />
                      ))}
                </div>
              ) : (
                <div className={Style.userWrapper}>
                  {serachUserData &&
                    serachUserData.length > 0 &&
                    serachUserData
                      .filter(
                        (searchUser) =>
                          // Keep the user if they are not found in yourList
                          !list.some(
                            (listUser) => listUser.id === searchUser.id
                          )
                      )
                      .map((user) => (
                        <WhoUserBadgeComponent
                          key={user?.id}
                          dataItem={user}
                          onClickAddData={() => addToList(user)}
                        />
                      ))}
                </div>
              )}
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

            {currentFocus !== "gratis" && (
              <div className={Style.EachContainer}>
                <label className={Style.labelForm}>For</label>
                <input
                  className={Style.inputForm}
                  placeholder="What reciprocity do you want?"
                  onChange={(e) => {
                    setForName(e.target.value);
                  }}
                />
                <button className={Style.offerBtn}>
                  <span
                    onClick={(e) => {
                      // console.log(e);
                      setForQuntity(forQuanitity - 1);
                    }}
                    style={{
                      padding: "0 10px",
                    }}
                  >
                    -
                  </span>
                  {forQuanitity}
                  <span
                    onClick={(e) => {
                      setForQuntity(forQuanitity + 1);
                    }}
                    style={{
                      padding: "0 10px",
                    }}
                  >
                    +
                  </span>
                </button>
                <Select
                  defaultValue={{
                    value: "Other",
                    text: "Other",
                    imgurl: Other,
                  }}
                  value={For}
                  options={dataWhat}
                  components={{
                    DropdownIndicator,
                    IndicatorSeparator: () => null,
                    SingleValue: customSingleValue,
                  }}
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
                        alignItems: "center",
                      };
                    },
                    option: (styles, state) => {
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
                    setFor(e);

                    // }
                  }}
                />
              </div>
            )}
            {currentFocus !== "gratis" && (
              <div className={Style.EachContainer}>
                <label className={Style.labelForm}>When</label>
                <div className={Style.inputForm}>
                  <DatePickerHookForm
                    control={control}
                    className={`${Style.wfull} ${Style.bgTransparent}`}
                    name="date"
                    minDate={new Date()}
                    placeholder="When is this available?"
                  />
                </div>
              </div>
            )}
            <div className={Style.EachContainer}>
              <label className={Style.labelForm}>Tags</label>
              <input
                className={Style.inputForm}
                placeholder="Add tags or people?"
                value={tagCuurrentVal}
                onChange={(e) => {
                  setCurrentVal(e.target.value);
                }}
              />
              <span
                className={Style.addIcon}
                onClick={() => {
                  if (tagCuurrentVal !== "") {
                    setTags([...tags, tagCuurrentVal]);
                    setCurrentVal("");
                  }
                }}
              >
                <img src={Plus} className={Style.addIconInnerStyle} />
              </span>
            </div>
            <div className={Style.tagContainer}>
              {tags.map((e) => {
                return (
                  <span
                    className={Style.tag}
                    onClick={() => {
                      const newTags = tags.filter((item) => item !== e);
                      setTags(newTags);
                    }}
                  >
                    {e}
                  </span>
                );
              })}
            </div>
            <div className={Style.EachContainer}>
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
            <div className={Style.EachContainer}>
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={handleSubmit} />
            </div>
          </div>
        }
      />
      {isLoading && <Loader />}
    </>
  );
};

export default Modal;
