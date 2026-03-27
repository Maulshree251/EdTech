import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RiEditBoxLine } from 'react-icons/ri'

const MyProfile = () => {
    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate()

  return (
    <div className="text-white flex flex-col gap-10">
        <h1 className="mb-4 text-3xl font-medium text-richblack-5">
            My Profile
        </h1>

        {/* Section 1 */}
        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="flex items-center gap-x-4">
                <img 
                    src={user?.image} 
                    alt={`profile-${user?.firstName}`} 
                    className="aspect-square w-[75px] rounded-full object-cover" 
                />
                <div className="space-y-1">
                    <p className="text-lg font-semibold text-richblack-5">
                        {user?.firstName + " " + user?.lastName}
                    </p>
                    <p className="text-sm text-richblack-300">
                        {user?.email}
                    </p>
                </div>
            </div>
            <button 
                onClick={() => navigate("/dashboard/settings")}
                className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95"
            >
                <div>Edit</div>
                <RiEditBoxLine />
            </button>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col gap-y-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-richblack-5">About</p>
                <button 
                    onClick={() => navigate("/dashboard/settings")}
                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95"
                >
                    <div>Edit</div>
                    <RiEditBoxLine />
                </button>
            </div>
            <p className={`${user?.additionalDetails?.about ? "text-richblack-5" : "text-richblack-400"} text-sm font-medium`}>
                {user?.additionalDetails?.about ?? "Write Something About Yourself"}
            </p>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col gap-y-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="flex justify-between items-center bg-richblack-800">
                <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
                <button 
                    onClick={() => navigate("/dashboard/settings")}
                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95"
                >
                    <div>Edit</div>
                    <RiEditBoxLine />
                </button>
            </div>
            
            <div className="grid grid-cols-2 max-w-[500px] gap-y-4 pt-3">
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-richblack-400">First Name</p>
                    <p className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-richblack-400">Last Name</p>
                    <p className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-richblack-400">Email</p>
                    <p className="text-sm font-medium text-richblack-5">{user?.email}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-richblack-400">Phone Number</p>
                    <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-richblack-400">Gender</p>
                    <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-richblack-400">Date Of Birth</p>
                    <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"}</p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default MyProfile
