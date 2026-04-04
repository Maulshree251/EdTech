const express = require('express');
const router = express.Router();

// Import all controllers
const {
    sendOTP,
    signup,
    login,
    changePassword
} = require('../contollers/Auth');

const {
    updateProfile,
    deleteAccount,
    getAllProfiles,
    updateProfilePicture
} = require('../contollers/Profile');

const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    editCourse,
    deleteCourse,
    getInstructorCourses
} = require('../contollers/Course');

const {
    createCategory,
    showAllCategories,
    getCategoryPageDetails,
    getCatalogPageDetails,
    getCategoryCourses
} = require('../contollers/CategoryController');

const {
    createSection,
    updateSection,
    deleteSection
} = require('../contollers/Section');

const {
    createSubsection,
    updateSubsection,
    deleteSubsection
} = require('../contollers/Subsection');

const {
    createTag,
    getAllTags
} = require('../contollers/Tags');

const {
    capturePayment,
    verifySignature
} = require('../contollers/Payments');

const {
    createRating,
    getaverageRating,
    getAllRating
} = require('../contollers/ratingAndReviewController');

const {
    ContactUs
} = require('../contollers/ContactUs');

const {
    generateToken,
    resetPassword
} = require('../contollers/ResetPassword');

// Import middleware
const {
    auth,
    isStudent,
    isInstructor,
    isAdmin
} = require('../middlewares/auth');

// ==================== AUTH ROUTES ====================
router.post('/auth/sendOTP', sendOTP);
router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.post('/auth/changepassword', auth, changePassword);

// ==================== PROFILE ROUTES ====================
router.put('/profile/updateProfile', auth, updateProfile);
router.delete('/profile/deleteProfile', auth, deleteAccount);
router.get('/profile/getUserDetails', auth, getAllProfiles);
router.put('/profile/updateDisplayPicture', auth, updateProfilePicture);

// ==================== CATEGORY/TAG ROUTES ====================
router.post('/course/createCategory', auth, isAdmin, createCategory);
router.get('/course/showAllCategories', showAllCategories);
router.get('/course/getCategoryPageDetails/:categoryId', getCategoryPageDetails);
router.get('/course/getCatalogPageDetails/:categoryName', getCatalogPageDetails);
router.get('/course/getCategoryCourses/:categoryName', getCategoryCourses);

router.post('/course/createTag', auth, isAdmin, createTag);
router.get('/course/getAllTags', getAllTags);

// ==================== COURSE ROUTES ====================
router.post('/course/createCourse', auth, isInstructor, createCourse);
router.get('/course/getAllCourses', getAllCourses);
router.get('/course/getCourseDetails/:courseId', getCourseDetails);
router.put('/course/editCourse', auth, isInstructor, editCourse);
router.delete('/course/deleteCourse', auth, isInstructor, deleteCourse);
router.get('/course/getInstructorCourses', auth, isInstructor, getInstructorCourses);
//router.put('/course/editCourse',editCourse)

// ==================== SECTION ROUTES ====================
router.post('/course/addSection', auth, isInstructor, createSection);
router.put('/course/updateSection', auth, isInstructor, updateSection);
router.delete('/course/deleteSection', auth, isInstructor, deleteSection);

// ==================== SUBSECTION ROUTES ====================
router.post('/course/addSubSection', auth, isInstructor, createSubsection);
router.put('/course/updateSubSection', auth, isInstructor, updateSubsection);
router.delete('/course/deleteSubSection', auth, isInstructor, deleteSubsection);

// ==================== RATING & REVIEW ROUTES ====================
router.post('/course/createRating', auth, isStudent, createRating);
router.get('/course/getAverageRating', getaverageRating);
router.get('/course/getReviews', getAllRating);

// ==================== PAYMENT ROUTES ====================
router.post('/payment/capturePayment', auth, isStudent, capturePayment);
router.post('/payment/verifySignature', auth, isStudent, verifySignature);

// ==================== RESET PASSWORD ROUTES ====================
router.post('/auth/reset-password-token', generateToken);
router.post('/auth/reset-password', resetPassword);

// ==================== CONTACT US ROUTES ====================
router.post('/contact/ContactUs', ContactUs);

module.exports = router;
