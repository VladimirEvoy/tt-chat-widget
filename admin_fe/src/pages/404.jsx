import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function NotFoundPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/login')
  }, [navigate])

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-200'>
      <div className='text-center p-10 bg-white rounded-lg shadow-xl'>
        <h1 className='text-3xl font-bold text-red-600 mb-4'>
          404 - Page Not Found!
        </h1>
        <p className='text-lg text-gray-700 mb-3'>
          You will be redirected to the login page shortly.
        </p>
      </div>
    </div>
  )
}
