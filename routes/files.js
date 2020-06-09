const express = require("express");
const router = express.Router();
const upload = require("./../config/multerConfig");
const express = require("express");
const {
  getFiles,
  getFile,
  createFile,
  updateFile,
  deleteFile,
} = require("./../controllers/files");

const sendUploadToGCS = require("./../middleware/google-cloud-storage");
const multer = require("./../middleware/multer");
const router = express.Router();

router.post("/upload", multer.single("file"), sendUploadToGCS, createFile);
// router.get("/", getFiles);
// router.get("/:fileId", getFile);
// router.put("/:fileId", updateFile);
// router.delete("/:fileId", deleteFile);

// router.post("/", upload.single("file"), createFile);
router.get("/", getFiles);
router.get("/:fileId", getFile);
// router.put("/:fileId", updateFile);
router.delete("/:fileId", deleteFile);

module.exports = router;
