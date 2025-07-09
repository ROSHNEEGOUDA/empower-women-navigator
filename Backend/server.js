const express = require("express");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { spawn } = require("child_process");

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

// 3️⃣ ML Prediction Endpoint
app.post("/ml/predict-loan", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Get user data from request body
    const userData = req.body;
    
    // Validate required fields
    if (!userData.monthly_income || !userData.loan_amount) {
      return res.status(400).json({ error: "Missing required fields: monthly_income, loan_amount" });
    }
    
    // Call Python ML service
    const pythonProcess = spawn('python', [
      path.join(__dirname, 'ml_service.py'),
      'predict',
      JSON.stringify(userData)
    ]);
    
    let result = '';
    let error = '';
    
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });
    
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const prediction = JSON.parse(result);
          res.json({
            success: true,
            prediction,
            user: decoded.email
          });
        } catch (parseError) {
          res.status(500).json({ error: "Failed to parse ML prediction result" });
        }
      } else {
        console.error("Python process error:", error);
        res.status(500).json({ error: "ML prediction failed" });
      }
    });
    
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
});

// 4️⃣ ML Model Training Endpoint (for development)
app.post("/ml/train", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Call Python ML service to train model
    const pythonProcess = spawn('python', [
      path.join(__dirname, 'ml_service.py'),
      'train'
    ]);
    
    let result = '';
    let error = '';
    
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });
    
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const trainResult = JSON.parse(result);
          res.json({
            success: true,
            training_result: trainResult
          });
        } catch (parseError) {
          res.status(500).json({ error: "Failed to parse training result" });
        }
      } else {
        console.error("Python training error:", error);
        res.status(500).json({ error: "Model training failed" });
      }
    });
    
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
