import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CourseInformationForm from "./CourseInformationForm"
import CourseBuilderList from "./CourseBuilderList"
import PublishCourse from "./PublishCourse"

const CourseBuilder = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  // Step tracking
  const [step, setStep] = useState(1)

  // Course data state
  const [courseInfo, setCourseInfo] = useState({
    courseName: "",
    description: "",
    whatYouWillLearn: "",
    price: "",
    category: "",
    tags: [],
    thumbnail: null,
    thumbnailPreview: null,
    instructions: [],
    status: "Draft",
  })

  // Course content state (sections and subsections)
  const [courseContent, setCourseContent] = useState([])

  // Course ID for editing
  const [courseId, setCourseId] = useState(null)

  const updateCourseInfo = (data) => {
    setCourseInfo({ ...courseInfo, ...data })
  }

  const goBack = () => {
    setStep((prev) => prev - 1)
  }

  const goToNext = () => {
    setStep((prev) => prev + 1)
  }

  return (
    <div className="text-white space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">Add Course</h1>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-center gap-x-4">
        <div className={`flex items-center gap-x-2 ${step >= 1 ? "text-yellow-50" : "text-richblack-500"}`}>
          <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${step >= 1 ? "border-yellow-50 bg-yellow-50 text-richblack-900" : "border-richblack-500"}`}>
            1
          </div>
          <span className="text-sm font-medium">Course Information</span>
        </div>
        <div className={`h-[2px] w-16 ${step >= 2 ? "bg-yellow-50" : "bg-richblack-700"}`}></div>
        <div className={`flex items-center gap-x-2 ${step >= 2 ? "text-yellow-50" : "text-richblack-500"}`}>
          <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${step >= 2 ? "border-yellow-50 bg-yellow-50 text-richblack-900" : "border-richblack-500"}`}>
            2
          </div>
          <span className="text-sm font-medium">Course Builder</span>
        </div>
        <div className={`h-[2px] w-16 ${step >= 3 ? "bg-yellow-50" : "bg-richblack-700"}`}></div>
        <div className={`flex items-center gap-x-2 ${step >= 3 ? "text-yellow-50" : "text-richblack-500"}`}>
          <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${step >= 3 ? "border-yellow-50 bg-yellow-50 text-richblack-900" : "border-richblack-500"}`}>
            3
          </div>
          <span className="text-sm font-medium">Publish</span>
        </div>
      </div>

      {/* Step Components */}
      {step === 1 && (
        <CourseInformationForm
          courseInfo={courseInfo}
          setCourseInfo={setCourseInfo}
          updateCourseInfo={updateCourseInfo}
          goToNext={goToNext}
        />
      )}
      {step === 2 && (
        <CourseBuilderList
          courseInfo={courseInfo}
          setCourseInfo={setCourseInfo}
          courseContent={courseContent}
          setCourseContent={setCourseContent}
          courseId={courseId}
          setCourseId={setCourseId}
          goBack={goBack}
          goToNext={goToNext}
        />
      )}
      {step === 3 && (
        <PublishCourse
          courseInfo={courseInfo}
          courseContent={courseContent}
          courseId={courseId}
          goBack={goBack}
        />
      )}
    </div>
  )
}

export default CourseBuilder
