import { AdminLayout } from 'layouts/AdminLayout'
import { NotFoundPage } from 'pages/404'
import { ChatDetailsPage } from 'pages/chatDetails'
import { ChatsPage } from 'pages/chats'
import { LoginPage } from 'pages/login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/chats'
          element={
            <AdminLayout>
              <ChatsPage />
            </AdminLayout>
          }
        />
        <Route
          path='/chats/:id'
          element={
            <AdminLayout>
              <ChatDetailsPage />
            </AdminLayout>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
