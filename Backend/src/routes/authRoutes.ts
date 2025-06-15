import { Router, Request, Response } from "express";
import { protect } from "../middleware/authMiddleware";
import { registerUser, loginUser, getUserInfo } from "../controllers/authController";
import { upload } from "../middleware/uploadMiddleware"; 

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

// router.post("/upload-image", upload.single("image"), (req: Request, res: Response): void => {
//     if (!req.file) {
//         res.status(400).json({ message: "No file uploaded" });
//         return;
//     }
//     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//     res.status(200).json({ imageUrl });
// });
// router.post("/upload-image", upload.single("image"), (request: Request, response: Response): void => {
//     if (!request.file) {
//         response.status(400).json({ message: "No file uploaded" });
//         return;
//     }
//     const imageUrl = `${request.protocol}://${request.get("host")}/uploads/${request.file.filename}`;
//     response.status(200).json({ imageUrl });
// });
router.post('/upload-image', upload.single('image'), (request: Request, response: Response): void => {
    try {
        if (!request.file) {
            response.status(400).json({ message: 'No file uploaded or invalid file type.' });
            return;
        }
        const imageUrl = `${request.protocol}://${request.get('host')}/uploads/${request.file.filename}`;
        response.status(200).json({ imageUrl });
    } catch (error) {
        response.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
});



export default router;
