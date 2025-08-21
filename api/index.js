import express from "express";
import postsRouter from "./route/posts.js";
import usersRouter from "./route/users.js";
import authRouter from "./route/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
});

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));
app.use(cookieParser());

// Configure multer for memory storage (temporary storage before Cloudinary)
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    }
});

app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader
            .upload_stream(
                {
                    resource_type: "auto",
                    folder: "blog-images", // Optional: organize uploads in a folder
                    public_id: `blog-${Date.now()}`, // Optional: custom public ID
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        return res.status(500).json({ error: "Upload to Cloudinary failed" });
                    }
                    
                    // Return the Cloudinary URL
                    res.status(200).json({
                        url: result.secure_url,
                        publicId: result.public_id
                    });
                }
            )
            .end(req.file.buffer);

    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ error: "Upload failed" });
    }
});

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Body:`, req.body);
    next();
});

app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.listen(8081, () => {
    console.log("Server is running on port 8081");
})