import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { getCategories, getTags } from "../../../../services/operations/CourseBuilderAPI"
import IconBtn from "../../../common/IconBtn"
import { VscArrowRight } from "react-icons/vsc"

const CourseInformationForm = ({ courseInfo, setCourseInfo, updateCourseInfo, goToNext }) => {
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const [categoriesData, tagsData] = await Promise.all([
        getCategories(),
        getTags()
      ])
      setCategories(categoriesData || [])
      setTags(tagsData || [])
      setLoading(false)
    }
    fetchData()
  }, [])

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
    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg"]
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload PNG, JPEG, or JPG images only.")
      return
    }

    // Validate file size (6MB max)
    if (file.size > 6 * 1024 * 1024) {
      toast.error("File size exceeds 6MB. Please upload a smaller image.")
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        // Check aspect ratio (16:9)
        const aspectRatio = img.width / img.height
        if (aspectRatio < 1.7 || aspectRatio > 1.9) {
          toast.warning(`Image aspect ratio should be 16:9. Current: ${img.width}x${img.height}`)
        }
        // Check dimensions (1024x576 recommended)
        if (img.width < 1024 || img.height < 576) {
          toast.warning(`Recommended image size is 1024x576. Current: ${img.width}x${img.height}`)
        }
      }
      img.src = e.target.result

      updateCourseInfo({
        thumbnail: file,
        thumbnailPreview: e.target.result,
      })
    }
    reader.readAsDataURL(file)
  }

  const handleTagChange = (tagId) => {
    const currentTags = courseInfo.tags || []
    if (currentTags.includes(tagId)) {
      updateCourseInfo({
        tags: currentTags.filter((id) => id !== tagId),
      })
    } else {
      if (currentTags.length >= 3) {
        toast.error("You can select maximum 3 tags")
        return
      }
      updateCourseInfo({
        tags: [...currentTags, tagId],
      })
    }
  }

  const handleInstructionChange = (value) => {
    const instructionsArray = value.split("\n").filter((line) => line.trim() !== "")
    updateCourseInfo({ instructions: instructionsArray })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!courseInfo.courseName.trim()) {
      toast.error("Course title is required")
      return
    }
    if (!courseInfo.description.trim()) {
      toast.error("Course description is required")
      return
    }
    if (!courseInfo.whatYouWillLearn.trim()) {
      toast.error("What you will learn is required")
      return
    }
    if (!courseInfo.price) {
      toast.error("Course price is required")
      return
    }
    if (!courseInfo.category) {
      toast.error("Please select a category")
      return
    }
    if (!courseInfo.thumbnail) {
      toast.error("Course thumbnail is required")
      return
    }
    if (courseInfo.tags.length === 0) {
      toast.error("Please select at least one tag")
      return
    }

    goToNext()
  }

  if (loading) {
    return (
      <div className="grid min-h-[400px] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6">
      {/* Course Title */}
      <div className="space-y-2">
        <label htmlFor="courseName" className="text-sm font-medium text-richblack-5">
          Course Title <span className="text-pink-200">*</span>
        </label>
        <input
          type="text"
          id="courseName"
          value={courseInfo.courseName}
          onChange={(e) => updateCourseInfo({ courseName: e.target.value })}
          placeholder="Enter course title"
          className="w-full rounded-md border border-richblack-700 bg-richblack-900 p-3 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50"
        />
        <p className="text-xs text-richblack-400">
          Give your course a descriptive and catchy title
        </p>
      </div>

      {/* Course Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-richblack-5">
          Course Description <span className="text-pink-200">*</span>
        </label>
        <textarea
          id="description"
          value={courseInfo.description}
          onChange={(e) => updateCourseInfo({ description: e.target.value })}
          placeholder="Enter course description"
          rows={4}
          className="w-full resize-none rounded-md border border-richblack-700 bg-richblack-900 p-3 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50"
        />
        <p className="text-xs text-richblack-400">
          Describe what your course is about
        </p>
      </div>

      {/* What You Will Learn */}
      <div className="space-y-2">
        <label htmlFor="whatYouWillLearn" className="text-sm font-medium text-richblack-5">
          What You Will Learn <span className="text-pink-200">*</span>
        </label>
        <textarea
          id="whatYouWillLearn"
          value={courseInfo.whatYouWillLearn}
          onChange={(e) => updateCourseInfo({ whatYouWillLearn: e.target.value })}
          placeholder="Enter what students will learn"
          rows={4}
          className="w-full resize-none rounded-md border border-richblack-700 bg-richblack-900 p-3 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50"
        />
        <p className="text-xs text-richblack-400">
          List the key takeaways from your course
        </p>
      </div>

      {/* Category and Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium text-richblack-5">
            Category <span className="text-pink-200">*</span>
          </label>
          <select
            id="category"
            value={courseInfo.category}
            onChange={(e) => updateCourseInfo({ category: e.target.value })}
            className="w-full rounded-md border border-richblack-700 bg-richblack-900 p-3 text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-50"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label htmlFor="price" className="text-sm font-medium text-richblack-5">
            Price (₹) <span className="text-pink-200">*</span>
          </label>
          <input
            type="number"
            id="price"
            value={courseInfo.price}
            onChange={(e) => updateCourseInfo({ price: e.target.value })}
            placeholder="Enter course price"
            min="0"
            className="w-full rounded-md border border-richblack-700 bg-richblack-900 p-3 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-richblack-5">
          Tags <span className="text-pink-200">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag._id}
              type="button"
              onClick={() => handleTagChange(tag._id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                courseInfo.tags?.includes(tag._id)
                  ? "bg-yellow-50 text-richblack-900"
                  : "bg-richblack-700 text-richblack-300 hover:bg-richblack-600"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
        <p className="text-xs text-richblack-400">
          Select up to 3 tags that describe your course
        </p>
      </div>

      {/* Instructions */}
      <div className="space-y-2">
        <label htmlFor="instructions" className="text-sm font-medium text-richblack-5">
          Instructions (one per line)
        </label>
        <textarea
          id="instructions"
          value={courseInfo.instructions?.join("\n") || ""}
          onChange={(e) => handleInstructionChange(e.target.value)}
          placeholder="Enter course instructions"
          rows={3}
          className="w-full resize-none rounded-md border border-richblack-700 bg-richblack-900 p-3 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50"
        />
        <p className="text-xs text-richblack-400">
          Add any special instructions for students
        </p>
      </div>

      {/* Thumbnail Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-richblack-5">
          Course Thumbnail <span className="text-pink-200">*</span>
        </label>
        <div
          className={`relative flex h-60 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed ${
            dragActive
              ? "border-yellow-50 bg-richblack-700"
              : "border-richblack-600 bg-richblack-900"
          } transition-all duration-200`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {courseInfo.thumbnailPreview ? (
            <div className="relative h-full w-full">
              <img
                src={courseInfo.thumbnailPreview}
                alt="Thumbnail preview"
                className="h-full w-full rounded-md object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200">
                <p className="text-white font-medium">Change Image</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <svg
                className="mb-4 h-12 w-12 text-richblack-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm font-medium text-richblack-5">
                Drag and drop an image, or{" "}
                <span className="text-yellow-50">browse</span>
              </p>
              <p className="mt-2 text-xs text-richblack-400">
                PNG, JPEG, JPG (Max 6MB, 16:9 aspect ratio, 1024x576 recommended)
              </p>
            </div>
          )}
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <IconBtn type="button" onClick={handleSubmit}>
          Next
          <VscArrowRight className="ml-1" />
        </IconBtn>
      </div>
    </form>
  )
}

export default CourseInformationForm
