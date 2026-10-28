
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const File = require("./models/File");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create the uploads directory if it does not exist.
const uploadDirectory = path.join(__dirname, "uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

// Serve uploaded files through URLs.
app.use("/uploads", express.static(uploadDirectory));

// Configure where uploaded files are saved.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);
  },

  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeFilename = `${Date.now()}-${crypto.randomUUID()}${extension}`;

    callback(null, safeFilename);
  },
});

// Accept only common image MIME types.
const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 1,
  },
  fileFilter: (req, file, callback) => {
    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Only JPEG, PNG, GIF, and WebP images are allowed."));
    }
  },
});

// Home route: check whether the API is running.
app.get("/", (req, res) => {
  res.json({
    message: "File / Image Upload API is running!",
  });
});

// Upload one image.
// The form-data field name must be "image".
app.post("/api/upload", upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image to upload.",
      });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const savedFile = await File.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: `uploads/${req.file.filename}`,
      url: fileUrl,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully!",
      file: savedFile,
    });
  } catch (error) {
    // Remove the file if saving its metadata fails.
    if (req.file) {
      await fs.promises.unlink(req.file.path).catch(() => {});
    }

    next(error);
  }
});

// List uploaded file metadata.
app.get("/api/files", async (req, res, next) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.json({ success: true, count: files.length, files });
  } catch (error) {
    next(error);
  }
});

// Get one file's metadata by its MongoDB ID.
app.get("/api/files/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid file ID." });
    }

    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found." });
    }

    res.json({ success: true, file });
  } catch (error) {
    next(error);
  }
});

// Handle upload errors and unexpected server errors.
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;

    return res.status(status).json({
      success: false,
      message:
        err.code === "LIMIT_FILE_SIZE"
          ? "Image must not exceed 5 MB."
          : err.message,
    });
  }

  if (err.message.startsWith("Only JPEG")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  console.error(err);

  res.status(500).json({
    success: false,
    message: "An unexpected server error occurred.",
  });
});

// Connect to MongoDB before starting the server.
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from your .env file.");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB!");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Could not start the server:", error.message);
    process.exit(1);
  }
}

startServer();
