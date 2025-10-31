import express from "express";
import multer from "multer";
import { uploadToS3 } from "../utils/s3.js";
import { db } from "../utils/db.js";
import { files } from "../models/schema.js";
import { v4 as uuidv4 } from "uuid";
import { sendMessage } from "../utils/rabbitmq.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const s3Key = `raw/${uuidv4()}-${file.originalname}`;
    console.log(s3Key)
    await uploadToS3(file.path, s3Key);

    const newFile = await db.insert(files).values({
      originalName: file.originalname,
      s3Key: s3Key,
    }).returning({ id: files.id });

    await sendMessage({ s3Key, jobId: newFile[0].id });

    res.json({
      message: "File uploaded successfully",
      jobId: newFile[0].id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "File upload failed" });
  }
});

export default router;
