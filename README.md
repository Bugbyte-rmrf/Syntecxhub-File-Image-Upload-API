# Syntecxhub Project 3 — File / Image Upload API

A RESTful API built with **Node.js, Express.js, MongoDB, Mongoose, and Multer** for uploading images, storing file metadata, retrieving uploaded-file records, and serving uploaded images.

This project was developed as part of the Syntecxhub project assignment. It demonstrates backend API development, multipart file uploads, database integration, request validation, API testing, and GitHub project management.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Objectives](#2-objectives)
3. [Features](#3-features)
4. [Technology Stack](#4-technology-stack)
5. [Development Environment](#5-development-environment)
6. [Project Structure](#6-project-structure)
7. [Prerequisites](#7-prerequisites)
8. [Installation and Setup](#8-installation-and-setup)
9. [Environment Configuration](#9-environment-configuration)
10. [Running the API](#10-running-the-api)
11. [API Documentation](#11-api-documentation)
12. [File Upload Validation](#12-file-upload-validation)
13. [Postman Collection and Testing](#13-postman-collection-and-testing)
14. [Testing with cURL](#14-testing-with-curl)
15. [Database and File Storage](#15-database-and-file-storage)
16. [Error Handling and Troubleshooting](#16-error-handling-and-troubleshooting)
17. [Security Considerations](#17-security-considerations)
18. [Git and GitHub Submission](#18-git-and-github-submission)
19. [Project Status and Final Checklist](#19-project-status-and-final-checklist)
20. [Author and Acknowledgements](#20-author-and-acknowledgements)

---

## 1. Project Overview

The File / Image Upload API provides endpoints for uploading images, retrieving stored file information, and accessing uploaded images through HTTP URLs.

The application separates physical file storage from database metadata:

- **Local storage:** Uploaded image files are saved in the `uploads/` directory.
- **MongoDB:** File details are stored as database documents using Mongoose.
- **Express.js:** Handles HTTP requests, routes, middleware, and responses.
- **Multer:** Processes `multipart/form-data` requests and manages uploaded files.

The API is designed to be tested using Postman or cURL.

## 2. Objectives

The objectives of this project are to:

- Build a REST API using Node.js and Express.js.
- Implement image uploads using Multer.
- Validate uploaded image types and file sizes.
- Store file metadata in MongoDB.
- Retrieve all uploaded-file records.
- Retrieve a single file record using its MongoDB ID.
- Serve uploaded images through static URLs.
- Test successful requests and invalid inputs.
- Organize the project for version control and GitHub submission.

## 3. Features

- Image upload through a REST API.
- Support for JPEG, JPG, PNG, GIF, and WebP images, subject to server validation.
- Maximum permitted upload size of 5 MB.
- Automatically generated filenames to reduce filename collisions.
- File metadata persistence using MongoDB and Mongoose.
- Endpoint for listing uploaded files.
- Endpoint for retrieving a single file record.
- Static access to uploaded images.
- JSON responses containing upload results and file metadata.
- Environment-based configuration for sensitive settings.
- Postman and cURL testing support.

> Note: This project implements file and image operations. It should not be described as a full Product CRUD API unless product-specific routes and models are added separately.

## 4. Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime for the backend |
| Express.js | HTTP server and API routing |
| MongoDB | Database for file metadata |
| Mongoose | MongoDB object modelling |
| Multer | Multipart file upload handling |
| dotenv | Environment variable configuration |
| Postman | API testing and request organization |
| cURL | Command-line API testing |
| Git | Version control |
| GitHub | Repository hosting and submission |

## 5. Development Environment

The project was developed and tested using a Linux environment.

- Operating system: Linux
- Terminal: Linux shell
- Code editor: Visual Studio Code (VS Code)
- API testing: Postman Web with the Postman Desktop Agent
- Alternative upload testing: cURL
- Backend runtime: Node.js
- Database: MongoDB

The Postman Desktop Agent is used to enable Postman Web to send requests to a locally running API. The API can also be tested independently with cURL.

## 6. Project Structure

The following is the intended project structure. Confirm the actual filenames in your repository before submission.

```text
Syntecxhub_Project_3/
│
├── models/
│   └── File.js
│
├── uploads/
│   └── .gitkeep
│
├── node_modules/
│   └── (installed dependencies; not committed)
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

### Directory and file descriptions

| File or directory | Description |
|---|---|
| `server.js` | Express application, database connection, upload handling, routes, and middleware |
| `models/File.js` | Mongoose schema and model for file metadata |
| `uploads/` | Local directory where uploaded files are stored |
| `.env` | Environment variables, including the database connection string |
| `.gitignore` | Excludes secrets, dependencies, and generated files from Git |
| `package.json` | Project metadata, dependencies, and npm scripts |
| `package-lock.json` | Locks dependency versions for reproducible installation |
| `README.md` | Project documentation |
| `uploads/.gitkeep` | Optional placeholder to preserve the empty uploads directory in Git |

**Important:** The `uploads/` directory should exist before the first upload. If the directory is created automatically by the application, document that behaviour according to your actual implementation.

The `node_modules/` and `.env` entries should be excluded from Git. Uploaded images can contain personal or private information, so do not commit them by default.

## 7. Prerequisites

Before running the project, install or configure:

1. Node.js and npm.
2. MongoDB, either locally or through MongoDB Atlas.
3. Git.
4. Visual Studio Code or another code editor.
5. Postman Web and the Desktop Agent, or an alternative HTTP client.

Verify Node.js and npm:

```bash
node --version
npm --version
```

Verify Git:

```bash
git --version
```

If these commands return version numbers, the corresponding tools are available in your terminal.

## 8. Installation and Setup

### Step 1: Open the project directory

Open the project folder in VS Code.

Alternatively, use the terminal:

```bash
cd /path/to/Syntecxhub_Project_3
```

Replace the example path with your actual project directory.

### Step 2: Install dependencies

Run:

```bash
npm install
```

This installs the dependencies declared in `package.json`.

The project should include the packages required by the implementation, such as Express, Mongoose, Multer, and dotenv.

### Step 3: Configure MongoDB

Create or identify a MongoDB database for the project.

If using MongoDB Atlas, obtain the connection string from your database configuration. If using a local MongoDB instance, use the appropriate local connection string.

Do not publish database credentials or connection strings containing passwords.

### Step 4: Create the environment file

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Replace the placeholder with your actual MongoDB connection string.

The variable names must match those referenced by `server.js`. If your implementation uses a different name, update the example to match the code.

### Step 5: Check the npm scripts

Open `package.json` and verify the available scripts.

For example, a development script may look like:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

This is an example configuration, not a replacement for the existing `package.json`. The `dev` script requires `nodemon` to be installed.

## 9. Environment Configuration

The application uses environment variables to keep configuration separate from source code.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### Recommended `.gitignore`

```gitignore
node_modules/
.env
uploads/*
!uploads/.gitkeep
npm-debug.log*
.DS_Store
```

This configuration excludes uploaded files but preserves the directory placeholder.

If your application generates other local files, add appropriate ignore rules. Do not ignore source code, model files, the README, or the lockfile.

Before committing, check:

```bash
git status --short
```

Confirm that `.env`, `node_modules/`, and private uploaded files are not staged for commit.

## 10. Running the API

### Start the server

If the `dev` script exists:

```bash
npm run dev
```

Otherwise, if the `start` script is configured:

```bash
npm start
```

Or run the server directly:

```bash
node server.js
```

Use the command supported by your `package.json`.

The application should listen on the configured port, which is `5000` in the examples in this README.

### Verify the server

Open Postman or run:

```bash
curl -i http://localhost:5000/
```

Expected response body:

```json
{
  "message": "File / Image Upload API is running!"
}
```

The precise HTTP status and response body should match your implementation.

## 11. API Documentation

Base URL for local development:

```text
http://localhost:5000
```

### Endpoint summary

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Check whether the API is running |
| POST | `/api/upload` | Upload an image |
| GET | `/api/files` | Retrieve all file records |
| GET | `/api/files/:id` | Retrieve one file record by ID |
| GET | `/uploads/:filename` | Access an uploaded file |

The last endpoint is provided by Express static-file middleware rather than a separate metadata route.

### 11.1 Health Check

**Method:** GET

**Endpoint:**

```text
http://localhost:5000/
```

Purpose: Confirm that the Express server is running.

Example response:

```json
{
  "message": "File / Image Upload API is running!"
}
```

### 11.2 Upload an Image

**Method:** POST

**Endpoint:**

```text
http://localhost:5000/api/upload
```

**Content type:** `multipart/form-data`

**Required form field:** `image`

Example request using Postman:

1. Select `POST`.
2. Enter the upload endpoint.
3. Open **Body → form-data**.
4. Enter `image` as the field key.
5. Change the field type from `Text` to `File`.
6. Select an image file.
7. Click **Send**.

Do not manually set the multipart `Content-Type` header. Postman must generate the header and its boundary.

Example successful response based on the implemented API:

```json
{
  "success": true,
  "message": "Image uploaded successfully!",
  "file": {
    "filename": "generated-filename.png",
    "originalName": "test-image.png",
    "path": "uploads/generated-filename.png",
    "url": "http://localhost:5000/uploads/generated-filename.png",
    "mimetype": "image/png",
    "size": 713,
    "_id": "example-mongodb-id",
    "createdAt": "2026-10-28T15:55:16.933Z",
    "updatedAt": "2026-10-28T15:55:16.933Z"
  }
}
```

The filename, MongoDB ID, and timestamps are generated values. The example illustrates the response structure and is not a real file record to reuse.

### 11.3 Retrieve All Files

**Method:** GET

**Endpoint:**

```text
http://localhost:5000/api/files
```

Purpose: Retrieve the file metadata records stored in MongoDB.

The response should contain the file records returned by your controller. Confirm the exact response structure in your implementation.

### 11.4 Retrieve One File

**Method:** GET

**Endpoint:**

```text
http://localhost:5000/api/files/:id
```

Replace `:id` with a valid MongoDB document ID returned by the upload endpoint or the list endpoint.

For example:

```text
http://localhost:5000/api/files/6ae21ae4b3304599315fcdb1
```

Purpose: Retrieve metadata for one stored file.

### 11.5 Access an Uploaded Image

**Method:** GET

**URL pattern:**

```text
http://localhost:5000/uploads/:filename
```

Use the `url` or `filename` returned by the upload endpoint.

For example, a generated image URL can be opened directly in a browser if static serving is configured correctly.

This endpoint serves the image file. It is different from the metadata endpoint `/api/files/:id`.

## 12. File Upload Validation

The upload implementation is intended to enforce the following rules:

| Validation | Expected behaviour |
|---|---|
| Missing file | Reject the request and return an explanatory error |
| Unsupported file type | Reject the upload |
| File larger than 5 MB | Reject the upload |
| Valid image | Store the image and its metadata |
| Valid MongoDB ID with no matching record | Return a not-found response |
| Invalid MongoDB ID format | Return a validation or bad-request response |

Supported image types:

- JPEG / JPG
- PNG
- GIF
- WebP

The maximum upload size is 5 MB, subject to the limit configured in Multer.

Validation tests should confirm the actual status codes and response messages returned by the server. Do not claim a test passed until it has been executed successfully.

## 13. Postman Collection and Testing

Postman is used to organize, execute, and verify the API requests.

Suggested collection name:

```text
Syntecxhub Project 3 - File / Image Upload API
```

Suggested environment name:

```text
Syntecxhub Project 3 - Local Environment
```

Suggested environment variables:

| Variable | Initial value |
|---|---|
| `baseUrl` | `http://localhost:5000` |
| `fileId` | Set after a successful upload |
| `imageUrl` | Set after a successful upload |

Use `{{baseUrl}}` in request URLs where appropriate.

### Recommended collection and folder structure

```text
Syntecxhub Project 3 - File / Image Upload API
│
├── 01 - Health Check
│   └── GET Health Check
│
├── 02 - File Upload
│   └── POST Upload Image
│
├── 03 - Retrieve Files
│   ├── GET All Files
│   ├── GET File By ID
│   └── GET Uploaded Image
│
└── 04 - Validation Tests
    ├── POST Upload Without File
    ├── POST Upload Unsupported File Type
    ├── POST Upload File Larger Than 5 MB
    ├── GET File With Invalid ID
    └── GET Nonexistent File
```

The folder names are a recommended organization for the collection. Create the requests in Postman and save them under the appropriate folders.

### Request 1: GET Health Check

```text
GET {{baseUrl}}/
```

Purpose: Verify that the API is running.

Expected: A successful response containing the API status message.

### Request 2: POST Upload Image

```text
POST {{baseUrl}}/api/upload
```

Body configuration:

```text
Body → form-data

Key: image
Type: File
Value: Select a real image file
```

Expected: A successful upload response containing file metadata and a URL.

### Request 3: GET All Files

```text
GET {{baseUrl}}/api/files
```

Purpose: Verify that the API retrieves the stored file records.

Expected: A response containing the uploaded image's metadata if the database connection and retrieval logic are functioning.

### Request 4: GET File By ID

```text
GET {{baseUrl}}/api/files/{{fileId}}
```

Purpose: Retrieve one record using its MongoDB ID.

Set `fileId` to a real ID from a successful upload response.

### Request 5: GET Uploaded Image

Use:

```text
GET {{imageUrl}}
```

Set `imageUrl` to the URL returned by a successful upload.

Expected: The server returns the image rather than a JSON metadata record, provided the static route is working.

### Request 6: POST Upload Without File

```text
POST {{baseUrl}}/api/upload
```

Body configuration:

- Select **Body → form-data**.
- Leave the body empty, or disable/remove the `image` row.
- Send the request.

Expected: The API rejects the request because no image was provided.

### Request 7: POST Upload Unsupported File Type

```text
POST {{baseUrl}}/api/upload
```

Body configuration:

- Select **Body → form-data**.
- Add the key `image`.
- Set the type to `File`.
- Select an unsupported file, such as a `.txt` file.

Expected: The API rejects the unsupported file type.

### Request 8: POST Upload File Larger Than 5 MB

```text
POST {{baseUrl}}/api/upload
```

Body configuration:

- Select **Body → form-data**.
- Add the key `image`.
- Set the type to `File`.
- Select an image larger than 5 MB.

Expected: The API rejects the file because it exceeds the configured size limit.

If no large test image is available, create one or leave this test pending until a suitable file is available.

### Request 9: GET File With Invalid ID

```text
GET {{baseUrl}}/api/files/invalid-id
```

Purpose: Verify that the API handles an invalid MongoDB ID format.

Expected: A controlled error response rather than an unhandled server failure.

### Request 10: GET Nonexistent File

```text
GET {{baseUrl}}/api/files/000000000000000000000000
```

Purpose: Test a validly formatted MongoDB ID that should not correspond to an existing record.

Expected: A not-found response if no record exists with that ID.

### Postman Web and Desktop Agent notes

During development, Postman Web was used with the Postman Desktop Agent to send requests to `localhost`.

The image file selection interface did not reliably retain the selected file in the request body. This produced a missing-file or file-path error in Postman.

The API itself was independently tested using cURL, and the image upload succeeded. Therefore, the successful cURL upload confirms that the server can receive and store an image, but the Postman Web upload request should still be verified before the submission is considered fully tested in Postman.

For Postman uploads:

- Use the Desktop Agent and confirm it is connected.
- Use `Body → form-data`.
- Set the `image` field type to `File`.
- Select a real file using the file picker.
- Do not type a filesystem path into a text field.
- Do not manually set the multipart `Content-Type` header.
- Confirm that the filename remains visible in the request before sending.

## 14. Testing with cURL

cURL provides an alternative way to test the API directly from the Linux terminal.

### Health check

```bash
curl -i http://localhost:5000/
```

### Upload an image

The following command was successfully used during development:

```bash
curl -X POST http://localhost:5000/api/upload \
  -F "image=@$HOME/Downloads/test-image.png"
```

Successful response observed during development:

```json
{
  "success": true,
  "message": "Image uploaded successfully!",
  "file": {
    "filename": "1793202916828-6f8ad04f-961c-4f81-a21a-7d9e3af30fc2.png",
    "originalName": "test-image.png",
    "path": "uploads/1793202916828-6f8ad04f-961c-4f81-a21a-7d9e3af30fc2.png",
    "url": "http://localhost:5000/uploads/1793202916828-6f8ad04f-961c-4f81-a21a-7d9e3af30fc2.png",
    "mimetype": "image/png",
    "size": 713,
    "_id": "6ae21ae4b3304599315fcdb1",
    "createdAt": "2026-10-28T15:55:16.933Z",
    "updatedAt": "2026-10-28T15:55:16.933Z"
  }
}
```

The response above records a real successful test from development. Its generated filename, ID, and timestamp are historical examples; subsequent uploads will produce different values.

### Retrieve all files

```bash
curl -i http://localhost:5000/api/files
```

### Retrieve a single file

```bash
curl -i http://localhost:5000/api/files/6ae21ae4b3304599315fcdb1
```

### View an uploaded image

```bash
curl -i http://localhost:5000/uploads/1793202916828-6f8ad04f-961c-4f81-a21a-7d9e3af30fc2.png
```

These commands assume the server is running on port `5000` and the sample file still exists.

## 15. Database and File Storage

The project uses two forms of storage.

### Local file storage

Multer stores uploaded images in the `uploads/` directory.

The application generates a unique filename for an upload and returns the saved path and URL.

### MongoDB metadata storage

The Mongoose `File` model stores information associated with an uploaded file.

The returned metadata can include:

- Generated filename
- Original filename
- Storage path
- Public URL
- MIME type
- File size
- MongoDB document ID
- Creation and update timestamps

The exact schema is defined in `models/File.js`.

### Important storage limitation

The image bytes are stored locally, while their metadata is stored in MongoDB. A MongoDB record does not automatically preserve the actual file if the local upload directory is deleted.

For a production deployment, consider persistent file storage such as an object-storage service, backup procedures, authentication, and access controls.

## 16. Error Handling and Troubleshooting

### Error: `Please select an image to upload.`

**Cause:** The server did not receive a file in the expected `image` field.

**Solutions:**

- Confirm that the request method is `POST`.
- Use `Body → form-data`.
- Set the field name to `image`.
- Set the field type to `File`.
- Ensure the field is enabled.
- Select a real file.
- Confirm the request is being sent through a working Postman Agent.

### Error: `ENOENT: no such file or directory`

**Cause:** The upload client attempted to open a file at a path that does not exist.

**Solutions:**

- Confirm the image exists on the Linux filesystem.
- Select it using the file picker rather than typing a placeholder path.
- Verify the correct file path using `ls -l`.
- If Postman Web continues to fail, test the endpoint with cURL.

### Error: `Cannot GET /api/upload`

**Cause:** The upload endpoint was called using GET instead of POST.

**Solution:** Use `POST /api/upload`. Use `GET /api/files` to retrieve file records.

### Error: MongoDB connection failure

**Possible causes:**

- The MongoDB service is not running.
- The connection string is incorrect.
- The username or password is wrong.
- The database user lacks permission.
- MongoDB Atlas network access is not configured correctly.

**Solution:** Check the server terminal, the `.env` configuration, and MongoDB connectivity.

Never share database credentials when asking for help.

### Postman Web cannot retain the selected image

**Possible causes:**

- The Desktop Agent is disconnected.
- The request body is configured as text instead of a file.
- The file picker did not retain the selection.
- The browser-to-agent connection is not working correctly.

**Workaround:** Use the verified cURL upload command while troubleshooting Postman Web.

## 17. Security Considerations

For a production-ready implementation, consider the following:

- Keep `.env` out of version control.
- Never commit database passwords or private connection strings.
- Validate file MIME types and file content where appropriate.
- Enforce upload size limits.
- Generate safe filenames rather than trusting user-supplied filenames.
- Avoid exposing sensitive files through public static routes.
- Consider authentication and authorization for uploads and downloads.
- Add rate limiting and appropriate request logging.
- Avoid returning internal stack traces to API clients.
- Back up both database metadata and actual uploaded files.
- Review uploaded content before making it publicly accessible.

MIME-type validation alone is not a complete security check because file metadata can be forged.

## 18. Git and GitHub Submission

### Step 1: Initialize Git

From the project root, run:

```bash
git init
```

If Git is already initialized, you do not need to run this again.

### Step 2: Review `.gitignore`

Ensure `.env`, `node_modules/`, and private uploads are excluded.

### Step 3: Review the project status

```bash
git status
```

Confirm that no secrets or private files are staged.

### Step 4: Stage project files

```bash
git add .
```

Then inspect the staged changes:

```bash
git status
git diff --cached
```

If `.env` or private files are listed, remove them from the staging area and correct `.gitignore` before committing.

### Step 5: Commit the project

```bash
git commit -m "Build file and image upload API"
```

### Step 6: Create the GitHub repository

Create a repository on GitHub with a clear name.

Use a name without spaces. If Syntecxhub provided a required naming convention, follow that convention instead.

If the local project already contains a README, avoid initializing the remote repository with a conflicting second README unless you know how to reconcile the histories.

### Step 7: Connect the remote repository

Replace the placeholder with your actual GitHub repository URL:

```bash
git remote add origin
```

If an `origin` remote already exists, inspect it first:

```bash
git remote -v
```

Update it if necessary rather than adding a duplicate remote.

### Step 8: Push the project

Check your branch:

```bash
git branch --show-current
```

If your branch is named `main`, push with:

```bash
git push -u origin main
```

If your branch has a different name, use the actual branch name.

### Step 9: Verify GitHub

Open the repository in your browser and confirm that it contains:

- `server.js`
- `models/File.js`
- `package.json`
- `package-lock.json`
- `.gitignore`
- `README.md`
- The intended project folders

Do not expect `node_modules/`, `.env`, or private uploaded images to be present in the remote repository.

### Optional: Include a Postman collection

Export the Postman collection as a JSON file and add it to the repository, for example:

```text
postman/
└── Syntecxhub-Project-3-File-Image-Upload-API.postman_collection.json
```

If you use a Postman environment export, inspect it before committing and remove secrets or private values.

## 19. Project Status and Final Checklist

Use this checklist before submitting the project.

### Implementation

- [x] Node.js and Express API runs locally.
- [x] Image upload endpoint successfully accepted an image through cURL.
- [x] The upload response returned file metadata and a URL.
- [ ] Health check verified in Postman.
- [ ] Retrieve-all-files endpoint verified.
- [ ] Retrieve-one-file endpoint verified.
- [ ] Uploaded image URL verified.
- [ ] Missing-file validation verified.
- [ ] Unsupported-file validation verified.
- [ ] File-size validation verified.
- [ ] Invalid-ID and nonexistent-file tests verified.

### Documentation and repository

- [ ] README reviewed against the actual source code.
- [ ] Folder structure confirmed.
- [ ] `.gitignore` reviewed.
- [ ] `.env` excluded from Git.
- [ ] No private uploads or credentials staged.
- [ ] Postman collection saved and exported, if required.
- [ ] Git commit created.
- [ ] GitHub remote configured.
- [ ] Project pushed successfully.
- [ ] GitHub repository opened and reviewed.
- [ ] Repository URL copied for submission.

The checked items above reflect work already confirmed during development; remaining items should be checked only after completing and verifying them.

## 20. Author and Acknowledgements

**Project:** Syntecxhub Project 3 — File / Image Upload API

**Purpose:** Backend development assignment demonstrating REST API creation, file uploads, database integration, validation, and API testing.

**Developed with:** Node.js, Express.js, MongoDB, Mongoose, Multer, Postman, and cURL.

**Repository:** Add the GitHub repository URL here after the project has been pushed.

**Acknowledgements:** Syntecxhub for the project assignment and learning opportunity.

---

*This README documents the intended API behaviour and the successful upload observed during development. Confirm the remaining routes, validation behaviour, actual project structure, and submission requirements before treating the project as complete.*
