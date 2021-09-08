import React, {useState} from "react";
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux';

import { updateUser } from '../../actions/userActions';

const ColorEditor = ({user, updateUser, setShow}) => {
  const [background, setBackground] = useState(user.color)

  const handleChangeComplete = (color) => {
    setBackground(color.hex)
  }

  const handleSubmitColor = () => {
    updateUser(user, {color: background});
    setShow(false)
  }

  const showColorPicker = () => {
    return(
      <>
        <SketchPicker
          color={ background }
          onChangeComplete={handleChangeComplete}
        />
        <div className="d-flex">
          <div onClick={handleSubmitColor} className="btn-orange mt-1">Je change ma couleur</div>
        </div>
      </>
    )
  }

  return (
    <div className="color-profile container-center">
      {showColorPicker()}
    </div>
  )
}

export default connect(null, {updateUser})(ColorEditor);
