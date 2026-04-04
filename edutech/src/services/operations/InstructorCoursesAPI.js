import { apiConnector } from "../apiConnector";
import { instructorCourses } from "../apis";
import { toast } from "react-hot-toast";

const { GET_INSTRUCTOR_COURSES_API, DELETE_COURSE_API } = instructorCourses;

// Get all courses for an instructor
export async function getInstructorCourses(token) {
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("GET_INSTRUCTOR_COURSES_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    console.log("GET_INSTRUCTOR_COURSES_API ERROR:", error);
    toast.error(error.response?.data?.message || "Failed to fetch courses");
    return null;
  }
}

// Delete a course
export async function deleteCourse(courseId, token) {
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, { courseId }, {
      Authorization: `Bearer ${token}`,
    });

    console.log("DELETE_COURSE_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Course deleted successfully");
    return true;
  } catch (error) {
    console.log("DELETE_COURSE_API ERROR:", error);
    toast.error(error.response?.data?.message || "Failed to delete course");
    return false;
  }
}
