import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate unique ids

export async function POST(req) {
    try {
        // Parse the incoming JSON request body
        const { email, username, password } = await req.json();

        // Path to the users JSON file
        const filePath = path.resolve('data', 'users.json');

        // Check if the file exists, if not, create it with an empty array
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([])); // Create an empty array if the file doesn't exist
        }

        // Read the current users data from the JSON file
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const users = JSON.parse(fileData);

        // Create a new user object with a unique ID and provided email and name
        const newUser = {
            id: uuidv4(), // Generate a unique ID for each user
            email: email,
            username: username,
            password: password,
        };

        // Add the new user to the users array
        users.push(newUser);

        // Write the updated users array back to the JSON file
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

        // Return a success response
        return new Response(JSON.stringify({ message: 'User added successfully', newUser }), { status: 200 });
    } catch (error) {
        console.error('Error saving data:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}

export async function GET() {
    try {
        // Path to the users JSON file
        const filePath = path.resolve('data', 'users.json');

        // Check if the file exists, if not, return an empty array
        if (!fs.existsSync(filePath)) {
            return new Response(JSON.stringify([]), { status: 200 });
        }

        // Read the current users data from the JSON file
        const fileData = fs.readFileSync(filePath, 'utf-8');

        // Parse the data and return it as JSON
        const users = JSON.parse(fileData);

        // Return the users as a response
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error('Error reading data:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}

