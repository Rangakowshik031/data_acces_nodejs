const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydata', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB");
        const userSchema = new mongoose.Schema({
            name: String,
            email: String,
            designation: String,
        });
        const User = mongoose.model('User', userSchema);

        // Create and save new users
        const newUsers = [
            {
                name: 'ravi',
                email: 'ravip@gmail.com',
                designation: 'lecture'
            },
            {
                name: 'rahul',
                email: 'rahul@gmail.com',
                designation: 'hod'
            },
            {
                name: 'rahupp',
                email: 'rahu@gmail.com',
                designation: 'lecture'
            }
        ];

        await User.insertMany(newUsers);
        console.log('Users created');

        // Update a user
        await User.findOneAndUpdate({ name: 'ravi' }, { designation: 'professor' });
        console.log('User updated');

        // Delete a user
        await User.deleteOne({ name: 'rahupp' });
        console.log('User deleted');

        // Find all users after deletion
        const allUsers = await User.find();
        console.log('All users after deletion:', allUsers);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.disconnect(); // Close the MongoDB connection
    }
}

main();
