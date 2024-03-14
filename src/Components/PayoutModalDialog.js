import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "./InputComponent";
import Style from "../Styles/DialogForm.module.css";
import closeIcon from "../images/close-icon.svg";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { whoSearcher } from "../api/services";
import { debounce } from "lodash";
import ToasterComponent from "./ToasterComponent";
import WhoUserBadgeComponent from "./WhoUserBadgeComponent";

function PayoutModalDialog({ hideFunc, addPayoutType, setloadingFunc }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    hideFunc(false);
  };

  const validationSchema = yup.object().shape({
    who: yup.string(),
    amount: yup.number().positive(),
    photos: yup.array(),
    listofPayer: yup.array(),
    payoutType: yup.string(),
    currencyMode: yup.string(),
    descripton: yup.string(),
  });

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
      listofPayer: [],
      descripton: "",
    },
  });

  const formval = watch();
  console.log("errors", errors);
  console.log(formval);
  const [payouttypeVal, setPayoutTypeVal] = useState(
    addPayoutType.toLowerCase()
  );
  const [currencyType, setCurrencyType] = useState("$");
  const onSubmit = async (data) => {
    setloadingFunc(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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

  const [list, setYourList] = useState([]);

  const addToList = (user) => {
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
  };
  const removeFromList = (userToRemove) => {
    setYourList((prevList) => {
      const updatedList = prevList.filter(
        (existingUser) => existingUser.id !== userToRemove.id
      );
      setValue("listofPayer", updatedList);
      return updatedList;
    });
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
              <label className={Style.modalTitle}>Add Breakdown</label>
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
                    <img
                      key={picofuser.id}
                      src={picofuser?.pic}
                      alt="user"
                      className={Style.userimage}
                      onClick={() => removeFromList(picofuser)}
                    />
                  ))}
              </div>
            </div>
            <div className={Style.dialogItem}>
              <div className={Style.dialogItemLabel}>Type:</div>
              <div style={{ width: "100%" }}>
                <div className={Style.toggleswitch}>
                  <button
                    type="button"
                    onClick={() => handleButtonChange("expense")}
                    className={`${Style.switchtext} ${
                      payouttypeVal === "expense" ? `${Style.active}` : ""
                    }`}
                  >
                    Expense
                  </button>
                  <button
                    type="button"
                    onClick={() => handleButtonChange("payout")}
                    className={`${Style.switchtext} ${
                      payouttypeVal === "payout" ? `${Style.active}` : ""
                    }`}
                  >
                    Payout
                  </button>
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
                <label htmlFor="addPhotos" className={Style.photoBtn}>
                  Add Photos
                </label>
                <InputComponent
                  inputRef={"photos"}
                  accept={"image/png, image/jpeg, image/svg"}
                  register={register}
                  id={"addPhotos"}
                  type={"file"}
                  className={`${Style.dnone}`}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default PayoutModalDialog;
