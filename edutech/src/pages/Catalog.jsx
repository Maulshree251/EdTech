import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/core/HomePage/Navbar";
import Footer from "../components/core/HomePage/Footer";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";

const Catalog = () => {
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(true);
  const [catalogData, setCatalogData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatalogData = async () => {
      setLoading(true);
      setError(null);
      try {
        const formattedCategoryName = categoryName
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");

        const response = await apiConnector(
          "GET",
          `${categories.CATALOG_PAGE_API}/${encodeURIComponent(formattedCategoryName)}`
        );

        if (response?.data?.success) {
          setCatalogData(response.data.data);
        } else {
          setError("Failed to fetch catalog data");
        }
      } catch (err) {
        console.error("Error fetching catalog data:", err);
        setError("Category not found or server error");
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogData();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-richblack-900 text-white">
        <Navbar />
        <div className="h-14"></div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-yellow-25 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-richblack-300">Loading catalog...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !catalogData) {
    return (
      <div className="flex flex-col min-h-screen bg-richblack-900 text-white">
        <Navbar />
        <div className="h-14"></div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8V12M12 16H12.01" />
            </svg>
            <p className="text-richblack-300 text-lg">{error || "Category not found"}</p>
            <Link to="/">
              <button className="bg-yellow-50 text-richblack-900 px-6 py-2 rounded-md font-semibold hover:scale-105 transition-all">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { category, courses, frequentlyBoughtCourses } = catalogData;

  // Section Heading Component - Figma Design
  const SectionHeading = ({ title, icon }) => (
    <div className="flex items-center gap-3 mb-8">
      {icon}
      <h2 className="text-2xl md:text-3xl font-semibold text-richblack-5">
        {title}
      </h2>
    </div>
  );

  // Course Card Component - Figma Design
  const CourseCard = ({ course }) => {
    const getTagColor = (tagName) => {
      const colors = {
        popular: "bg-orange-100 text-orange-800",
        trending: "bg-red-100 text-red-800",
        new: "bg-green-100 text-green-800",
        "frequently bought": "bg-purple-100 text-purple-800",
      };
      return colors[tagName?.toLowerCase()] || "bg-gray-100 text-gray-800";
    };

    const avgRating =
      course.ratingAndReviews && course.ratingAndReviews.length > 0
        ? (
            course.ratingAndReviews.reduce(
              (sum, r) => sum + (r.rating || 0),
              0
            ) / course.ratingAndReviews.length
          ).toFixed(1)
        : null;

    return (
      <Link to={`/course/${course._id}`}>
        <div className="flex flex-col gap-2 bg-richblack-800 rounded-lg overflow-hidden hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl border border-richblack-700">
          {/* Course Thumbnail */}
          <div className="relative h-48 w-full bg-richblack-700">
            <img
              src={
                course.thumbnail ||
                "https://via.placeholder.com/400x200?text=No+Image"
              }
              alt={course.courseName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
              }}
            />
            {course.tag && course.tag.length > 0 && (
              <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end max-w-[90%]">
                {course.tag.slice(0, 2).map((tag, index) => (
                  <span
                    key={tag._id || index}
                    className={`px-2 py-1 rounded text-xs font-medium ${getTagColor(tag.name)}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Course Info */}
          <div className="p-4 flex flex-col gap-3 flex-grow">
            <h3 className="text-richblack-5 font-semibold text-base md:text-lg line-clamp-2 min-h-[2.5rem]">
              {course.courseName}
            </h3>

            {course.description && (
              <p className="text-richblack-400 text-sm line-clamp-2">
                {course.description}
              </p>
            )}

            {course.instructor && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-richblack-700 border border-richblack-600">
                  <img
                    src={
                      course.instructor.image ||
                      `https://api.dicebear.com/5.x/initials/svg?seed=${course.instructor.firstName}`
                    }
                    alt={course.instructor.firstName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://api.dicebear.com/5.x/initials/svg?seed=${course.instructor.firstName}`;
                    }}
                  />
                </div>
                <span className="text-richblack-300 text-sm">
                  {course.instructor.firstName} {course.instructor.lastName}
                </span>
              </div>
            )}

            <div className="mt-auto pt-3 border-t border-richblack-700 flex justify-between items-center">
              <span className="text-yellow-25 font-bold text-lg">
                ${course.price || "0"}
              </span>
              {avgRating && (
                <div className="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <span className="text-richblack-300 text-sm font-medium">
                    {avgRating}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  // Course Section Component - Figma Design
  const CourseSection = ({ title, courseList, icon }) => {
    if (!courseList || courseList.length === 0) return null;

    return (
      <section className="py-10 border-b border-richblack-700">
        <SectionHeading title={title} icon={icon} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courseList.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-richblack-900 text-white">
      {/* Navbar */}
      <Navbar />
      <div className="h-14"></div>

      {/* Hero Section - Figma Design */}
      <section className="relative bg-gradient-to-br from-blue-900 via-richblack-800 to-richblack-900 py-16 border-b border-richblack-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        <div className="relative w-11/12 max-w-maxContent mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFD60A" strokeWidth="2">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
            <span className="text-yellow-25 text-sm font-medium uppercase tracking-wide">
              Category
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-richblack-5 mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-richblack-300 text-base md:text-lg max-w-3xl leading-relaxed">
              {category.description}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="w-11/12 max-w-maxContent mx-auto py-12 flex-grow">
        {/* New Courses Section */}
        <CourseSection
          title="New to the Library"
          courseList={courses.new}
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          }
        />

        {/* Popular Courses Section */}
        <CourseSection
          title="Popular Courses"
          courseList={courses.popular}
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          }
        />

        {/* Trending Courses Section */}
        <CourseSection
          title="Trending Now"
          courseList={courses.trending}
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
              <path d="M23 6L13.5 15.5L8.5 10.5L1 18" />
              <path d="M17 6H23V12" />
            </svg>
          }
        />

        {/* Frequently Bought in this Category */}
        <CourseSection
          title="Frequently Bought Together"
          courseList={courses.frequentlyBought}
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1H4L6.68 13.39C6.86627 14.2593 7.58915 14.9103 8.46886 15.0072C8.54799 15.0159 8.62761 15.0203 8.70722 15.0203H19.2928C19.3724 15.0203 19.452 15.0159 19.5311 15.0072C20.4109 14.9103 21.1337 14.2593 21.32 13.39L23 6H6" />
            </svg>
          }
        />

        {/* Students Also Bought Section */}
        {frequentlyBoughtCourses && frequentlyBoughtCourses.length > 0 && (
          <section className="py-10 border-t border-richblack-700 mt-8">
            <SectionHeading
              title="Students Also Bought"
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 21.6184 16.5523C20.8581 15.3516 20 15.13" />
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" />
                </svg>
              }
            />
            <p className="text-richblack-400 mb-8 text-sm">
              Explore popular courses that students frequently purchase alongside{" "}
              <span className="text-yellow-25 font-medium">{category.name}</span> courses
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {frequentlyBoughtCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!courses.new?.length &&
          !courses.popular?.length &&
          !courses.trending?.length &&
          !courses.frequentlyBought?.length && (
            <div className="flex flex-col items-center justify-center py-20">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4B5563"
                strokeWidth="1.5"
              >
                <path d="M12 6.253L13.05 17.004L12 22L10.95 17.004L12 6.253Z" />
                <path d="M20 6.253L21.05 17.004L20 22L18.95 17.004L20 6.253Z" />
                <path d="M4 6.253L5.05 17.004L4 22L2.95 17.004L4 6.253Z" />
              </svg>
              <p className="text-richblack-300 text-lg mt-6">
                No courses available in this category yet.
              </p>
              <Link to="/">
                <button className="mt-6 bg-yellow-50 text-richblack-900 px-8 py-3 rounded-md font-semibold hover:scale-105 transition-all duration-200">
                  Explore Other Categories
                </button>
              </Link>
            </div>
          )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Catalog;
