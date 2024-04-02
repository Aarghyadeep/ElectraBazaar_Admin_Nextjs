import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises"
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`, 
  api_key: `${process.env.CLOUDINARY_API_KEY}`, 
  api_secret: `${process.env.CLOUDINARY_API_SECRET}` 
});

export async function POST(req) {
    await mongooseConnect();
    const data = await req.formData();
  
    /* Extract info from the data */
    const title = data.get("title");
    const description = data.get("description");
    const price = data.get("price");
  
    /* Get an array of uploaded photos */
    const photos = data.getAll("photoPath");
  
    /* Process and store each photo  */
    const photoPath = []; // Declare outside the loop
  
    // Define a helper function to upload each photo
    const uploadPhoto = async (photo) => {
      // Read the photo as an ArrayBuffer
      const bytes = await photo.arrayBuffer();
      // Convert it to a Buffer
      const buffer = Buffer.from(bytes);
  
      // Upload image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
          folder: 'EBproducts'
        }, async (error, result) => {
          if (error) {
            console.error('Error uploading image to Cloudinary:', error);
            reject(error);
          } else {
            console.log('Image uploaded to Cloudinary');
            // Store the public URL of the uploaded image
            photoPath.push(result.url);
            resolve();
          }
        }).end(buffer);
      });
  
      return result;
    };
  
    // Upload each photo sequentially
    for (const photo of photos) {
      await uploadPhoto(photo);
    }
  
    const newProduct = await Product.create({
      title, description, price, photoPath
    });
    await newProduct.save();
    return NextResponse.json(newProduct);
}

export async function GET(req) {
  try {
   await mongooseConnect();
   const pId = req.nextUrl.searchParams.get('id');
   if (pId) {
    return NextResponse.json(await Product.findOne({_id:pId}));
  } else {
    return NextResponse.json(await Product.find());
  }
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
   await mongooseConnect();
   const pId = req.nextUrl.searchParams.get('id');
   if (pId) {
    await Product.deleteOne({_id:pId})
    return NextResponse.json({ message: "Item deleted successfully"}, { status: 200 });
  } 
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PATCH(req) {
  
   await mongooseConnect();
    const data = await req.formData();
    
    /* Extract info from the data */
    const title = data.get("title")
    const description = data.get("description")
    const price = data.get("price")
    
    /* Get an array of uploaded photos */
    const photos = data.getAll("photoPath")

    const photoPath = []

    // Define a helper function to upload each photo
    const uploadPhoto = async (photo) => {
      // Read the photo as an ArrayBuffer
      const bytes = await photo.arrayBuffer();
      // Convert it to a Buffer
      const buffer = Buffer.from(bytes);
  
      // Upload image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
          folder: 'EBproducts'
        }, async (error, result) => {
          if (error) {
            console.error('Error uploading image to Cloudinary:', error);
            reject(error);
          } else {
            console.log('Image uploaded to Cloudinary');
            // Store the public URL of the uploaded image
            photoPath.push(result.url);
            resolve();
          }
        }).end(buffer);
      });
  
      return result;
    };
  
    // Upload each photo sequentially
    for (const photo of photos) {
      if (typeof photo === 'string') {
        // If photo is already a URL, push it directly to photoPath
        photoPath.push(photo);
      } else {
        // Otherwise, it's a new photo, so upload it to Cloudinary
        await uploadPhoto(photo);
      }
    }

    const pId = req.nextUrl.searchParams.get('id');

    const existingProduct = await Product.findById(pId)

    if (!existingProduct) {
      return NextResponse.json("Product Not Found", { status: 404 });
    }

     /* Update the Work with the new data */
     existingProduct.title = title
     existingProduct.description = description
     existingProduct.price = price
     existingProduct.photoPath = photoPath
 
     await existingProduct.save()
 
   return NextResponse.json("Successfully updated the Product", { status: 200 });
  
}