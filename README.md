
# Bufferbus

Library to provide a super simple interface for uploading files to major cloud storage platforms. Currently supported platforms include AWS S3, Google Cloud Storage, Google Drive, Azure Blob Storage and Firebase.




## Installation

Install bufferbus with npm

```bash
  npm install bufferbus
```
    
## Usage/Examples
There is a CommonJS build so you can require the library like you would any other Node.js library

```javascript
const bufferBus = require("bufferbus");
```

There is also an ES Module build so you can import what you need
```javascript
import { createUploader } from "bufferbus"
```

Usage is very straightforward. You simply create an upload function with your preferred platform 

```javascript
import { createUploader } from "bufferbus"

const uploadToFirebase = createUploader({
    platform: "firebase",
    config: {
        bucket: "your_firebase_bucket",
        clientEmail: "your_firebase_client_email",
        privateKey: "your_firebase_private_key",
        projectId: "your_firebase_project_id"
    },
});
```

then use the upload function wherever you need. In this example we assume the file to be uploaded is located in the same folder as the script

```javascript
const fileUrl = await uploadToFirebase({
    data: fs.createReadStream(
      path.join(__dirname, "./solar-system.jpg")
    ),
    fileName: "some_folder/some_nested_folder/solar-systems.jpg"
  });

console.log(fileUrl);
```

The data to be uploaded can either be a buffer, or a readable stream (to support infinitely large uploads) as seen in the example above. 

The upload function returns a url that can be used to access the uploaded file (this may be null if explicitly specified that the file should not be public).

Folders and nested folders are denoted with slashes before the actual file name as seen above.

## Options
The upload function allows you to specify a few options, namely:

### mimeType (string)
The mimeType of the file being uploaded, "image/jpeg", "text/csv", "audio/midi" etc. Defaults to _"application/octet-stream"_.

### public (boolean)
If the uploaded file should be publicly accessible through a url. Defaults to _true_.

Please note: This is an object level setting and applies only to the uploaded file. The file may still be restricted by bucket/container level rules that prevent it from being publicly accessed. Such rules can be modified on the corresponding platform's dashboard.

### overwriteDuplicate (boolean)
If to overwrite files in the same folder that have the same name as the uploaded file. Defaults to _true_.