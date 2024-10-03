import Ticket from '@/model/Tickets'; 
import { connectDB } from '../../../db'; 
import { NextResponse } from 'next/server';
import auth from '@/app/middleware/auth';



export async function POST(request) {

  const isAuthenticated = await auth(request);
  if (!isAuthenticated) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }


    const { title, description, active } = await request.json();
    await connectDB();
    const newProduct = new Ticket({ title, description, active });
    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
 
}



export async function GET(request) {

  const isAuthenticated = await auth(request, NextResponse);
  if (!isAuthenticated) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }


  const tickets = await Ticket.find();
  return NextResponse.json(tickets)
}

