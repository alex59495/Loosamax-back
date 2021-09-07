import React from "react";
import { SketchPicker } from 'react-color';

import { updateUser } from '../../actions/userActions';

const MyColor = ({user, setBackground, setShow, background, show}) => {
  const handleChangeComplete = (color) => {
    setBackground(color.hex)
  }

  const handleSubmitColor = () => {
    updateUser(user, {color: background});
    setShow(false)
  }

  const showColorPicker = () => {
    if(show) {
      return(
        <>
          <SketchPicker
            color={ background }
            onChangeComplete={handleChangeComplete}
          />
          <div onClick={handleSubmitColor} className="btn-orange mt-1">Je change ma couleur</div>
        </>
      )
    }
  }
  return (
    <div className="color-profile container-center">
      {showColorPicker()}
    </div>
  )
}

export default MyColor
