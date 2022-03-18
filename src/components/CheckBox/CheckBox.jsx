import React from 'react'
import * as S from './checkBox.style'
import PropTypes from 'prop-types'

export default function CheckBox({ onChange, checked, ...props }) {
  const handleChange = event => {
    const value = event.target.checked
    onChange && onChange(value)
  }

  return (
    <S.Checkbox>
      <S.CheckboxInput
        type="checkbox"
        onChange={handleChange}
        checked={checked}
        {...props}
      />
      <S.CheckboxBox />
    </S.Checkbox>
  )
}

CheckBox.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool
}
