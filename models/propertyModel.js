// import mongoose from "mongoose";

// const propertySchema = new mongoose.Schema({
//   // Basic Information
//   propertyName: {
//     type: String,
//     required: [true, 'Property name is required'],
//     trim: true,
//     maxlength: [100, 'Property name cannot exceed 100 characters']
//   },
  
//   propertyDescription: {
//     type: String,
//     required: [true, 'Property description is required'],
//     trim: true,
//     maxlength: [1000, 'Property description cannot exceed 1000 characters']
//   },
  
//   // Location Information
//   address: {
//     type: String,
//     required: [true, 'Address is required'],
//     trim: true
//   },
  
//   city: {
//     type: String,
//     required: [true, 'City is required'],
//     trim: true
//   },
  
//   country: {
//     type: String,
//     required: [true, 'Country is required'],
//     trim: true
//   },
  
//   area: {
//     type: Number,
//     required: [true, 'Area is required'],
//     min: [1, 'Area must be at least 1 sq ft']
//   },
  
//   // Pricing Information
//   rentPrice: {
//     type: Number,
//     required: function() {
//       return !this.salePrice; // Rent price is required if sale price is not provided
//     },
//     min: [0, 'Rent price cannot be negative']
//   },
  
//   salePrice: {
//     type: Number,
//     required: function() {
//       return !this.rentPrice; // Sale price is required if rent price is not provided
//     },
//     min: [0, 'Sale price cannot be negative']
//   },
  
//   // Property Specifications
//   bedrooms: {
//     type: Number,
//     required: [true, 'Number of bedrooms is required'],
//     min: [0, 'Bedrooms cannot be negative'],
//     default: 1
//   },
  
//   bathrooms: {
//     type: Number,
//     required: [true, 'Number of bathrooms is required'],
//     min: [0, 'Bathrooms cannot be negative'],
//     default: 1
//   },
  
//   // Amenities (from the checklist)
//   amenities: {
//     parking: {
//       type: Boolean,
//       default: false
//     },
//     wifi: {
//       type: Boolean,
//       default: false
//     },
//     backyard: {
//       type: Boolean,
//       default: false
//     },
//     terrace: {
//       type: Boolean,
//       default: false
//     }
//   },
  
//   // Additional fields for better functionality
//   propertyType: {
//     type: String,
//     enum: ['apartment', 'Townhouse', 'villa', 'studio'],
//     default: 'apartment'
//   },
  
//   status: {
//     type: String,
//     enum: ['available', 'rented', 'sold', 'maintenance'],
//     default: 'available'
//   },
  
//   images: [{
//     url: String,
//     caption: String
//   }],
  
//   // Timestamps
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
  
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   },
  
//   // Reference to owner/user
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
// }, {
//   timestamps: true // This will automatically manage createdAt and updatedAt
// });

// // Update the updatedAt field before saving
// propertySchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// // Virtual for checking if property is for rent
// propertySchema.virtual('isForRent').get(function() {
//   return this.rentPrice > 0;
// });

// // Virtual for checking if property is for sale
// propertySchema.virtual('isForSale').get(function() {
//   return this.salePrice > 0;
// });

// // Method to get full address
// propertySchema.methods.getFullAddress = function() {
//   return `${this.address}, ${this.city}, ${this.country}`;
// };

// // Static method to find properties by city
// propertySchema.statics.findByCity = function(city) {
//   return this.find({ city: new RegExp(city, 'i') });
// };

// // Static method to find properties by price range
// propertySchema.statics.findByPriceRange = function(minPrice, maxPrice, type = 'rent') {
//   const priceField = type === 'rent' ? 'rentPrice' : 'salePrice';
//   return this.find({
//     [priceField]: { $gte: minPrice, $lte: maxPrice }
//   });
// };

// const Property = mongoose.model('Property', propertySchema);

// module.exports = Property;
















import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  guestsCount: {
  type: Number,
  required: true
  },
  // specialRequests: {
  //   type: String,
  //   maxlength: [500, 'Special requests cannot exceed 500 characters']
  // }
}, {
  timestamps: true
});

