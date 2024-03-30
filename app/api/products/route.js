import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
   try {
    await mongooseConnect();
    const {title,description,price} = await req.json();
    console.log(title);
    const productDoc = await Product.create({
     title, description, price
    })
    await productDoc.save();
    return NextResponse.json(productDoc);
   } catch (error) {
     return NextResponse.json({ message: "Error", error }, { status: 500 });
   }
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

export async function PUT(req) {
  try {
   await mongooseConnect();
   const {title,description,price,_id} = await req.json();
   console.log(title);
   await Product.updateOne({_id}, {title,description,price});
   return NextResponse.json(true);
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}