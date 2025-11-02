// import Property from "../models/propertyModel.js";

import { Property } from "../models/propertyModel.js";

// ➕ Add Property (Admin Only)
export const addProperty = async (req, res) => {
  try {
    // Cloudinary URLs come in file.path when using multer-storage-cloudinary
    const imageObjects = req.files?.map((file, index) => ({
      url: file.path, // Cloudinary URL
      caption: file.originalname || `Image ${index + 1}`,
      isPrimary: index === 0 // mark the first one as primary
    })) || [];

    // Create the property
    const newProperty = new Property({
      ...req.body,
      images: imageObjects
    });

    const savedProperty = await newProperty.save();

    res.status(201).json({
      success: true,
      message: "Property added successfully",
      data: savedProperty,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error adding property",
      error: error.message,
    });
  }
};

// 📜 Get All Properties (Public)
export const getAllProperties = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, bedrooms, amenities } = req.query;
    const query = {};

    if (city) query.city = new RegExp(city, "i");
    if (bedrooms) query.bedrooms = { $gte: Number(bedrooms) };

    if (minPrice || maxPrice) {
      query.rentPrice = {};
      if (minPrice) query.rentPrice.$gte = Number(minPrice);
      if (maxPrice) query.rentPrice.$lte = Number(maxPrice);
    }

    if (amenities) {
      const amenityList = Array.isArray(amenities) ? amenities : [amenities];
      amenityList.forEach((a) => (query[`amenities.${a}`] = true));
    }

    const properties = await Property.find(query);
    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔍 Get Single Property (Public)
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✏️ Update Property (Admin Only)
export const updateProperty = async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🗑️ Delete Property (Admin Only)
export const deleteProperty = async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
