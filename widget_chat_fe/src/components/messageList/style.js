import styled from 'styled-components';
import {COLOR_PRIMARY} from '../../constants/appColors';


export const StyledMessageList = styled.div`
    overflow: auto;

    &::-webkit-scrollbar {
        width: 3px;
    }

    &::-webkit-scrollbar-track {
        background-color: lightgray;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${COLOR_PRIMARY}; /* Set thumb color */
        border-radius: 35px;
    }

`;
