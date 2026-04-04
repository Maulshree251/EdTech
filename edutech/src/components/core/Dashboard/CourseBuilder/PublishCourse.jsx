import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { editCourse } from "../../../../services/operations/CourseBuilderAPI"
import IconBtn from "../../../common/IconBtn"
import { VscArrowLeft, VscCheck } from "react-icons/vsc"

const PublishCourse = ({ courseInfo, courseContent, courseId, goBack }) => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // Additional settings
  const [settings, setSettings] = useState({
    isPublic: true,
    allowReviews: true,
    certificateEnabled: false,
  })

  // Count total lectures
  const totalLectures = courseContent.reduce(
    (acc, section) => acc + (section.subSections?.length || 0),
    0
  )

  // Calculate total duration
  const getTotalDuration = () => {
    let totalMinutes = 0
    courseContent.forEach((section) => {
      section.subSections?.forEach((subsection) => {
        const duration = subsection.timeDuration
        if (duration) {
          const hoursMatch = duration.match(/(\d+)h/)
          const minutesMatch = duration.match(/(\d+)m/)
          if (hoursMatch) totalMinutes += parseInt(hoursMatch[1]) * 60
          if (minutesMatch) totalMinutes += parseInt(minutesMatch[1])
        }
      })
    })
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h ${minutes}m`
  }

  const handlePublish = async () => {
    if (!courseId) {
      toast.error("Course not created yet")
      return
    }

    setLoading(true)

    // Update course status to Published
    const publishData = {
      ...courseInfo,
      courseId,
      status: "Published",
    }

    const result = await editCourse(publishData, token)
    setLoading(false)

    if (result) {
      // Navigate to My Courses page
      navigate("/dashboard/my-courses")
    }
  }

  return (
    <div className="space-y-8">
      {/* Course Preview Card */}
      <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
        <h2 className="text-xl font-semibold text-richblack-5">Course Preview</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thumbnail */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-richblack-400">Thumbnail</label>
            {courseInfo.thumbnailPreview ? (
              <img
                src={courseInfo.thumbnailPreview}
                alt="Course thumbnail"
                className="h-40 w-full rounded-md object-cover"
              />
            ) : (
              <div className="flex h-40 items-center justify-center rounded-md bg-richblack-700 text-richblack-400">
                No thumbnail
              </div>
            )}
          </div>

          {/* Course Info Summary */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-richblack-400">Course Title</label>
              <p className="text-richblack-5 font-medium">{courseInfo.courseName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-richblack-400">Description</label>
              <p className="text-richblack-300 text-sm line-clamp-3">{courseInfo.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-richblack-400">Price</label>
                <p className="text-richblack-5 font-medium">₹{courseInfo.price}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-richblack-400">Total Lectures</label>
                <p className="text-richblack-5 font-medium">{totalLectures}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-richblack-400">Total Sections</label>
                <p className="text-richblack-5 font-medium">{courseContent.length}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-richblack-400">Duration</label>
                <p className="text-richblack-5 font-medium">{getTotalDuration()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What You Will Learn */}
      <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
        <h2 className="text-xl font-semibold text-richblack-5">What You Will Learn</h2>
        <p className="mt-3 whitespace-pre-wrap text-richblack-300 text-sm">
          {courseInfo.whatYouWillLearn}
        </p>
      </div>

      {/* Course Content Summary */}
      <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
        <h2 className="text-xl font-semibold text-richblack-5">Course Content</h2>
        <div className="mt-4 space-y-3">
          {courseContent.map((section, index) => (
            <div key={section._id} className="rounded-md bg-richblack-900 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-richblack-500 text-xs font-medium text-richblack-5">
                    {index + 1}
                  </span>
                  <h4 className="text-sm font-medium text-richblack-5">{section.sectionName}</h4>
                </div>
                <span className="text-xs text-richblack-400">
                  {section.subSections?.length || 0} lectures
                </span>
              </div>
              {section.subSections && section.subSections.length > 0 && (
                <div className="mt-3 space-y-1">
                  {section.subSections.map((subsection, subIndex) => (
                    <div
                      key={subsection._id}
                      className="flex items-center gap-x-3 pl-9 text-xs text-richblack-400"
                    >
                      <span>{subIndex + 1}.</span>
                      <span>{subsection.title}</span>
                      {subsection.timeDuration && (
                        <span className="text-richblack-500">({subsection.timeDuration})</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Settings */}
      <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
        <h2 className="text-xl font-semibold text-richblack-5">Additional Settings</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-richblack-5">Public Visibility</h4>
              <p className="text-xs text-richblack-400 mt-1">
                Make this course visible to students
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.isPublic}
                onChange={() => setSettings({ ...settings, isPublic: !settings.isPublic })}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-richblack-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-yellow-50 peer-checked:after:translate-x-full peer-focus:outline-none"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-richblack-5">Allow Reviews</h4>
              <p className="text-xs text-richblack-400 mt-1">
                Enable students to leave reviews and ratings
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.allowReviews}
                onChange={() => setSettings({ ...settings, allowReviews: !settings.allowReviews })}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-richblack-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-yellow-50 peer-checked:after:translate-x-full peer-focus:outline-none"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-richblack-5">Certificate</h4>
              <p className="text-xs text-richblack-400 mt-1">
                Provide certificate of completion to students
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.certificateEnabled}
                onChange={() =>
                  setSettings({ ...settings, certificateEnabled: !settings.certificateEnabled })
                }
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-richblack-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-yellow-50 peer-checked:after:translate-x-full peer-focus:outline-none"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div className="rounded-md border border-yellow-50/30 bg-yellow-50/10 p-4">
        <div className="flex items-start gap-x-3">
          <svg
            className="mt-0.5 h-5 w-5 text-yellow-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-yellow-50">Important</h4>
            <p className="mt-1 text-xs text-yellow-50/80">
              Once published, your course will be visible to all students. You can still edit the
              course content later. Make sure all your lectures are uploaded and properly organized.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <IconBtn type="button" onClick={goBack}>
          <VscArrowLeft className="mr-1" />
          Back
        </IconBtn>
        <IconBtn type="button" onClick={handlePublish} disabled={loading}>
          {loading ? "Publishing..." : "Publish Course"}
          {!loading && <VscCheck className="ml-1" />}
        </IconBtn>
      </div>
    </div>
  )
}

export default PublishCourse
