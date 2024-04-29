import styled from 'styled-components'
import { COLOR_PRIMARY, COLOR_WHITE } from '../../constants/appColors'

export const StyledRegister = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    height: 100%;
    padding: 20px;
`;

export const LoginInput = styled.input`
    background-color: ${COLOR_WHITE};
    border: none;
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 16px 18px;
    line-height: 20px;
    font-size: 14px;
    width: 100%;

    &:focus {
        border: none;
        outline: none;
    }

    &:focus-visible {
        border: none;
        outline: none;
    }
`;

export const LoginButton = styled.button`
    background-color: ${COLOR_PRIMARY};
    color: ${COLOR_WHITE};
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    font-size: 20px;
    line-height: 20px;
    cursor: pointer;
    opacity: 0.9;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 1;
    }
`;
