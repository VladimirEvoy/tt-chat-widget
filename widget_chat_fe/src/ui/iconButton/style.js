import styled from 'styled-components';
import { COLOR_WHITE, COLOR_PRIMARY } from '../../constants/appColors';


export const StyledIconButton = styled.button`
    background-color: ${props => props.backgroundColor || COLOR_PRIMARY};
    color: ${props => props.$iconColor || COLOR_WHITE};
    width: ${props => `${props.$size || 50}px`};
    height: ${props => `${props.$size || 50}px`};
    border-radius: 50%;
    padding: 4px;
    cursor: pointer;

    svg {
        max-width:28px;
        max-height:28px;
    }
`;

