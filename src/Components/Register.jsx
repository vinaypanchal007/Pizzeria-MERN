import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className="flex items-center justify-center pt-10 bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-700">Sign up</h1>
          <p className="text-sm text-gray-500">Sign up to create your account</p>
        </div>
        <form>
          <div className="space-y-4">
            <div className="form-field">
              <input
                name="firstName"
                placeholder="Enter First Name"
                type="text"
                className="input w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="form-field">
              <input
                name="lastName"
                placeholder="Enter Last Name"
                type="text"
                className="input w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="form-field">
              <input
                name="email"
                placeholder="Enter Email-Id"
                type="email"
                className="input w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="form-field">
              <input
                name="password"
                placeholder="Enter Password"
                type="password"
                className="input w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="pt-5">
              <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Sign up
              </button>
            </div>
            <div className="mt-4 text-center">
              <Link to='/Login' className="text-sm text-blue-500 hover:underline">Account already exists? Click here.</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
