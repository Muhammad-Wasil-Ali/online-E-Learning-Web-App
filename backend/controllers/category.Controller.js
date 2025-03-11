import { Category } from "../models/category.Model.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }

    const categoryExist = await Category.findOne({ name });
    if (
      categoryExist &&
      categoryExist.name.toLowerCase() === name.toLowerCase()
    ) {
      return res.status(400).send({
        success: false,
        message: "Category Already exist",
      });
    }
    const category = await Category.create({
      name,
    });

    return res.status(200).send({
      success: true,
      message: "Category Created Successfully",
      category,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};

//======get Single Category

//get Category

export const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "Category Not Exist",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Category Get Successfully",
      category,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};

//=====get All Category Controller
export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length <= 0) {
      return res.status(400).send({
        success: false,
        message: "Category Not Exist",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Categories Get Successfully",
      categories,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};
//===========update Category Controller
export const categoryUpdateController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category does'nt exist",
      });
    }
    if (name) {
      category.name = name;
    }
    await category.save();

    return res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};

//delete Category

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(400).send({
        success: false,
        message: "Category Not Deleted",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};
