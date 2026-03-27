import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'
import Navbar from '../components/core/HomePage/Navbar'

const Dashboard = () => {
    const {loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);

    if (profileLoading || authLoading) {
        return (
            <div className="mt-14 overflow-hidden h-[calc(100vh-3.5rem)] bg-richblack-900 grid place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

  return (
    <div className="relative flex min-h-screen font-inter w-screen bg-richblack-900 overflow-x-hidden">
        <Navbar />
        <Sidebar className="fixed left-0 top-14" />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto mt-14">
            <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard
