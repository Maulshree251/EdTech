import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../../common/IconBtn"
import { changePassword } from "../../../../services/operations/SettingsAPI"

export default function UpdatePassword() {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    })

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const submitPasswordForm = async (e) => {
        e.preventDefault()

        const hasMinLength = formData.newPassword.length >= 8;
        const hasLower = /[a-z]/.test(formData.newPassword);
        const hasUpper = /[A-Z]/.test(formData.newPassword);
        const hasNumber = /\d/.test(formData.newPassword);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword);
        const isPasswordValid = hasMinLength && hasLower && hasUpper && hasNumber && hasSpecial;

        if (!isPasswordValid) {
            toast.error('Please fulfill all password requirements');
            return;
        }

        if (formData.newPassword !== formData.confirmNewPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true)
        try {
            await changePassword(token, formData)
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
        setLoading(false)
    }

    return (
        <form onSubmit={submitPasswordForm}>
            <div className='my-5 rounded-md border border-richblack-700 bg-richblack-800 p-6 px-4 md:p-8 md:px-12'>
                <h1 className='text-lg mb-6 font-semibold text-richblack-5'>Password</h1>

                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='relative flex flex-col gap-2 w-full lg:w-[48%]'>
                        <label htmlFor="oldPassword" id="oldPasswordLabel" className='label-style'>
                            Current Password <sup className='text-pink-200'>*</sup>
                        </label>
                        <input
                            name='oldPassword'
                            id='oldPassword'
                            placeholder='••••••••••'
                            type={showOldPassword ? 'text' : 'password'}
                            className='form-style !pr-12'
                            value={formData.oldPassword}
                            onChange={handleOnChange}
                            required
                        />

                        <span onClick={() => setShowOldPassword(prev => !prev)} className='absolute right-3 top-[38px] cursor-pointer'>
                            {
                                showOldPassword ?
                                    <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
                                    :
                                    <AiOutlineEye fontSize={24} fill='#AFB2BF' />
                            }
                        </span>
                    </div>

                    <div className='relative flex flex-col gap-2 w-full lg:w-[48%]'>
                        <label htmlFor="newPassword" id="newPasswordLabel" className='label-style'>
                            Change Password <sup className='text-pink-200'>*</sup>
                        </label>
                        <input
                            name='newPassword'
                            id='newPassword'
                            placeholder='••••••••••'
                            type={showNewPassword ? 'text' : 'password'}
                            className='form-style !pr-12'
                            value={formData.newPassword}
                            onChange={handleOnChange}
                            required
                            minLength={6}
                        />

                        <span onClick={() => setShowNewPassword(prev => !prev)} className='absolute right-3 top-[38px] cursor-pointer'>
                            {
                                showNewPassword ?
                                    <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
                                    :
                                    <AiOutlineEye fontSize={24} fill='#AFB2BF' />
                            }
                        </span>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-5 mt-5'>
                    <div className='relative flex flex-col gap-2 w-full lg:w-[48%]'>
                        <label htmlFor="confirmNewPassword" id="confirmNewPasswordLabel" className='label-style'>
                            Confirm Change Password <sup className='text-pink-200'>*</sup>
                        </label>
                        <input
                            name='confirmNewPassword'
                            id='confirmNewPassword'
                            placeholder='••••••••••'
                            type={showConfirmNewPassword ? 'text' : 'password'}
                            className='form-style !pr-12'
                            value={formData.confirmNewPassword}
                            onChange={handleOnChange}
                            required
                            minLength={6}
                        />

                        <span onClick={() => setShowConfirmNewPassword(prev => !prev)} className='absolute right-3 top-[38px] cursor-pointer'>
                            {
                                showConfirmNewPassword ?
                                    <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
                                    :
                                    <AiOutlineEye fontSize={24} fill='#AFB2BF' />
                            }
                        </span>
                    </div>
                </div>

                {/* Password Validation Requirements */}
                <div className="mt-4 grid grid-cols-1 min-[400px]:grid-cols-2 gap-2 text-xs">
                    <div className={`flex items-center gap-1 ${/[a-z]/.test(formData.newPassword) ? 'text-caribbeangreen-300' : 'text-richblack-400'}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17L4 12"/>
                        </svg>
                        one lowercase character
                    </div>
                    <div className={`flex items-center gap-1 ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) ? 'text-caribbeangreen-300' : 'text-richblack-400'}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17L4 12"/>
                        </svg>
                        one special character
                    </div>
                    <div className={`flex items-center gap-1 ${/[A-Z]/.test(formData.newPassword) ? 'text-caribbeangreen-300' : 'text-richblack-400'}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17L4 12"/>
                        </svg>
                        one uppercase character
                    </div>
                    <div className={`flex items-center gap-1 ${formData.newPassword.length >= 8 ? 'text-caribbeangreen-300' : 'text-richblack-400'}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17L4 12"/>
                        </svg>
                        8 character minimum
                    </div>
                    <div className={`flex items-center gap-1 ${/\d/.test(formData.newPassword) ? 'text-caribbeangreen-300' : 'text-richblack-400'}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17L4 12"/>
                        </svg>
                        one number
                    </div>
                </div>
            </div>

            <div className='flex justify-end gap-2 mt-4'>
                <button onClick={() => navigate('/dashboard/my-profile')} className={`rounded-md bg-richblack-700 lg:py-2 py-1 lg:px-5 px-2 font-semibold text-richblack-50
                    ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>Cancel</button>

                <IconBtn type={'submit'} disabled={loading} customClasses={`${loading} lg:py-2 lg:px-5`} text={loading ? 'Updating...' : 'Update'} />
            </div>
        </form>
    )
}