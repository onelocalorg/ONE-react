import React from 'react'
import style from "../Styles/checkinCardComponent.module.css"

function CheckinCardComponent(props) {
  return (
    <div className={style.container}>
        {props.children}
    </div>
  )
}

export default CheckinCardComponent