const Category = require("../models/Category");
const Course = require("../models/Course");

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

//getCategoryDetails

exports.getCategoryDetails = async (req, res) => {
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