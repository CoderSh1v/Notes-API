export const errorMiddleware = (error, req, res, next) => {

  // Duplicate key error (unique index)
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];

    return res.status(409).json({
      success: false,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
    });
  }

  // Mongoose validation error
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)[0].message
    return res.status(400).json({
      success: false,
      message
    });
  }

  // Fallback
  return res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error"
  });
};
