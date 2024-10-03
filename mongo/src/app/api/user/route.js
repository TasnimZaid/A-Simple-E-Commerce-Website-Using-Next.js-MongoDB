import { connectDB } from '@/db';
import { NextResponse } from 'next/server';
import User from '@/model/users';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



export async function POST(request) {
    // Parse the request body
    const { username , email, password } = await request.json();
    
    // Connect to the database
    await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newuser = new User({ username, email, password : hashedPassword });

    // Save the user to the database
    await newuser.save();

    const token = jwt.sign(
        { id: newuser._id, email: newuser.email }, // Payload
        "12",                    // Secret key (make sure to store this in your environment variables)
        { expiresIn: '1h' }                        // Token expiration (1 hour in this case)
    );
    
    // Return the created user as the response
    return NextResponse.json({user : newuser ,token});
};
