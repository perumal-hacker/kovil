const bcrypt = require("bcrypt");
const User = require("./models/User"); // Correct import from models/User.js

// Function to add a default user
async function addDefaultUser() {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username: "admin" });
    if (existingUser) {
      console.log("Default user already exists!");
      return;
    }

    // Hash the default password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Create and save the new user
    const newUser = new User({
      username: "admin", // Default username
      password: hashedPassword, // Hashed password
    });

    await newUser.save();
    console.log("Default user created successfully!");
  } catch (error) {
    console.error("Error creating default user:", error);
  }
}

module.exports = addDefaultUser;
