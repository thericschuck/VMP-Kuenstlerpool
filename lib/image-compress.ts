/**
 * Client-side image compression via the Canvas API.
 * Converts any supported image format to WebP.
 * Only call this in 'use client' components.
 */

/**
 * Compress a File to WebP.
 * @param file     Source image (any browser-supported format)
 * @param maxWidth Maximum output width in px — height is scaled proportionally (default 1920)
 * @param quality  WebP quality 0–1 (default 0.82)
 */
export async function compressToWebP(
  file: File,
  maxWidth = 1920,
  quality = 0.82,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.naturalWidth)
      const w = Math.round(img.naturalWidth  * scale)
      const h = Math.round(img.naturalHeight * scale)

      const canvas = document.createElement('canvas')
      canvas.width  = w
      canvas.height = h

      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, w, h)

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl)
          if (blob) resolve(blob)
          else reject(new Error('canvas.toBlob() returned null'))
        },
        'image/webp',
        quality,
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Failed to decode image for compression'))
    }

    img.src = objectUrl
  })
}

/** Return a human-readable file size string, e.g. "1.4 MB" */
export function formatBytes(bytes: number): string {
  if (bytes < 1024)        return `${bytes} B`
  if (bytes < 1024 ** 2)   return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`
}