// Index for efficient date queries
bookingSchema.index({ startDate: 1, endDate: 1 });

const propertySchema = new mongoose.Schema({
  // Basic Information
  propertyName: {
    type: String,
    required: [true, 'Property name is required'],
    trim: true,
    maxlength: [100, 'Property name cannot exceed 100 characters']
  },
  
  propertyDescription: {
    type: String,
    required: [true, 'Property description is required'],
    trim: true,
    maxlength: [1000, 'Property description cannot exceed 1000 characters']
  },
  
  // Location Information
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  
  area: {
    type: Number,
    required: [true, 'Area is required'],
    min: [1, 'Area must be at least 1 sq ft']
  },
  
  // Pricing Information
  rentPrice: {
    type: Number,
    required: function() {
      return !this.salePrice; // Rent price is required if sale price is not provided
    },
    min: [0, 'Rent price cannot be negative']
  },
  
  salePrice: {
    type: Number,
    required: function() {
      return !this.rentPrice; // Sale price is required if rent price is not provided
    },
    min: [0, 'Sale price cannot be negative']
  },
  
  // Property Specifications
  bedrooms: {
    type: Number,
    required: [true, 'Number of bedrooms is required'],
    min: [0, 'Bedrooms cannot be negative'],
    default: 1
  },
  
  bathrooms: {
    type: Number,
    required: [true, 'Number of bathrooms is required'],
    min: [0, 'Bathrooms cannot be negative'],
    default: 1
  },
  
  maxGuests: {
    type: Number,
    required: true,
    min: [1, 'Maximum guests must be at least 1'],
    default: 4
  },
  
  // Amenities (from the checklist)
  amenities: {
    parking: {
      type: Boolean,
      default: false
    },
    wifi: {
      type: Boolean,
      default: false
    },
    backyard: {
      type: Boolean,
      default: false
    },
    terrace: {
      type: Boolean,
      default: false
    },
  
  },
  
  // Booking and Availability
  bookings: [bookingSchema],
  
  unavailableDates: [{
    startDate: Date,
    endDate: Date,
    reason: {
      type: String,
      enum: ['maintenance', 'owner_use', 'other'],
      default: 'other'
    }
  }],
  
  advanceNotice: {
    type: Number,
    default: 24, // hours notice required for booking
    min: 0
  },
  
  checkInTime: {
    type: String,
    default: '15:00'
  },
  
  checkOutTime: {
    type: String,
    default: '11:00'
  },
  
  minStay: {
    type: Number,
    default: 1, // minimum nights
    min: 1
  },
  
  maxStay: {
    type: Number,
    default: 30, // maximum nights
    min: 1
  },
  
  // Additional fields for better functionality
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'villa', 'studio',],
    default: 'apartment'
  },
  
  status: {
    type: String,
    enum: ['available', 'rented', 'sold', 'maintenance', 'unavailable'],
    default: 'available'
  },
  
  images: [{
    url: String,
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  // Reference to owner/user

}, {
  timestamps: true
});

// Update the updatedAt field before saving
propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for checking if property is for rent
propertySchema.virtual('isForRent').get(function() {
  return this.rentPrice > 0;
});

// Virtual for checking if property is for sale
propertySchema.virtual('isForSale').get(function() {
  return this.salePrice > 0;
});

// Virtual to get confirmed bookings only
propertySchema.virtual('confirmedBookings').get(function() {
  return this.bookings.filter(booking => 
    booking.status === 'confirmed' || booking.status === 'completed'
  );
});

// Method to get full address
propertySchema.methods.getFullAddress = function() {
  return `${this.address}, ${this.city}, ${this.country}`;
};

