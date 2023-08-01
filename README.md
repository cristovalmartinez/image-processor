<div align="center"> 
  <img src="https://blog.logrocket.com/wp-content/uploads/2019/09/singlethreadcode.jpg" width="400" alt="worker_threads" />
</div>

# Image Processing Application with Node.js Worker Threads

Demonstration on how to use worker threads for concurrent image processing tasks. The application utilizes the `sharp` library for image manipulation and showcases how worker threads can improve performance and network latency when dealing with computationally intensive or I/O-bound image processing operations.

## Table of Contents

- [Image Processing Application with Node.js Worker Threads](#image-processing-application-with-nodejs-worker-threads)
  - [Table of Contents](#table-of-contents)
  - [Concept](#concept)
  - [Approach](#approach)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Examples](#examples)
  - [Contributing](#contributing)
  - [License](#license)
  - [let's connect](#gem)

## Concept

The concept behind this application is to build a web app that allows users to upload images and apply various image processing operations, such as resizing and converting to grayscale. These image processing tasks can be computationally intensive, especially when dealing with large images, which might lead to a slow and unresponsive user experience if processed sequentially.

To address this issue, the application utilizes Node.js worker threads. Worker threads are separate threads that can be used to perform concurrent operations within the Node.js application. This allows us to process multiple images simultaneously, taking advantage of multi-core processors and improving the overall performance of the application. Since JavaScript is single threaded, naturally it doesn't utilize machine cores. Introducing the worker_threads module.

## Approach

The approach of the application is as follows:

1. **Image Processing Tasks**: When a user uploads an image and requests an image processing operation (e.g., resize or grayscale conversion), the main Node.js application spawns a worker thread to handle that specific task.

2. **Concurrency**: If multiple users are uploading images and requesting image processing operations simultaneously, the main thread of the app can create multiple worker threads, each handling a separate image processing task at the same time (concurrently).

3. **Parallelism**: Image processing tasks, like resizing and grayscaling, can often be parallelized. The app utilizes worker threads to take advantage of multi-core processors, fully utilizing system resources and improving performance.

4. **Isolation and Stability**: Each image processing task is its own worker thread. This seperation ensures that a failure in one task does not affect other tasks or the overall stability of the app.

5. **Non-Blocking I/O**: If the processing tasks involve I/O operations (e.g., reading or writing files), using worker threads prevents the main event loop from being blocked, enabling the application to continue handling other user requests concurrently.

The application provides an HTTP server that listens on a specified port. Users can interact with the server by making requests to the `/process` endpoint, simulating the upload of an image and triggering the image processing tasks using worker threads.

## Prerequisites

<ul>Requirements</ul> to run the application:

- Node.js @latest version (worker threads were introduced in v10.5 and stabalized in v12 LTS)
- npm 

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/cristovalmartinez/image-processor-worker-threads.git
   cd image-processor-worker-threads
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

## Usage

To start the image processing application, run:

```bash
npm start
```

The HTTP server will start listening on the default port (3000). You can access the server by visiting `http://localhost:3000` in your browser.

## Examples

### Image Processing

Hence the app does not have a client/ui, however you can use "curl" via the command line to process an image. Make a POST request to the `/process` endpoint with the image file. The HTTP server will simulate the image upload and process the image concurrently using worker threads for both resizing and grayscaling.

```bash
curl -X POST -F "path-to-image/image.jpg" http://localhost:3000/process
```

The processed images will be saved in the specified output directories as `resized.jpg` and `grayscale.jpg`.

## Contributing

Contributions are welcome, If you find any issues or have ideas for improvements, please feel free to open an issue or submit a pull request.

## License

This repo is licensed under the MIT License.

<div align='center'>
  
 ### :gem: Let's connect
  
  [![website-shield][website-shield]][website-url] [![LinkedIn][linkedin-shield]][linkedin-url] [![instagram-shield][instagram-shield]][instagram-url]
  
</div>

<!-- [contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge -->
<!-- [contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors -->
<!-- [forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge -->
<!-- [forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white -->
[linkedin-shield]: https://img.shields.io/badge/linkedin-blue?style=flat&logo=linkedin
[linkedin-url]: https://www.linkedin.com/in/cristoval
[instagram-shield]: https://img.shields.io/badge/instagram-orange?style=flat&logo=instagram&logoColor=white
[instagram-url]: https://www.instagram.com/cristoval.m/
[website-shield]: https://img.shields.io/badge/website-gray?style=flat&logo=stylelint&logoColor=white
[website-url]: https://www.cristovalmartinez.com
