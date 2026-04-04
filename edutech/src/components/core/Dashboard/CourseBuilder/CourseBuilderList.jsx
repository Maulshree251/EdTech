import React, { useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { createCourse, createSection, createSubsection, updateSection, deleteSection, updateSubsection, deleteSubsection } from "../../../../services/operations/CourseBuilderAPI"
import IconBtn from "../../../common/IconBtn"
import { VscArrowLeft, VscArrowRight, VscAdd, VscEdit, VscTrash, VscChevronDown, VscChevronRight } from "react-icons/vsc"
import NestedView from "./NestedView"
import SubSectionModal from "./SubSectionModal"

const CourseBuilderList = ({
  courseInfo,
  setCourseInfo,
  courseContent,
  setCourseContent,
  courseId,
  setCourseId,
  goBack,
  goToNext,
}) => {
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Modal state
  const [modalData, setModalData] = useState(null)
  const [subModalData, setSubModalData] = useState(null)

  // Create course and get course ID
  const handleCreateCourse = async () => {
    if (courseId) return courseId

    setLoading(true)
    const result = await createCourse(courseInfo, token)
    setLoading(false)

    if (result) {
      setCourseId(result._id)
      return result._id
    }
    return null
  }

  // Add a new section
  const handleAddSection = async () => {
    const sectionName = prompt("Enter section name:")
    if (!sectionName?.trim()) return

    const currentCourseId = await handleCreateCourse()
    if (!currentCourseId) return

    setLoading(true)
    const result = await createSection({ sectionName, courseId: currentCourseId }, token)
    setLoading(false)

    if (result && result.section) {
      setCourseContent([...courseContent, { ...result.section, subSections: [] }])
      toast.success("Section added successfully")
    }
  }

  // Edit section name
  const handleEditSection = async (section) => {
    const newName = prompt("Edit section name:", section.sectionName)
    if (!newName?.trim() || newName === section.sectionName) return

    setLoading(true)
    const result = await updateSection({ sectionId: section._id, sectionName: newName }, token)
    setLoading(false)

    if (result && result.section) {
      setCourseContent(
        courseContent.map((sec) =>
          sec._id === section._id ? { ...sec, sectionName: newName } : sec
        )
      )
    }
  }

  // Delete section
  const handleDeleteSection = async (sectionId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this section? All lectures in this section will be deleted.")
    if (!confirmDelete) return

    setLoading(true)
    const result = await deleteSection({ sectionId }, token)
    setLoading(false)

    if (result && result.success) {
      setCourseContent(courseContent.filter((sec) => sec._id !== sectionId))
    }
  }

  // Add lecture (subsection)
  const handleAddLecture = (section) => {
    setSubModalData({
      mode: "add",
      sectionId: section._id,
      sectionName: section.sectionName,
    })
  }

  // Edit lecture
  const handleEditLecture = (section, subsection) => {
    setSubModalData({
      mode: "edit",
      sectionId: section._id,
      data: subsection,
    })
  }

  // Delete lecture
  const handleDeleteLecture = async (sectionId, subsectionId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this lecture?")
    if (!confirmDelete) return

    setLoading(true)
    const result = await deleteSubsection({ sectionId, subSectionId: subsectionId }, token)
    setLoading(false)

    if (result && result.success) {
      setCourseContent(
        courseContent.map((sec) =>
          sec._id === sectionId
            ? {
                ...sec,
                subSections: sec.subSections.filter((sub) => sub._id !== subsectionId),
              }
            : sec
        )
      )
    }
  }

  // Handle subsection modal submit
  const handleSubModalSubmit = async (data) => {
    if (data.mode === "add") {
      setLoading(true)
      const result = await createSubsection(
        {
          sectionId: data.sectionId,
          title: data.title,
          timeDuration: data.timeDuration,
          description: data.description,
          videoFile: data.videoFile,
        },
        token
      )
      setLoading(false)

      if (result) {
        setCourseContent(
          courseContent.map((sec) =>
            sec._id === data.sectionId
              ? { ...sec, subSections: [...(sec.subSections || []), result] }
              : sec
          )
        )
        setSubModalData(null)
      }
    } else if (data.mode === "edit") {
      setLoading(true)
      const result = await updateSubsection(
        {
          subsectionId: data.subsectionId,
          title: data.title,
          timeDuration: data.timeDuration,
          description: data.description,
          videoFile: data.videoFile,
        },
        token
      )
      setLoading(false)

      if (result) {
        setCourseContent(
          courseContent.map((sec) =>
            sec._id === data.sectionId
              ? {
                  ...sec,
                  subSections: sec.subSections.map((sub) =>
                    sub._id === data.subsectionId ? { ...sub, ...result } : sub
                  ),
                }
              : sec
          )
        )
        setSubModalData(null)
      }
    }
  }

  // Go to publish step
  const handleGoToPublish = async () => {
    if (courseContent.length === 0) {
      toast.error("Please add at least one section to your course")
      return
    }

    // Check if all sections have at least one lecture
    const hasEmptySections = courseContent.some((sec) => !sec.subSections || sec.subSections.length === 0)
    if (hasEmptySections) {
      const confirm = window.confirm("Some sections don't have any lectures. Continue anyway?")
      if (!confirm) return
    }

    // Create course if not already created
    if (!courseId) {
      await handleCreateCourse()
    }

    goToNext()
  }

  return (
    <div className="space-y-8">
      {/* Info Card */}
      <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
        <h2 className="text-lg font-semibold text-richblack-5">Course Builder</h2>
        <p className="mt-2 text-sm text-richblack-400">
          Build your course content by adding sections and lectures. You can organize your course
          into multiple sections, and each section can contain multiple lectures.
        </p>
      </div>

      {/* Add Section Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-richblack-5">Course Content</h3>
        <button
          onClick={handleAddSection}
          disabled={loading}
          className="flex items-center gap-x-2 rounded-md bg-yellow-50 py-2 px-4 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95 disabled:opacity-50"
        >
          <VscAdd className="text-lg" />
          <span>Add Section</span>
        </button>
      </div>

      {/* Sections List */}
      {courseContent.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-md border border-richblack-700 bg-richblack-800">
          <div className="text-6xl text-richblack-500 mb-4">📑</div>
          <h3 className="text-xl font-semibold text-richblack-5">No Sections Yet</h3>
          <p className="mt-2 text-richblack-400 text-center max-w-md">
            Start building your course by adding your first section
          </p>
          <button
            onClick={handleAddSection}
            className="mt-6 flex items-center gap-x-2 rounded-md bg-yellow-50 py-2 px-4 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95"
          >
            <VscAdd className="text-lg" />
            <span>Add Section</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <NestedView
            courseContent={courseContent}
            onEditSection={handleEditSection}
            onDeleteSection={handleDeleteSection}
            onAddLecture={handleAddLecture}
            onEditLecture={handleEditLecture}
            onDeleteLecture={handleDeleteLecture}
            loading={loading}
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <IconBtn type="button" onClick={goBack}>
          <VscArrowLeft className="mr-1" />
          Back
        </IconBtn>
        <IconBtn type="button" onClick={handleGoToPublish} disabled={loading}>
          Next
          <VscArrowRight className="ml-1" />
        </IconBtn>
      </div>

      {/* Subsection Modal */}
      {subModalData && (
        <SubSectionModal
          modalData={subModalData}
          setModalData={setSubModalData}
          onSubmit={handleSubModalSubmit}
        />
      )}
    </div>
  )
}

export default CourseBuilderList
