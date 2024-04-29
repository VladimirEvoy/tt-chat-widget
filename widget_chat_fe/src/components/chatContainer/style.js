import styled from 'styled-components'
import { COLOR_PRIMARY, COLOR_WHITE } from '../../constants/appColors'

export const StyledChatContainer = styled.div`
  position: fixed;
  right: 20px;
  bottom: 90px;
  transform: ${(props) =>
    props.$isChatContainerOpen ? 'translateY(0)' : 'translateY(200%)'};
  transition: transform 0.3s ease;
  background: ${COLOR_PRIMARY};
  height: 600px;
  width: 100%;
  max-width: 480px;
  border-radius: 12px;
  padding: 4px;
`

export const StyledChatContainerInner = styled.div`
  background: ${COLOR_WHITE};
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const StyledChatContainerHeader = styled.div`
  background: ${COLOR_PRIMARY};
  color: ${COLOR_WHITE};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
`

export const StyledChatContainerTitle = styled.h4`
  margin: 0;
  font-size: 22px;
  line-height: 24px;
  font-weight: 300;
`

export const StyledChatContainerInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  gap: 8px;
`

export const StyledChatContainerBody = styled.div`
  padding: 8px;
  height: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
`

export const StyledAddChatButton = styled.button`
  border-radius: 4px;
  padding: 2px 8px;
  border: 1px solid black;
  margin-bottom: 4px;
  align-self: center;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR_PRIMARY};
  }
`
