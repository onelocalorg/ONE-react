import React, { useEffect, useState } from "react";
import { subscriptionsPlansApi } from "../api/services";
import Loader from "../Components/Loader";
import PlanCardComponent from "../Components/PlanCardComponent";
import style from "../Styles/SubscriptionsPlans.module.css";

function SubscriptionsPlans() {
  const [data, setData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCardData(data);
  }, [data]);

  const subscriptionsPlans = async () => {
    setIsLoading(true);
    try {
      const response = await subscriptionsPlansApi();
      const { data } = response.data;
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    subscriptionsPlans();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <p className={style.title}>PLAN LIST :</p>
      <div className={style.subscriptionProperty}>
        {cardData.map((item, i) => (
          <PlanCardComponent
            key={i}
            name={item.name}
            price={item.price.$numberDecimal}
            interval={item.interval}
            isActive={item.is_active_subscription}
          />
        ))}
      </div>
    </>
  );
}

export default SubscriptionsPlans;
