/* Node.js static file web server */

// Importing necessary modules
const http = require('http');

const fs = require('fs');
const crypto = require('crypto');
// const path = require('path');
console.log(http.STATUS_CODES);
// Port on which the server will create
const port = 8000;
const host = 'localhost';
const mimeType = {
  '.html': 'text/html',
  '.json': 'application/json',
};

const requestListener = function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  const path = `${req.url}`.replace('/', '');
  if (path === 'html' || path === 'json') {
    res.writeHead(200, { 'Content-Type': mimeType[`.${path}`] });
    fs.readFile(`../public/index.${path}`, 'utf-8', (err, data) => {
      if (err) {
        res.STATUS_CODES;
        throw err;
      } else {
        res.end(data);
      }
    });
  } else if (path.includes('uuid')) {
    res.end(JSON.stringify({ uuid: `${crypto.randomUUID()}` }));
  } else if (path.includes('status')) {
    const num = path.split('/')[1];
    res.end(http.STATUS_CODES[num]);
  } else if (path.includes('delay')) {
    const num = path.split('/')[1];
    setTimeout(() => {
      res.end(http.STATUS_CODES[200]);
    }, 1000 * num);
  } else if (path === '') {
    res.end(`hello world ${path} l`);
  } else {
    res.statusCode = 500;
    res.end('error in getting the file');
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

// // Maps file extension to MIME types which
// // helps browser to understand what to do
// // with the file
// const mimeType = {
//   '.ico': 'image/x-icon',
//   '.html': 'text/html',
//   '.js': 'text/javascript',
//   '.json': 'application/json',
//   '.css': 'text/css',
//   '.png': 'image/png',
//   '.jpg': 'image/jpeg',
//   '.wav': 'audio/wav',
//   '.mp3': 'audio/mpeg',
//   '.svg': 'image/svg+xml',
//   '.pdf': 'application/pdf',
//   '.doc': 'application/msword',
//   '.eot': 'application/vnd.ms-fontobject',
//   '.ttf': 'application/font-sfnt',
// };

// // Creating a server and listening at port 1800
// http
//   .createServer((req, res) => {
//     // Parsing the requested URL
//     const parsedUrl = url.parse(req.url);

//     // If requested url is "/" like "http://localhost:1800/"
//     if (parsedUrl.pathname === '/') {
//       var filesLink = '<ul>';
//       res.setHeader('Content-type', 'text/html');
//       var filesList = fs.readdirSync('./');
//       filesList.forEach((element) => {
//         if (fs.statSync('./' + element).isFile()) {
//           filesLink += `<br/><li><a href='./${element}'>
// 					${element}
// 				</a></li>`;
//         }
//       });

//       filesLink += '</ul>';

//       res.end('<h1>List of files:</h1> ' + filesLink);
//     }

//     /* Processing the requested file pathname to
// 	avoid directory traversal like,
// 	http://localhost:1800/../fileOutofContext.txt
// 	by limiting to the current directory only. */
//     const sanitizePath = path
//       .normalize(parsedUrl.pathname)
//       .replace(/^(\.\.[\/\\])+/, '');

//     let pathname = path.join(__dirname, sanitizePath);

//     if (!fs.existsSync(pathname)) {
//       // If the file is not found, return 404
//       res.statusCode = 404;
//       res.end(`File ${pathname} not found!`);
//     } else {
//       // Read file from file system limit to
//       // the current directory only.
//       fs.readFile(pathname, function (err, data) {
//         if (err) {
//           res.statusCode = 500;
//           res.end(`Error in getting the file.`);
//         } else {
//           // Based on the URL path, extract the
//           // file extension. Ex .js, .doc, ...
//           const ext = path.parse(pathname).ext;

//           // If the file is found, set Content-type
//           // and send data
//           res.setHeader('Content-type', mimeType[ext] || 'text/plain');

//           res.end(data);
//         }
//       });
//     }
//   })
//   .listen(PORT);

// console.log(`Server listening on port ${PORT}`);
