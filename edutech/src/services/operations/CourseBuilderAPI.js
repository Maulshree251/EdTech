import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";

// Course endpoints
const COURSE_ENDPOINTS = {
  COURSE_API: "/course/",
};

// Section endpoints
const SECTION_ENDPOINTS = {
  SECTION_API: "/course/addSection",
  UPDATE_SECTION_API: "/course/updateSection",
  DELETE_SECTION_API: "/course/deleteSection",
};

// Subsection endpoints
const SUBSECTION_ENDPOINTS = {
  SUBSECTION_API: "/course/addSubSection",
  UPDATE_SUBSECTION_API: "/course/updateSubSection",
  DELETE_SUBSECTION_API: "/course/deleteSubSection",
};

// Create a new course (Step 1 - Course Information)
export async function createCourse(courseData, token) {
  try {
    const formData = new FormData();

    // Append all course data to form data
    formData.append("courseName", courseData.courseName);
    formData.append("description", courseData.description);
    formData.append("whatYouWillLearn", courseData.whatYouWillLearn);
    formData.append("price", courseData.price);
    formData.append("category", courseData.category);
    formData.append("instructions", JSON.stringify(courseData.instructions || []));
    formData.append("status", courseData.status || "Draft");

    // Append tags
    if (courseData.tags && Array.isArray(courseData.tags)) {
      courseData.tags.forEach((tag) => {
        formData.append("tag", tag);
      });
    }

    // Append thumbnail
    if (courseData.thumbnail) {
      formData.append("thumbnail", courseData.thumbnail);
    }

    const response = await apiConnector("POST", COURSE_ENDPOINTS.COURSE_API + "createCourse", formData, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    });

    console.log("CREATE_COURSE_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Course created successfully");
    return response.data.data;
  } catch (error) {
    console.log("CREATE_COURSE_API ERROR:", error);
    toast.error(error.response?.data?.message || "Failed to create course");
    return null;
  }
}

// Edit course (for publish step)
export async function editCourse(courseData, token) {
  try {
    const formData = new FormData();

    formData.append("courseId", courseData.courseId);
    formData.append("courseName", courseData.courseName);
    formData.append("description", courseData.description);
    formData.append("whatYouWillLearn", courseData.whatYouWillLearn);
    formData.append("price", courseData.price);
    formData.append("instructions", JSON.stringify(courseData.instructions || []));
    formData.append("status", "Published");

    // Append tags
    if (courseData.tags && Array.isArray(courseData.tags)) {
      courseData.tags.forEach((tag) => {
        formData.append("tag", tag);
      });
    }

    // Append thumbnail if changed
    if (courseData.thumbnail) {
      formData.append("thumbnail", courseData.thumbnail);
    }

    const response = await apiConnector("PUT", COURSE_ENDPOINTS.COURSE_API + "editCourse", formData, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    });

    console.log("EDIT_COURSE_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Course published successfully");
    return response.data;
  } catch (error) {
    console.log("EDIT_COURSE_API ERROR:", error);
    toast.error(error.response?.data?.message || "Failed to publish course");
    return null;
  }
}

// Create a section
export async function createSection(sectionData, token) {
  try {
    const response = await apiConnector("POST", SECTION_ENDPOINTS.SECTION_API, sectionData, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    console.log("CREATE_SECTION_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.log("CREATE_SECTION_API ERROR:", error);
    toast.error(error.response?.data?.message || "Failed to create section");
    return null;
  }
}

// Update a section
export async function updateSection(sectionData, token) {
  try {
    const response = await apiConnector("PUT", SECTION_ENDPOINTS.UPDATE_SECTION_API, sectionData, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    console.log("UPDATE_SECTION_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Section updated successfully");
    return response.data;
  } catch (error) {
    console.log("UPDATE_SECTION_API ERROR:", error);
    toast.error(error.response?.data?.message || "Failed to update section");
    return null;
  }
}

// Delete a section
export async function deleteSection(sectionData, token) {
  try {
    const response = await apiConnector("DELETE", SECTION_ENDPOINTS.DELETE_SECTION_API, sectionData, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    console.log("DELETE_SECTION_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Section deleted successfully");
    return response.data;
  } catch (error) {
    console.log("DELETE_SECTION_API ERROR:", error);
    toast.error(error.response?.data?.message || "Failed to delete section");
    return null;
  }
}

// Create a subsection (lecture)
export async function createSubsection(subsectionData, token) {
  try {
    const formData = new FormData();

    formData.append("sectionId", subsectionData.sectionId);
    formData.append("title", subsectionData.title);
    formData.append("timeDuration", subsectionData.timeDuration);
    formData.append("description", subsectionData.description || "");

    if (subsectionData.videoFile) {
      formData.append("videoFile", subsectionData.videoFile);
    }

    const response = await apiConnector("POST", SUBSECTION_ENDPOINTS.SUBSECTION_API, formData, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    });

    console.log("CREATE_SUBSECTION_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Lecture added successfully");
    return response.data.data;
  } catch (error) {
    console.log("CREATE_SUBSECTION_API ERROR:", error);
    toast.error(error.response?.data?.message || "Failed to add lecture");
    return null;
  }
}

// Update a subsection (lecture)
export async function updateSubsection(subsectionData, token) {
  try {
    const formData = new FormData();

    formData.append("subsectionId", subsectionData.subsectionId);

    if (subsectionData.title) formData.append("title", subsectionData.title);
    if (subsectionData.timeDuration) formData.append("timeDuration", subsectionData.timeDuration);
    if (subsectionData.description !== undefined) formData.append("description", subsectionData.description);
    if (subsectionData.videoFile) formData.append("videoFile", subsectionData.videoFile);

    const response = await apiConnector("PUT", SUBSECTION_ENDPOINTS.UPDATE_SUBSECTION_API, formData, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    });

    console.log("UPDATE_SUBSECTION_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Lecture updated successfully");
    return response.data.data;
  } catch (error) {
    console.log("UPDATE_SUBSECTION_API ERROR:", error);
    toast.error(error.response?.data?.message || "Failed to update lecture");
    return null;
  }
}

// Delete a subsection (lecture)
export async function deleteSubsection(subsectionData, token) {
  try {
    const response = await apiConnector("DELETE", SUBSECTION_ENDPOINTS.DELETE_SUBSECTION_API, subsectionData, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    console.log("DELETE_SUBSECTION_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Lecture deleted successfully");
    return response.data;
  } catch (error) {
    console.log("DELETE_SUBSECTION_API ERROR:", error);
    toast.error(error.response?.data?.message || "Failed to delete lecture");
    return null;
  }
}

// Get all categories
export async function getCategories() {
  try {
    const response = await apiConnector("GET", "/course/showAllCategories");
    console.log("GET_CATEGORIES_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    console.log("GET_CATEGORIES_API ERROR:", error);
    return [];
  }
}

// Get all tags
export async function getTags() {
  try {
    const response = await apiConnector("GET", "/course/getAllTags");
    console.log("GET_TAGS_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    console.log("GET_TAGS_API ERROR:", error);
    return [];
  }
}
