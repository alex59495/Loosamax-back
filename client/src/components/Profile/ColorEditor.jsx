import React, {useState} from "react";
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux';

import { updateUser } from '../../actions/userActions';

const ColorEditor = ({user, updateUser}) => {
  const [background, setBackground] = useState(user.color)

  const handleChangeComplete = (color) => {
    setBackground(color.hex)
  }

  const handleSubmitColor = () => {
    updateUser(user, {color: background});
  }

  const showColorPicker = () => {
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

  return (
    <div className="color-profile container-center">
      {showColorPicker()}
    </div>
  )
}

export default connect(null, {updateUser})(ColorEditor);
