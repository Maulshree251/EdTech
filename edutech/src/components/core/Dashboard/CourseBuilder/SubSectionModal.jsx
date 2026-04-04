import React, { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { VscClose } from "react-icons/vsc"

const SubSectionModal = ({ modalData, setModalData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    timeDuration: "",
    description: "",
    videoFile: null,
    videoPreview: null,
  })
  const [dragActive, setDragActive] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (modalData.mode === "edit" && modalData.data) {
      setFormData({
        title: modalData.data.title || "",
        timeDuration: modalData.data.timeDuration || "",
        description: modalData.data.description || "",
        videoFile: null,
        videoPreview: null,
      })
    }
  }, [modalData])

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFile = (file) => {
    // Validate file type (video files)
    const validTypes = ["video/mp4", "video/webm", "video/ogg"]
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload MP4, WebM, or OGG videos only.")
      return
    }

    // Validate file size (100MB max for videos)
    if (file.size > 100 * 1024 * 1024) {
      toast.error("File size exceeds 100MB. Please upload a smaller video.")
      return
    }

    // Create preview
    const url = URL.createObjectURL(file)
    setFormData({
      ...formData,
      videoFile: file,
      videoPreview: url,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!formData.title.trim()) {
      toast.error("Lecture title is required")
      return
    }
    if (!formData.timeDuration.trim()) {
      toast.error("Time duration is required")
      return
    }
    if (modalData.mode === "add" && !formData.videoFile) {
      toast.error("Please upload a video file")
      return
    }

    setLoading(true)
    onSubmit({
      ...formData,
      mode: modalData.mode,
      sectionId: modalData.sectionId,
      subsectionId: modalData.data?._id,
    })
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-11/12 max-w-[600px] rounded-lg border border-richblack-700 bg-richblack-800 p-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setModalData(null)}
          className="absolute right-4 top-4 text-richblack-400 hover:text-richblack-200 transition-colors"
        >
          <VscClose className="text-2xl" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-richblack-5">
          {modalData.mode === "add" ? "Add Lecture" : "Edit Lecture"}
        </h2>
        {modalData.sectionName && (
          <p className="mt-1 text-sm text-richblack-400">
            Section: {modalData.sectionName}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Lecture Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-richblack-5">
              Lecture Title <span className="text-pink-200">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter lecture title"
              className="w-full rounded-md border border-richblack-700 bg-richblack-900 p-3 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50"
            />
          </div>

          {/* Time Duration */}
          <div className="space-y-2">
            <label htmlFor="timeDuration" className="text-sm font-medium text-richblack-5">
              Video Duration <span className="text-pink-200">*</span>
            </label>
            <input
              type="text"
              id="timeDuration"
              value={formData.timeDuration}
              onChange={(e) => setFormData({ ...formData, timeDuration: e.target.value })}
              placeholder="e.g., 10h 30m or 15m"
              className="w-full rounded-md border border-richblack-700 bg-richblack-900 p-3 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50"
            />
            <p className="text-xs text-richblack-400">
              Enter the playback duration of the video
            </p>
          </div>

          {/* Video Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-richblack-5">
              Video File {modalData.mode === "add" && <span className="text-pink-200">*</span>}
            </label>
            <div
              className={`relative flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed ${
                dragActive
                  ? "border-yellow-50 bg-richblack-700"
                  : "border-richblack-600 bg-richblack-900"
              } transition-all duration-200`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {formData.videoPreview ? (
                <div className="relative h-full w-full">
                  <video
                    src={formData.videoPreview}
                    controls
                    className="h-full w-full rounded-md object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <p className="text-white font-medium">
                      {modalData.mode === "edit" ? "Change Video" : "Remove & Change"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <svg
                    className="mb-4 h-10 w-10 text-richblack-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-richblack-5">
                    Drag and drop a video, or{" "}
                    <span className="text-yellow-50">browse</span>
                  </p>
                  <p className="mt-2 text-xs text-richblack-400">
                    MP4, WebM, OGG (Max 100MB)
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="video/mp4,video/webm,video/ogg"
                onChange={handleFileChange}
                className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-richblack-5">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter lecture description (optional)"
              rows={3}
              className="w-full resize-none rounded-md border border-richblack-700 bg-richblack-900 p-3 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-x-4">
            <button
              type="button"
              onClick={() => setModalData(null)}
              className="rounded-md bg-richblack-200 py-2 px-5 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95 disabled:opacity-50"
            >
              {loading ? "Saving..." : modalData.mode === "add" ? "Add Lecture" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal
