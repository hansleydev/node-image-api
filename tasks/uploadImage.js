// --------------------- Import Required Modules ---------------------

const getStream = require("into-stream");
const { v4: uuidv4 } = require("uuid");

const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  newPipeline,
} = require("@azure/storage-blob");

const { STORAGE_URI, STORAGE_NAME, STORAGE_KEY, CONTAINER_NAME } = require("../settings/settings");

// Set Upload Options

const uploadOptions = { bufferSize: 4 * 1024 * 1024, maxBuffers: 20 };

// Instantiate Azure Blob Service Credential

const storageCredential = new StorageSharedKeyCredential(STORAGE_NAME, STORAGE_KEY);

// Create Storage Pipeline

const pipeline = newPipeline(storageCredential);

// Instantiate Azure Blob Service Client

const serviceClient = new BlobServiceClient(STORAGE_URI, pipeline);

// Create Azure Container Client

const containerClient = serviceClient.getContainerClient(CONTAINER_NAME);

// --------------------- Create Upload Image Task ---------------------

const uploadImage = async (req, res) => {
  try {
    // Invoke Blob Name
    const blobName = await uuidv4();

    // Create Stream from File Buffer

    const stream = await getStream(req.file.buffer);

    // Create Azure Blob Client

    const blockBlobClient = await containerClient.getBlockBlobClient(blobName);

    // Upload Image to Azure Blob Storage

    await blockBlobClient.uploadStream(stream, uploadOptions.bufferSize, uploadOptions.maxBuffers, {
      blobHTTPHeaders: { blobContentType: req.file.mimetype },
    });

    // Return File Path to Save to Database

    const filePath = {
      profilePicture: `${STORAGE_URI}/${CONTAINER_NAME}/${blobName}`,
    };

    return res.status(201).json(filePath);
  } catch (error) {
    const response = {
      message: "Could not upload image.",
      error,
    };

    console.error(response);

    return res.status(500).json(response);
  }
};

module.exports = uploadImage;
