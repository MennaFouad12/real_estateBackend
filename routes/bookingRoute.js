import express from "express";
import { bookProperty, getAllBookings, updateBookingStatus } from "../controllers/bookingController.js";

import { authenticate, authorizeRoles } from "../middleware/auth.js";

const Bookingrouter = express.Router();

// User books a property
Bookingrouter.get("/", authenticate, getAllBookings);
Bookingrouter.post("/:propertyId/book", authenticate, bookProperty);
Bookingrouter.patch("/:propertyId/bookings/:bookingId/status", authenticate, authorizeRoles("admin"), updateBookingStatus);
export default Bookingrouter;
