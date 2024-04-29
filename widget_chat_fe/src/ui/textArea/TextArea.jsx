import PropTypes from 'prop-types'
import { StyledTextArea } from './style'

export const TextArea = ({
  onChange,
  value,
  placeholder = 'Enter text here...',
}) => {
  return (
    <StyledTextArea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={2}
      cols={50}
    ></StyledTextArea>
  )
}

TextArea.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
}
