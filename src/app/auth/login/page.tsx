import React from 'react'

const LoginPage = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center '>
        <div className='bg-white p-8 rounded shadow-lg w-96'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
            <form className='flex flex-col'>
            <div className='mb-4'>
                <label htmlFor='username' className='block text-sm font-medium text-gray-700 mb-2'>Username</label>
                <input type='text' id='username' className='input input-lg bg-gray-200' />
            </div>
            <div className='mb-4'>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                <input type='password' id='password' className='input input-lg bg-gray-200' />
            </div>
            <button type='submit' className='btn btn-primary'>Login</button>
            <span className='text-center mb-4'>
                ___________________________________
            </span>
            <button className="btn btn-info text-white">Login with Google</button>
            </form>
        </div>
    </div>
  )
}

export default LoginPage
