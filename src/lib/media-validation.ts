import "server-only";
import { fileTypeFromBuffer } from "file-type";
import { imageSize } from "image-size";

export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set(["jpg", "png", "webp", "avif"]);

export type ImageValidationResult =
  | { ok: true; buffer: Buffer; ext: string; width: number; height: number }
  | { ok: false; error: string };

/**
 * Validates an uploaded image by its real content, not its filename/MIME
 * header (a renamed .exe must not pass). Checked before ever touching
 * Cloudinary: size limit, magic-byte type sniff, then a real decode of the
 * dimensions to catch corrupt/non-image buffers.
 */
export async function validateImageFile(file: File): Promise<ImageValidationResult> {
  if (file.size > MAX_IMAGE_BYTES) {
    return { ok: false, error: "Image size must not exceed 2 MB." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const detected = await fileTypeFromBuffer(buffer);
  if (!detected || !ALLOWED_IMAGE_TYPES.has(detected.ext)) {
    return { ok: false, error: "Only JPG, PNG, WEBP, and AVIF images are allowed." };
  }

  try {
    const { width, height } = imageSize(buffer);
    if (!width || !height) {
      return { ok: false, error: "The uploaded file is not a valid image." };
    }
    return { ok: true, buffer, ext: detected.ext, width, height };
  } catch {
    return { ok: false, error: "The uploaded file is not a valid image." };
  }
}

export const MAX_BANNER_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAX_BANNER_VIDEO_BYTES = 65 * 1024 * 1024;

const ALLOWED_VIDEO_TYPES = new Set(["mp4", "webm"]);

export type BannerFileResult =
  | { ok: true; buffer: Buffer; kind: "image" | "video" }
  | { ok: false; error: string };

/** Banner images may be larger than regular media (full-bleed hero), so they get a 5 MB cap. */
export async function validateBannerImage(file: File): Promise<BannerFileResult> {
  if (file.size > MAX_BANNER_IMAGE_BYTES) {
    return { ok: false, error: "Banner image must not exceed 5 MB." };
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const detected = await fileTypeFromBuffer(buffer);
  if (!detected || !ALLOWED_IMAGE_TYPES.has(detected.ext)) {
    return { ok: false, error: "Banner images must be JPG, PNG, WEBP, or AVIF." };
  }
  try {
    const { width, height } = imageSize(buffer);
    if (!width || !height) return { ok: false, error: "The uploaded banner image is not valid." };
  } catch {
    return { ok: false, error: "The uploaded banner image is not valid." };
  }
  return { ok: true, buffer, kind: "image" };
}

/** Sniffs the real container type (MP4/WebM) from magic bytes rather than trusting the filename or MIME header. */
export async function validateBannerVideo(file: File): Promise<BannerFileResult> {
  if (file.size > MAX_BANNER_VIDEO_BYTES) {
    return { ok: false, error: "Banner video must not exceed 65 MB." };
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const detected = await fileTypeFromBuffer(buffer);
  if (!detected || !ALLOWED_VIDEO_TYPES.has(detected.ext)) {
    return { ok: false, error: "Banner videos must be MP4 or WEBM." };
  }
  return { ok: true, buffer, kind: "video" };
}
