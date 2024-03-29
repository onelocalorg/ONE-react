import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "./InputComponent";
import Style from "../Styles/DialogForm.module.css";
import closeIcon from "../images/close-icon.svg";
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import {
  deletePayoutDelete,
  expensePayoutDraft,
  expensePayoutEdit,
  getPayout,
  whoSearcher,
} from "../api/services";
import { debounce } from "lodash";
import ToasterComponent from "./ToasterComponent";
import WhoUserBadgeComponent from "./WhoUserBadgeComponent";
import { IoIosClose } from "react-icons/io";
import SaveBtn from "../images/Saveicon.svg";
import DeleteIcon from "../images/Delete.svg";
import ToasterSuccess from "./ToasterSuccess";

import { uploadImageAPI } from "../api/services";
import Loader from "./Loader";

function EditPayoutModalDialog({
  hideFunc,
  addPayoutType,
  setloadingFunc,
  setExpenses,
  setPayouts,
  eventId,
  setPayoutDetails,
  exp,
}) {
  const dispatch = useDispatch();

  const hiddenFileInput = useRef(null);
  const [images, setImages] = useState(exp.images);
  const [loader, setLoader] = useState(false);

  const handleChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLoader(true);
      const [fileNameWithoutExtension] = selectedFile["name"].split(".");
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      const uploadKey =
        addPayoutType.toLowerCase() === "expense"
          ? "expense_image"
          : "payout_image";
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

  const handleUpload = async (uploadData) => {
    const res = await uploadImageAPI(uploadData);
    setLoader(false);
    const resImg = { imgUrl: res.data.imageUrl, key: res.data.key };
    setImages([...images, resImg]);
  };

  const handleClose = () => {
    hideFunc(false);
  };

  const validationSchema = yup.object().shape({
    who: yup.string(),
    amount: yup.number().positive(),
    photos: yup
      .array()
      .of(
        yup.object().shape({
          key: yup.string().required("Image key is required"),
          imageUrl: yup
            .string()
            .url("Must be a valid URL")
            .required("Image URL is required"),
        })
      )
      .min(1, "At least one photo is required"),
    listofPayer: yup.array(),
    payoutType: yup.string(),
    currencyMode: yup.string(),
    description: yup.string(),
  });

  const oldData = exp || {};
  const userListPerson =
    {
      first_name: oldData?.user_id?.first_name,
      id: oldData?.user_id?.id,
      last_name: oldData?.user_id?.last_name,
      pic: oldData?.user_id?.pic,
      key: oldData?.key,
    } || {};

  const getAmount = exp.type === "percentage" ? exp.amount_percent : exp.amount;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(validationSchema),
    defaultValues: {
      who: "",
      listofPayer: [
        {
          first_name: oldData?.user_id?.first_name,
          id: oldData?.user_id?.id,
          last_name: oldData?.user_id?.last_name,
          pic: oldData?.user_id?.pic,
          key: oldData?.key,
        },
      ],
      description: oldData?.description,
      amount: `${getAmount}`,
      // photos: [oldData?.images[0].name],
    },
  });

  const formval = watch();

  const [payouttypeVal, setPayoutTypeVal] = useState(
    addPayoutType.toLowerCase()
  );
  const [currencyType, setCurrencyType] = useState(
    exp.type === "percentage" ? "%" : "$"
  );
  const onSubmit = async (data) => {
    setloadingFunc(true);
  };
  const [imageval, setImageVal] = useState(oldData?.images[0]?.imageUrl);
  const [ImageToUpdate, setImageToUpdtate] = useState(oldData?.images[0]);

  const handleFormSubmit = async (data) => {
    try {
      setloadingFunc(true);
      const sendImages = images.map((e) => e.key);
      const dataToSend = {
        user_id: data?.listofPayer[0]?.id,
        type: currencyType === "$" ? "price" : "percentage",
        amount: Number(data?.amount),
        description: data?.description,
        images: sendImages,
        key: oldData?.key,
      };
      console.log("currencyType", currencyType);
      if (currencyType === "%") {
        dataToSend.amount_percent = data?.amount;
      }

      const dataToset = {
        amount: Number(data?.amount),
        description: data?.description,
        images: sendImages,
        user_id: data?.listofPayer[0]?.id,
        first_name: data?.listofPayer[0]?.first_name,
        type: currencyType === "$" ? "price" : "percentage",
      };

      if (currencyType === "%") {
        dataToset.amount_percent = data?.amount;
      }
      const resp = await expensePayoutEdit(eventId, payouttypeVal, dataToSend);
      if (resp.success) {
        if (payouttypeVal === "expense") {
          setExpenses(dataToset);
          try {
            const response = await getPayout(eventId);
            hideFunc();
            setPayoutDetails(response?.data);
            ToasterSuccess(`${resp?.message}`, 2000);
          } catch (error) {
            ToasterComponent(`${error.message}`, 2000);
            console.log(error);
          }
        } else {
          setPayouts(dataToset);
          try {
            const response = await getPayout(eventId);
            hideFunc();
            setPayoutDetails(response?.data);
            ToasterSuccess(`${resp?.message}`, 2000);
          } catch (error) {
            ToasterComponent(`${error.message}`, 2000);
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.log("error", error);
      ToasterComponent(`${error.message}`, 2000);
    } finally {
      setloadingFunc(false);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleButtonChange = (text) => {
    setPayoutTypeVal(text.toLowerCase());
    setValue("payoutType", text.toLowerCase());
    if (text === "expense") {
      setCurrencyType("$");
      setValue("currencyMode", "$");
    }
  };

  const handleCurrencyType = (sign) => {
    setCurrencyType(sign);
    setValue("currencyMode", sign);
  };

  const [query, setQuery] = useState("");
  const [serachUserData, setSerachUserData] = useState([]);

  // Debounce the API call function
  const debouncedSearchQuery = debounce(async (query) => {
    if (query !== "") {
      try {
        const resp = await whoSearcher(query);
        if (resp.success === true || resp.success === "true") {
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

  const [list, setYourList] = useState([userListPerson]);

  const addToList = (user) => {
    if (list.length === 1 || list.lenght > 0) {
      ToasterComponent("Cann't add more than one user", 2000);
      setQuery("");
      setValue("who", "");
      setSerachUserData([]);
    } else {
      setYourList((prevList) => {
        const isUserAlreadyAdded = prevList.some(
          (existingUser) => existingUser.id === user.id
        );

        if (isUserAlreadyAdded) {
          setValue("listofPayer", prevList);
          return prevList;
        }
        setValue("listofPayer", [...prevList, user]);
        return [...prevList, user];
      });

      setSerachUserData([]);
      setQuery("");
      setValue("who", "");
    }
  };
  const removeFromList = (userToRemove) => {
    ToasterComponent("Cann't remove from list", 2000);
    return;
    setYourList((prevList) => {
      const updatedList = prevList.filter(
        (existingUser) => existingUser.id !== userToRemove.id
      );
      setValue("listofPayer", updatedList);
      return updatedList;
    });
  };

  const details = {
    key: oldData?.key,
  };

  const deletePayout = async () => {
    try {
      const resp = await deletePayoutDelete(eventId, payouttypeVal, details);
      if (resp.code === 200 && resp.success === true) {
        try {
          const response = await getPayout(eventId);
          hideFunc();
          setPayoutDetails(response?.data);
          ToasterSuccess(`${resp.message}`, 2000);
        } catch (error) {
          ToasterComponent(`${error.message}`, 2000);
          console.log(error);
        }
      }
      console.log(resp);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      setImageToUpdtate(selectedFile);
      const [fileNameWithoutExtension] = selectedFile["name"].split(".");
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        setImageVal(reader.result);
      };

      // handleFileUpload(type, reader.result, fileNameWithoutExtension);
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="module-dialog">
      <Modal
        show
        onHide={handleClose}
        className={Style.modalItem}
        backdrop="static"
      >
        <Modal.Header>
          <div className={Style.modalHeader}>
            <div className={Style.closeIcon} onClick={handleClose}>
              <img src={closeIcon} alt="close" />
            </div>
            <div className={Style.modalTitleContainer}>
              <label className={Style.modalTitle}>Edit Breakdown</label>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={Style.dialogItem}>
              <div className={Style.dialogItemLabel}>Who:</div>
              <div style={{ width: "100%" }}>
                <InputComponent
                  type={"text"}
                  placeholder={"Select who to pay"}
                  register={register}
                  inputRef={"who"}
                  className={Style.inputField}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
            <div className={Style.dialogItem}>
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
            <div className={Style.dialogItem}>
              <div className={Style.dialogItemLabel}>Type:</div>
              <div style={{ width: "100%" }}>
                <div className={Style.toggleswitch}>
                  {payouttypeVal === "expense" && (
                    <button
                      type="button"
                      onClick={() => handleButtonChange("expense")}
                      className={`${Style.switchtext} ${
                        payouttypeVal === "expense" ? `${Style.active}` : ""
                      }`}
                    >
                      Expense
                    </button>
                  )}
                  {payouttypeVal === "payout" && (
                    <button
                      type="button"
                      onClick={() => handleButtonChange("payout")}
                      className={`${Style.switchtext} ${
                        payouttypeVal === "payout" ? `${Style.active}` : ""
                      }`}
                    >
                      Payout
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className={Style.dialogItem}>
              <div className={Style.dialogItemLabel}>Amount:</div>
              <div className={`${Style.amountWrapper} `}>
                <div className={`${Style.currencyWrapper} ${Style.flex2}`}>
                  <button
                    type="button"
                    className={`${Style.currencyType} ${
                      currencyType === "$" ? `${Style.currencyTypeActive}` : ""
                    }`}
                    onClick={() => handleCurrencyType("$")}
                  >
                    $
                  </button>
                  {payouttypeVal === "payout" && (
                    <button
                      type="button"
                      className={`${Style.currencyType} ${
                        currencyType === "%"
                          ? `${Style.currencyTypeActive}`
                          : ""
                      }`}
                      onClick={() => handleCurrencyType("%")}
                    >
                      %
                    </button>
                  )}
                </div>

                <div className={`${Style.flex1} ${Style.amountWrapper}`}>
                  {currencyType}
                  <InputComponent
                    inputRef={"amount"}
                    register={register}
                    placeholder={0}
                    type={"number"}
                    className={`${Style.amountinput}`}
                  />
                </div>
              </div>
            </div>
            <div className={Style.dialogItem1}>
              <div className={Style.dialogItemLabel}>Description:</div>
              <div
                style={{
                  width: "100%",
                }}
              >
                <InputComponent
                  inputRef={"description"}
                  register={register}
                  placeholder={"Add description of this"}
                  type={"text"}
                  className={`${Style.descInput}`}
                />
              </div>
            </div>
            <div className={Style.dialogItem}>
              <div className={Style.dialogItemLabel}>Media:</div>
              <div
                style={{
                  width: "100%",
                  textAlign: "right",
                }}
              >
                <label
                  // htmlFor="addImagePopUp"
                  className={Style.photoBtn}
                  style={{ cursor: "pointer" }}
                  onClick={handleClick}
                >
                  Add Photos
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
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {images.map((e) => {
                console.log("e.imgUrl", images);
                return (
                  <img
                    src={e.imageUrl}
                    className={Style.userimage}
                    key={e.imageUrl}
                  />
                );
              })}
            </div>
            <div className={Style.dialogItem}>
              <div className={Style.submitBtnWrapper}>
                <button
                  type="submit"
                  className={Style.saveBtn}
                  onClick={handleSubmit(handleFormSubmit)}
                >
                  <img alt="save" src={SaveBtn} />
                </button>
                <button
                  type="submit"
                  className={Style.saveBtn}
                  style={{ marginLeft: "10px" }}
                  onClick={deletePayout}
                >
                  <img alt="save" src={DeleteIcon} />
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {loader && <Loader />}
    </div>
  );
}

export default EditPayoutModalDialog;
