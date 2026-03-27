const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:4000/api/v1";

// COURSE ENDPOINTS
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

// CONTACT-US ENDPOINTS
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/contact/ContactUs",
};
