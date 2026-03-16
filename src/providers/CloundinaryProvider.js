import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'
import { env } from '~/config/environment'

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET
})

const streamUpload = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    console.log('buffer:', buffer)
    console.log('buffer length:', buffer?.length)
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {

          return reject(error)
        }
        resolve(result)
      }
    )

    streamifier.createReadStream(buffer).pipe(stream)
  })
}

export const CloundinaryProvider = { streamUpload }