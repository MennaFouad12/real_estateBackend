import { Property } from "../models/propertyModel.js";

export const bookProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { startDate, endDate, guestsCount } = req.body;
    const guestId = req.user.id; // from JWT

    // 1. Find the property
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    // 2. Check availability using your method
    const isAvailable = property.isAvailable(startDate, endDate);
    if (!isAvailable) {
      return res.status(400).json({ success: false, message: "Property not available for these dates" });
    }

    // 3. Calculate total price using your method
    const totalAmount = property.calculateTotalPrice(startDate, endDate, guestsCount);

    // 4. Add booking
    const newBooking = {
      startDate,
      endDate,
      guest: guestId,
      guestsCount,
      totalAmount,
      status: "pending",
    };

    property.bookings.push(newBooking);
    await property.save();

    res.status(201).json({
      success: true,
      message: "Booking request created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      message: "Error while booking property",
      error: error.message,
    });
  }
};


// Approve or cancel a booking
export const updateBookingStatus = async (req, res) => {
  try {
    const { propertyId, bookingId } = req.params;
    const { status } = req.body; // 'confirmed' or 'cancelled'

    if (!['confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    const booking = property.bookings.id(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    booking.status = status;

    await property.save();

    res.status(200).json({
      success: true,
      message: `Booking ${status} successfully`,
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating booking", error: error.message });
  }
};








export const getAllBookings = async (req, res) => {
  try {
    const user = req.user;
    let bookings = [];

    // 🧑‍💼 Admin → get all bookings in all properties
    if (user.role === "admin") {
      const properties = await Property.find()
        .populate("bookings.guest", "firstName lastName email");

      properties.forEach(property => {
        property.bookings.forEach(booking => {
          bookings.push({
            propertyId: property._id,
            propertyName: property.propertyName,
            address: property.getFullAddress(),
            booking
          });
        });
      });
    }

    // 👤 Normal user → get only their bookings
    else {
      const properties = await Property.find({ "bookings.guest": user._id })
        .populate("bookings.guest", "firstName lastName email");

      properties.forEach(property => {
        property.bookings
          .filter(b => b.guest && b.guest._id.toString() === user._id.toString())
          .forEach(booking => {
            bookings.push({
              propertyId: property._id,
              propertyName: property.propertyName,
              address: property.getFullAddress(),
              booking
            });
          });
      });
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: error.message,
    });
  }
}