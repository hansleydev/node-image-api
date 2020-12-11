// --------------------- Import Required Modules ---------------------

const multer = require("multer");

// Create Upload Strategy

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single("image");

module.exports = uploadStrategy;