// Method to check if property is available for given dates
propertySchema.methods.isAvailable = function(startDate, endDate, excludeBookingId = null) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Check if dates are valid
  if (start >= end) {
    return false;
  }
  
  // Check property status
  if (this.status !== 'available') {
    return false;
  }
  
  // Check against confirmed bookings
  const hasConflict = this.bookings.some(booking => {
    if (booking.status !== 'confirmed' && booking.status !== 'completed') {
      return false;
    }
    
    if (excludeBookingId && booking._id.toString() === excludeBookingId.toString()) {
      return false;
    }
    
    const bookingStart = new Date(booking.startDate);
    const bookingEnd = new Date(booking.endDate);
    
    return (start < bookingEnd && end > bookingStart);
  });
  
  if (hasConflict) {
    return false;
  }
  
  // Check against unavailable dates
  const hasUnavailableConflict = this.unavailableDates.some(unavailable => {
    const unavailableStart = new Date(unavailable.startDate);
    const unavailableEnd = new Date(unavailable.endDate);
    
    return (start < unavailableEnd && end > unavailableStart);
  });
  
  return !hasUnavailableConflict;
};

// Method to calculate total price for a booking period
propertySchema.methods.calculateTotalPrice = function(startDate, endDate, guestsCount = 1) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  
  if (nights < this.minStay) {
    throw new Error(`Minimum stay is ${this.minStay} nights`);
  }
  
  if (nights > this.maxStay) {
    throw new Error(`Maximum stay is ${this.maxStay} nights`);
  }
  
  if (guestsCount > this.maxGuests) {
    throw new Error(`Maximum guests allowed is ${this.maxGuests}`);
  }
  
  return this.rentPrice * nights;
};

// Method to add a booking
propertySchema.methods.addBooking = function(bookingData) {
  const { startDate, endDate, guest, guestsCount = 1, specialRequests = '' } = bookingData;
  
  // Check availability
  if (!this.isAvailable(startDate, endDate)) {
    throw new Error('Property is not available for the selected dates');
  }
  
  // Calculate total amount
  const totalAmount = this.calculateTotalPrice(startDate, endDate, guestsCount);
  
  const newBooking = {
    startDate,
    endDate,
    guest,
    guestsCount: typeof guestsCount === 'number' ? { adults: guestsCount } : guestsCount,
    specialRequests,
    totalAmount,
    status: 'pending'
  };
  
  this.bookings.push(newBooking);
  return this.save();
};

// Method to get all bookings for a specific date range
propertySchema.methods.getBookingsInRange = function(startDate, endDate, status = null) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  let filteredBookings = this.bookings.filter(booking => {
    const bookingStart = new Date(booking.startDate);
    const bookingEnd = new Date(booking.endDate);
    
    return (bookingStart < end && bookingEnd > start);
  });
  
  if (status) {
    filteredBookings = filteredBookings.filter(booking => booking.status === status);
  }
  
  return filteredBookings;
};

// Static method to find properties by city
propertySchema.statics.findByCity = function(city) {
  return this.find({ city: new RegExp(city, 'i') });
};

// Static method to find available properties for given dates
propertySchema.statics.findAvailableProperties = async function(startDate, endDate, filters = {}) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const query = {
    status: 'available',
    rentPrice: { $gt: 0 }
  };
  
  // Add filters
  if (filters.city) {
    query.city = new RegExp(filters.city, 'i');
  }
  
  if (filters.minPrice || filters.maxPrice) {
    query.rentPrice = {};
    if (filters.minPrice) query.rentPrice.$gte = filters.minPrice;
    if (filters.maxPrice) query.rentPrice.$lte = filters.maxPrice;
  }
  
  if (filters.bedrooms) {
    query.bedrooms = { $gte: filters.bedrooms };
  }
  
  if (filters.amenities && filters.amenities.length > 0) {
    filters.amenities.forEach(amenity => {
      query[`amenities.${amenity}`] = true;
    });
  }
  
  const properties = await this.find(query);
  
  // Filter properties that are available for the given dates
  return properties.filter(property => property.isAvailable(start, end));
};

// Static method to find properties by price range
propertySchema.statics.findByPriceRange = function(minPrice, maxPrice, type = 'rent') {
  const priceField = type === 'rent' ? 'rentPrice' : 'salePrice';
  return this.find({
    [priceField]: { $gte: minPrice, $lte: maxPrice }
  });
};

export const Property = mongoose.model('Property', propertySchema);

// module.exports = Property;