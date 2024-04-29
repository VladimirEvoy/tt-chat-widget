
import styled from 'styled-components';


export const StyledTextArea = styled.textarea`
    border: none;
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    resize: none;
    padding: 12px;
    line-height: 20px;

    &:focus {
        border: none;
        outline: none;
    }

    &:focus-visible {
        border: none;
        outline: none;
    }
`;

