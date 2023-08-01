const http = require('http');
const fs = require('fs');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const sharp = require('sharp');
const PORT = 3000;

// main function to process images using worker thread
function processImageWorker(imagePath, outputPath, operation) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
      workerData: {
        imagePath,
        outputPath,
        operation,
      },
    });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

// Worker thread entry point
if (!isMainThread) {
  const { imagePath, outputPath, operation } = workerData;

  // Image processing function inside worker thread
  async function processImage() {
    try {
      const image = sharp(imagePath);

      // Simulate a long processing time with a timer (example, 5 seconds)
      await new Promise((resolve) => setTimeout(resolve, 5000));

      if (operation === 'resize') {
        await image.resize(800, 600).toFile(outputPath);
      } else if (operation === 'grayscale') {
        await image.grayscale().toFile(outputPath);
      }

      parentPort.postMessage('Image processing completed successfully');
    } catch (error) {
      parentPort.postMessage(`Image processing failed: ${error.message}`);
    }
  }

  processImage();
}

// HTTP server to handle image "upload"
const server = http.createServer(async (req, res) => {
  if (req.url === '/process') {
    // Simulate the upload of an image (replace this with actual file upload handling)
    const uploadedImage = 'path-to-image/image.jpg';

    // Process the image using the worker thread
    try {
      await processImageWorker(uploadedImage, 'path/to/output/resized.jpg', 'resize');
      await processImageWorker(uploadedImage, 'path/to/output/grayscale.jpg', 'grayscale');

      res.end('Image processing completed');
    } catch (error) {
      // error handler to catch unprocessed images
      res.end(`Image processing failed: ${error.message}`);
    }
  } else {
    res.end('Greetings from the main server');
  }
});

server.listen(PORT, () => console.log(`Server now listening on port ${PORT}`));
