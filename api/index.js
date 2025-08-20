import express from "express";
import postsRouter from "./route/posts.js";
import usersRouter from "./route/users.js";
import authRouter from "./route/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));
app.use(cookieParser());

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({storage: storage});

app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        res.status(200).json(req.file.filename);
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