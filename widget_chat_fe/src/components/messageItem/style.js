import styled from 'styled-components';
import { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_WHITE, COLOR_BLACK } from '../../constants/appColors';


export const StyledMessageItem = styled.div`
    display: flex;
    align-items: start;
    justify-content: ${props => (props.$isSender ? 'end' : 'start')};
    flex-direction: ${props => (props.$isSender ? 'row' : 'row-reverse')};;
    gap: 10px;
    margin-bottom: 10px;
    padding-right: 4px;
`;


export const MessageAvatarWrapper = styled.div`
    flex: 0 0 40px;
    height:40px;
    border-radius:50%;
    overflow:hidden;
    order: ${props => props.$isSender ? 2 : 2}
`;

export const MessageAvatar = styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
`;

export const MessageContent = styled.div`
    background:${props => props.$isSender ? COLOR_PRIMARY : COLOR_SECONDARY};
    order: ${props => props.$isSender ? 1 : 2};
    color: ${props => props.$isSender ? COLOR_WHITE : COLOR_BLACK};
    padding: 3px 8px;
    border-radius:4px;
    height: fit-content;
    font-size: 16px;
    line-height: 20px;
`;



