const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");

router.post(
  "/upload",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  async function (req, res) {
    try {
      const uploadedImages = {};

      // Upload image1
      if (req.files["image1"]) {
        const result1 = await cloudinary.uploader.upload(
          req.files["image1"][0].path
        );
        uploadedImages.image1 = result1;
      }

      // Upload image2
      if (req.files["image2"]) {
        const result2 = await cloudinary.uploader.upload(
          req.files["image2"][0].path
        );
        uploadedImages.image2 = result2;
      }

      res.status(200).json({
        success: true,
        message: "Images uploaded successfully!",
        data: uploadedImages,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error uploading images",
      });
    }
  }
);

module.exports = router;
