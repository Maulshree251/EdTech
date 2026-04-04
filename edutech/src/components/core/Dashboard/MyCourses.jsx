import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getInstructorCourses, deleteCourse } from "../../../services/operations/InstructorCoursesAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import { VscAdd, VscEdit, VscTrash } from "react-icons/vsc"

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      const result = await getInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    }
    fetchCourses()
  }, [token])

  const handleDeleteCourse = async (courseId) => {
    setLoading(true)
    const success = await deleteCourse(courseId, token)
    if (success) {
      setCourses((prev) => prev.filter((course) => course._id !== courseId))
    }
    setLoading(false)
    setConfirmationModal(null)
  }

  const getCourseDuration = (course) => {
    // Calculate total duration from sections and subsections
    if (!course.courseContent || course.courseContent.length === 0) {
      return "0h 0m"
    }

    let totalMinutes = 0
    course.courseContent.forEach((section) => {
      if (section.subSections) {
        section.subSections.forEach((subSection) => {
          // Assuming timeDuration is in format "Xh Ym" or just minutes
          const duration = subSection.timeDuration
          if (duration) {
            if (typeof duration === "string") {
              const hoursMatch = duration.match(/(\d+)h/)
              const minutesMatch = duration.match(/(\d+)m/)
              if (hoursMatch) totalMinutes += parseInt(hoursMatch[1]) * 60
              if (minutesMatch) totalMinutes += parseInt(minutesMatch[1])
            } else if (typeof duration === "number") {
              totalMinutes += duration
            }
          }
        })
      }
    })

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h ${minutes}m`
  }

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="text-white space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <button
          onClick={() => navigate("/dashboard/add-course")}
          className="flex items-center gap-x-2 rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95"
        >
          <VscAdd className="text-lg" />
          <span>New</span>
        </button>
      </div>

      {/* Courses List */}
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-md border border-richblack-700 bg-richblack-800">
          <div className="text-6xl text-richblack-500 mb-4">📚</div>
          <h3 className="text-xl font-semibold text-richblack-5">No Courses Yet</h3>
          <p className="mt-2 text-richblack-400 text-center max-w-md">
            Start creating your first course and share your knowledge with the world!
          </p>
          <button
            onClick={() => navigate("/dashboard/add-course")}
            className="mt-6 flex items-center gap-x-2 rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95"
          >
            <VscAdd className="text-lg" />
            <span>Create Course</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Table Header */}
          <div className="hidden lg:grid grid-cols-[1fr_2fr_1fr_1fr_120px] gap-4 rounded-md bg-richblack-800 p-4 border border-richblack-700 text-sm font-medium text-richblack-300">
            <div>Course</div>
            <div>Duration</div>
            <div>Price</div>
            <div>Students</div>
            <div className="text-center">Actions</div>
          </div>

          {/* Course Cards */}
          {courses.map((course, index) => (
            <div
              key={course._id}
              className={`grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr_1fr_120px] gap-4 rounded-md border border-richblack-700 bg-richblack-800 p-4 items-center ${
                index !== courses.length - 1 ? "mb-4" : ""
              }`}
            >
              {/* Course Info */}
              <div className="flex items-center gap-x-4">
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="h-14 w-20 rounded-md object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/80x56?text=No+Image"
                  }}
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-sm font-semibold text-richblack-5 line-clamp-2">
                    {course.courseName}
                  </h3>
                  <p className="text-xs text-richblack-300 line-clamp-1 mt-1">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="text-sm text-richblack-300">
                <span className="lg:hidden font-medium text-richblack-5">Duration: </span>
                {getCourseDuration(course)}
              </div>

              {/* Price */}
              <div className="text-sm text-richblack-300">
                <span className="lg:hidden font-medium text-richblack-5">Price: </span>
                {course.price ? `₹${course.price}` : "Free"}
              </div>

              {/* Students Enrolled */}
              <div className="text-sm text-richblack-300">
                <span className="lg:hidden font-medium text-richblack-5">Students: </span>
                {course.studentsEnrolled?.length || 0}
              </div>

              {/* Actions */}
              <div className="flex lg:justify-center gap-x-3">
                <button
                  onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                  className="p-2 rounded-md hover:bg-richblack-700 transition-all duration-200"
                  title="Edit Course"
                >
                  <VscEdit className="text-lg text-richblack-300 hover:text-yellow-50" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Are you sure?",
                      text2: "This course will be permanently deleted.",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteCourse(course._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                  className="p-2 rounded-md hover:bg-richblack-700 transition-all duration-200"
                  title="Delete Course"
                >
                  <VscTrash className="text-lg text-richblack-300 hover:text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default MyCourses
