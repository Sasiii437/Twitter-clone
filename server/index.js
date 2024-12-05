const { MongoClient, ServerApiVersion } = require("mongodb");


const express = require("express");
const cors = require("cors");
const uri = "mongodb+srv://Sasi:Admin321@twillerx.2rbf8.mongodb.net/?retryWrites=true&w=majority&appName=TwillerX";

const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const postcollection = client.db("database").collection("posts");
    const usercollection = client.db("database").collection("users");
    app.post("/register", async (req, res) => {
      const user = req.body;
      // console.log(user)
      const result = await usercollection.insertOne(user);
      res.send(result);
    });
    app.get("/loggedinuser", async (req, res) => {
      const email = req.query.email;
      const user = await usercollection.find({ email: email }).toArray();
      res.send(user);
    });
    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postcollection.insertOne(post);
      res.send(result);
    });
    app.get("/post", async (req, res) => {
      const post = (await postcollection.find().toArray()).reverse();
      res.send(post);
    });
    app.get("/userpost", async (req, res) => {
      const email = req.query.email;
      const post = (
        await postcollection.find({ email: email }).toArray()
      ).reverse();
      res.send(post);
    });

    app.get("/user", async (req, res) => {
      const user = await usercollection.find().toArray();
      res.send(user);
    });

    app.patch("/userupdate/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      // console.log(profile)
      const result = await usercollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Twiller is working");
});

app.listen(port, () => {
  console.log(`Twiller clone is workingon ${port}`);
});

// // 
// const { MongoClient } = require("mongodb");
// const express = require("express");
// const cors = require("cors");
// const { getAuth, sendPasswordResetEmail } = require("firebase-admin/auth"); // Firebase Admin SDK
// const admin = require("firebase-admin");

// const uri ="mongodb+srv://Sasi:Admin321@twillerx.2rbf8.mongodb.net/?retryWrites=true&w=majority&appName=TwillerX";

// const port = 5000;

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();
//     const resetRequests = client.db("database").collection("passwordResets");

//     // Forgot Password Endpoint
//     app.post("/forgot-password", async (req, res) => {
//       const { email } = req.body;

//       try {
//         // Check 24-hour limit
//         const resetRecord = await resetRequests.findOne({ email });
//         const now = new Date();
//         const oneDay = 24 * 60 * 60 * 1000;

//         if (resetRecord && now - resetRecord.timestamp < oneDay) {
//           return res.status(429).send({
//             message: "Password reset already requested within the last 24 hours.",
//           });
//         }

//         // Firebase sendPasswordResetEmail
//         await getAuth().sendPasswordResetEmail(email);

//         // Log password reset request
//         await resetRequests.updateOne(
//           { email },
//           { $set: { timestamp: new Date() } },
//           { upsert: true }
//         );

//         res.send({ message: "Password reset email sent successfully." });
//       } catch (error) {
//         console.error(error);
//         res.status(500).send({
//           message: "Error sending password reset email. Please try again later.",
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
// run().catch(console.dir);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
