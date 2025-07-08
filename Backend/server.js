const express = require("express");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(
    // Make sure to resolve the correct absolute path
    path.resolve(__dirname, "./serviceAccountKey.json")
  ),
});

// Your own JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY";

// 1️⃣ Endpoint to verify Firebase ID token & issue your JWT
app.post("/auth/custom-token", async (req, res) => {
  const firebaseToken = req.headers.authorization?.split(" ")[1];
  if (!firebaseToken) return res.status(401).json({ error: "No Firebase token provided" });

  try {
    // Verify Firebase ID token with Firebase Admin
    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    // Example custom payload
    const payload = {
      uid: decoded.uid,
      email: decoded.email,
      role: "user",
    };

    // Your own JWT
    const customToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({ customToken });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid Firebase token" });
  }
});

// 2️⃣ Example protected route using your JWT
app.get("/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Access granted!", user: decoded });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
