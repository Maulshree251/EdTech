import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleChange = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", file)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    }
  }

  const handleRemove = () => {
    // Remove profile picture by sending empty formData
    setLoading(true)
    const formData = new FormData()
    formData.append("displayPicture", "")
    dispatch(updateDisplayPicture(token, formData)).then(() => {
      setLoading(false)
    })
  }

  return (
    <div className="flex items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 px-4 md:p-8 md:px-12 text-richblack-5 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-y-4 gap-x-4 w-full md:w-auto">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="space-y-2 text-center md:text-left">
          <p>Change Profile Picture</p>
          <div className="flex flex-col min-[400px]:flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              onClick={handleChange}
              disabled={loading}
              className="cursor-pointer rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900"
            >
              {loading ? "Uploading..." : "Change"}
            </button>
            <button
              onClick={handleRemove}
              disabled={loading}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
