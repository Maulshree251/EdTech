import React, { useState } from "react"
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
            <div className='my-5 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12'>
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
            </div>

            <div className='flex justify-end gap-2'>
                <button onClick={() => navigate('/dashboard/my-profile')} className={`rounded-md bg-richblack-700 lg:py-2 py-1 lg:px-5 px-2 font-semibold text-richblack-50
                    ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>Cancel</button>

                <IconBtn type={'submit'} disabled={loading} customClasses={`${loading} lg:py-2 lg:px-5`} text={loading ? 'Updating...' : 'Update'} />
            </div>
        </form>
    )
}