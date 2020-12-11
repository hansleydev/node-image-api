// --------------------- Import Required Modules ---------------------

const express = require("express");

// Import Upload Strategy

const uploadStrategy = require("../../middleware/uploadStrategy");

// Create Express Router

const router = express.Router();

// --------------------- Create Routes ---------------------

/*
    Route: POST /profile/upload
    Desc: Upload a Profile Picture
    Access: Public
*/

// Import Route Middlware

// Import Route Handlers

const uploadImage = require("../../tasks/uploadImage");

router.post("/", uploadStrategy, async (req, res) => {
  return uploadImage(req, res);
});

module.exports = router;
