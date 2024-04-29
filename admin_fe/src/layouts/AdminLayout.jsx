import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from 'store/auth-slice/slice'
import { useEffect } from 'react'
import { configureSocket } from 'configs/socket'

export const AdminLayout = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(authActions.logout())
    navigate('/login')
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    } else {
      configureSocket()
    }
  }, [isAuth, navigate])
  
  if(!isAuth){
    return null
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-white shadow'>
        <div className='max-w-6xl mx-auto py-2 px-3 sm:px-4 lg:px-6 flex justify-between items-center'>
          <h1 className='text-xl font-medium text-gray-900'>Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className='bg-red-400 hover:bg-red-600 text-white font-normal text-sm py-1 px-2 rounded'
          >
            Logout
          </button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
