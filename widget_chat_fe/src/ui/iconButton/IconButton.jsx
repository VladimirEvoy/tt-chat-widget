import PropTypes from 'prop-types'
import { COLOR_BLACK } from '../../constants/appColors'
import { StyledIconButton } from './style'

export const IconButton = ({
  icon,
  size,
  backgroundColor,
  iconColor = COLOR_BLACK,
  onClick,
  ...rest
}) => {
  return (
    <StyledIconButton
      $size={size}
      $iconColor={iconColor}
      $backgroundColor={backgroundColor}
      onClick={onClick}
      {...rest}
    >
      {icon}
    </StyledIconButton>
  )
}

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  size: PropTypes.number,
  backgroundColor: PropTypes.string,
  iconColor: PropTypes.string,
  onClick: PropTypes.func,
}
