
const Category = require("../models/Category");
const Course = require("../models/Course");
const Tags = require("../models/Tags");

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: "Category already exists"
            });
        }

        // Create new category
        const newCategory = await Category.create({
            name,
            description
        });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: newCategory
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error creating category",
            error: error.message
        });
    }
};

// Get all categories
exports.showAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
            .populate("courses")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: categories
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching categories",
            error: error.message
        });
    }
};

// Get category page details by category name (for catalog page)
exports.getCatalogPageDetails = async (req, res) => {
    try {
        // Get category name from URL parameters
        const { categoryName } = req.params;

        // Validate categoryName
        if (!categoryName) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        // Find category by name (case-insensitive)
        const category = await Category.findOne({
            name: { $regex: new RegExp(`^${categoryName}$`, 'i') }
        }).exec();

        // Validation
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // Get all courses for this category with populated tags
        const allCategoryCourses = await Course.find({ Category: category._id })
            .populate("tag")
            .populate("instructor", "firstName lastName image")
            .populate("ratingAndReviews")
            .exec();

        // Segregate courses by tags
        const coursesByTag = {
            popular: [],
            trending: [],
            new: [],
            frequentlyBought: []
        };

        // Helper function to check if a course has a specific tag
        const hasTag = (course, tagName) => {
            return course.tag?.some(t =>
                t.name?.toLowerCase() === tagName.toLowerCase()
            );
        };

        // Categorize courses by their tags
        allCategoryCourses.forEach(course => {
            if (hasTag(course, 'popular')) {
                coursesByTag.popular.push(course);
            }
            if (hasTag(course, 'trending')) {
                coursesByTag.trending.push(course);
            }
            if (hasTag(course, 'new')) {
                coursesByTag.new.push(course);
            }
            if (hasTag(course, 'frequently bought')) {
                coursesByTag.frequentlyBought.push(course);
            }
        });

        // Get all courses that are frequently bought (across all categories)
        const allFrequentlyBoughtCourses = await Course.find({})
            .populate("tag")
            .populate("instructor", "firstName lastName image")
            .populate("ratingAndReviews")
            .exec();

        const frequentlyBoughtWithCategory = allFrequentlyBoughtCourses.filter(course =>
            hasTag(course, 'frequently bought')
        );

        // Return response
        return res.status(200).json({
            success: true,
            message: "Catalog page details fetched successfully",
            data: {
                category: {
                    name: category.name,
                    description: category.description,
                    _id: category._id
                },
                courses: coursesByTag,
                frequentlyBoughtCourses: frequentlyBoughtWithCategory
            }
        });
    } catch (err) {
        console.error("Error in getCatalogPageDetails:", err);
        return res.status(500).json({
            success: false,
            message: "Error fetching catalog page details",
            error: err.message
        });
    }
};

// Get all courses for a specific category (simpler endpoint)
exports.getCategoryCourses = async (req, res) => {
    try {
        const { categoryName } = req.params;

        const category = await Category.findOne({
            name: { $regex: new RegExp(`^${categoryName}$`, 'i') }
        }).exec();

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        const courses = await Course.find({ Category: category._id })
            .populate("tag")
            .populate("instructor", "firstName lastName image")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Category courses fetched successfully",
            data: courses
        });
    } catch (err) {
        console.error("Error in getCategoryCourses:", err);
        return res.status(500).json({
            success: false,
            message: "Error fetching category courses",
            error: err.message
        });
    }
};

//getCategoryDetails

exports.getCategoryPageDetails = async (req, res) => {
    try {
        // Get category id from URL parameters
        const { categoryId } = req.params;

        // Validate categoryId
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required"
            });
        }

        // Get courses for specific category
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();

        // Validation
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // Get courses for different categories
        const differentCategories = await Category.find({
            _id: { $ne: categoryId }
        }).populate("courses").exec();

        // Return response 
        return res.status(200).json({
            success: true,
            message: "Category details fetched successfully",
            data: {
                selectedCategory,
                differentCategories
            }
        });
    } catch (err) {
        console.error("Error in getCategoryDetails:", err);
        return res.status(500).json({
            success: false,
            message: "Error fetching category details",
            error: err.message
        });
    }
};

