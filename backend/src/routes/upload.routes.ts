import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../lib/supabase.js';
import { uploadMiddleware } from '../middlewares/upload.middleware.js';

const router = Router();

const BUCKET_NAME = process.env.BUCKET_NAME || 'avatars';
const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER || 'public';

/**
 * Reusable upload utility
 */
async function uploadToSupabase(file: Express.Multer.File) {
  const fileExt = file.originalname.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${UPLOAD_FOLDER}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return {
    path: data.path,
    publicUrl
  };
}

/**
 * POST /api/upload - Single file upload
 */
router.post('/', uploadMiddleware.single('image'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
       return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const result = await uploadToSupabase(req.file);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error: any) {
    next(error);
  }
});

/**
 * POST /api/upload/multiple - Multiple file upload
 */
router.post('/multiple', uploadMiddleware.array('images', 5), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const uploadPromises = files.map(file => uploadToSupabase(file));
    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      data: results
    });
  } catch (error: any) {
    next(error);
  }
});

/**
 * DELETE /api/upload/:path - Delete file
 */
router.delete('/:path(*)', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { path } = req.params;
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path as string]);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error: any) {
    next(error);
  }
});

export default router;
