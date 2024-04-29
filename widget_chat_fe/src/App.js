import { ChatWidget } from './components/chatWidget/ChatWidget'
import GlobalStyles from './globalStyles'
import { StyleSheetManager } from 'styled-components'

function App({ socketSettings }) {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => !prop.startsWith('$')}>
      <GlobalStyles />
      <ChatWidget socketSettings={socketSettings} />
    </StyleSheetManager>
  )
}

export default App
