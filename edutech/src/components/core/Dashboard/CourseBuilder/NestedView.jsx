import React, { useState } from "react"
import { VscEdit, VscTrash, VscAdd, VscChevronDown, VscChevronRight, VscPlay } from "react-icons/vsc"

const NestedView = ({
  courseContent,
  onEditSection,
  onDeleteSection,
  onAddLecture,
  onEditLecture,
  onDeleteLecture,
  loading,
}) => {
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  return (
    <div className="space-y-4">
      {courseContent.map((section, index) => (
        <div
          key={section._id}
          className="rounded-md border border-richblack-700 bg-richblack-800 overflow-hidden"
        >
          {/* Section Header */}
          <div className="flex items-center justify-between bg-richblack-700 p-4">
            <div className="flex items-center gap-x-4">
              <button
                onClick={() => toggleSection(section._id)}
                className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-richblack-600 transition-colors"
              >
                {expandedSections[section._id] ? (
                  <VscChevronDown className="text-lg text-richblack-300" />
                ) : (
                  <VscChevronRight className="text-lg text-richblack-300" />
                )}
              </button>
              <div className="flex items-center gap-x-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-richblack-500 text-xs font-medium text-richblack-5">
                  {index + 1}
                </span>
                <h4 className="text-base font-semibold text-richblack-5">{section.sectionName}</h4>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <button
                onClick={() => onAddLecture(section)}
                disabled={loading}
                className="flex items-center gap-x-1 rounded-md bg-richblack-600 py-1.5 px-3 text-xs font-medium text-richblack-5 transition-all duration-200 hover:bg-richblack-500 disabled:opacity-50"
                title="Add Lecture"
              >
                <VscAdd className="text-sm" />
                <span className="hidden sm:inline">Add Lecture</span>
              </button>
              <button
                onClick={() => onEditSection(section)}
                disabled={loading}
                className="p-2 rounded-md hover:bg-richblack-600 transition-colors disabled:opacity-50"
                title="Edit Section"
              >
                <VscEdit className="text-lg text-richblack-300" />
              </button>
              <button
                onClick={() => onDeleteSection(section._id)}
                disabled={loading}
                className="p-2 rounded-md hover:bg-richblack-600 transition-colors disabled:opacity-50"
                title="Delete Section"
              >
                <VscTrash className="text-lg text-red-400" />
              </button>
            </div>
          </div>

          {/* Section Content (Lectures) */}
          {expandedSections[section._id] && (
            <div className="border-t border-richblack-700">
              {section.subSections && section.subSections.length > 0 ? (
                <div className="divide-y divide-richblack-700">
                  {section.subSections.map((subsection, subIndex) => (
                    <div
                      key={subsection._id}
                      className="flex items-center justify-between p-4 hover:bg-richblack-700/50 transition-colors"
                    >
                      <div className="flex items-center gap-x-4 flex-1">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-richblack-900 text-xs text-richblack-400">
                          {subIndex + 1}
                        </div>
                        <div className="flex items-center gap-x-3 flex-1">
                          <VscPlay className="text-lg text-richblack-400" />
                          <div className="flex-1">
                            <h5 className="text-sm font-medium text-richblack-5">
                              {subsection.title}
                            </h5>
                            {subsection.timeDuration && (
                              <p className="text-xs text-richblack-400 mt-0.5">
                                Duration: {subsection.timeDuration}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <button
                          onClick={() => onEditLecture(section, subsection)}
                          className="p-2 rounded-md hover:bg-richblack-600 transition-colors"
                          title="Edit Lecture"
                        >
                          <VscEdit className="text-base text-richblack-300" />
                        </button>
                        <button
                          onClick={() => onDeleteLecture(section._id, subsection._id)}
                          className="p-2 rounded-md hover:bg-richblack-600 transition-colors"
                          title="Delete Lecture"
                        >
                          <VscTrash className="text-base text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-8 text-richblack-400">
                  <p className="text-sm">No lectures yet. Click "Add Lecture" to get started.</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default NestedView
