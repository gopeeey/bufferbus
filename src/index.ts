import dotenv from "dotenv";
import * as firebaseAdmin from "firebase-admin";
import { Readable } from "stream";

dotenv.config();

function main() {
  console.log(process.env.FIREBASE_CLIENT_EMAIL);
  const app = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });

  const bucket = app.storage().bucket();
  const fileName = "hello_world.txt";
  const uploadStream = bucket.file(fileName).createWriteStream({
    contentType: "text/plain",
  });

  //   const file = fs.createReadStream(path.join(__dirname, "../solar-system.jpg"));
  const file = new Readable();
  file._read = () => {
    file.push(
      Buffer.from(
        "Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj Hello World, there's more to see than just the things you see!ksdjf alskdjf alsdkfj asldkfj as;dlkfj asdl;kfj asldkfj asdl;fkj asdlkfj asdl;kf asdlfkjasd l;fkajs dfl;aksd flaskdj fa;slkdfj asldkf jaslk;dfj"
      )
    );
    file.push(null);
  };
  file.pipe(uploadStream);

  uploadStream.on("close", async () => {
    await bucket.file(fileName).makePublic();
    const url = bucket.file(fileName).publicUrl();
    console.log(url);
  });
}

main();

// TODO: Delete the env file and uninstall dotenv
