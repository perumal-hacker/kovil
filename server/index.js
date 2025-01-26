require("dotenv").config(); // Ensure dotenv is loaded

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcrypt"); 
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const addDefaultUser = require("./addDefaultUser"); 
const User = require("./models/User");
const jwt = require("jsonwebtoken");

// Load environment variables from the .env file
const mongoURI = process.env.MONGO_URI; 
const jwtSecret = process.env.JWT_SECRET; 
const PORT = process.env.PORT || 8080; 

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
}

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection using MONGO_URI from the .env file
mongoose
  .connect(mongoURI) // Connection URI
  .then(async () => {
    console.log("MongoDB connected");
    // Call the function to add the default user
    await addDefaultUser();
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));


// Start Server




// const conn = mongoose.createConnection(mongoURI);
let gfs;


  
  // API: User Registration
  app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ error: "Username already exists" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
  
  // API: User Login
  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }
  
    try {
      // Check if user exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
  
      // Compare password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
  
      // Create JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        secretKey,
        { expiresIn: "1h" } // Token expires in 1 hour
      );
  
      // Send token in response
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  

// Schema Definitions
// Cost Schema
const CostSchema = new mongoose.Schema({
  date: { type: String, required: true },
  total: { type: Number, required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      cost: { type: Number, required: true },
    },
  ],
});

// Employee Schema
const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  address: { type: String, required: true },
  income: { type: Number, required: true },
});

// Tax Form Schema
const TaxFormSchema = new mongoose.Schema({
  place: { type: String, required: true },
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  dob: { type: String, required: true },
  aadharNumber: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  whatsappNumber: { type: String },
  email: { type: String, required: true },
  address: { type: String, required: true },
});

// Models
const Cost = mongoose.model("Cost", CostSchema);
const Employee = mongoose.model("Employee", EmployeeSchema);
const TaxForm = mongoose.model("TaxForm", TaxFormSchema);

// Middleware for Debugging Requests
app.use((req, res, next) => {
  console.log(`[DEBUG] ${req.method} request to ${req.url}`);
  console.log("Request body:", req.body);
  next();
});

// Routes for Cost Management

// Create New Cost Entry
app.post("/costs", async (req, res) => {
  let cost;
  try {
    cost = new Cost(req.body);
    const savedCost = await cost.save();
    res.status(201).json(savedCost);
  } catch (err) {
    console.error("Error creating cost entry:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (cost) {
      console.log("Cost entry operation completed");
    }
  }
});

// Get All Costs - Updated to sort and group by date
app.get("/costs", async (req, res) => {
  try {
    const costs = await Cost.find().sort({ date: -1 }); // Sort by date in descending order

    // Group costs by today, yesterday, and older dates
    const groupCostsByDate = (data) => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const todayData = [];
      const yesterdayData = [];
      const olderData = [];

      data.forEach((cost) => {
        const costDate = new Date(cost.date);

        if (costDate.toDateString() === today.toDateString()) {
          todayData.push(cost);
        } else if (costDate.toDateString() === yesterday.toDateString()) {
          yesterdayData.push(cost);
        } else {
          olderData.push(cost);
        }
      });

      return { todayData, yesterdayData, olderData };
    };

    const { todayData, yesterdayData, olderData } = groupCostsByDate(costs);

    res.json([...todayData, ...yesterdayData, ...olderData]); // Return grouped data
  } catch (err) {
    console.error("Error fetching costs:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update Cost Entry
app.put("/costs/:id", async (req, res) => {
  let updatedCost;
  try {
    updatedCost = await Cost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCost) {
      return res.status(404).json({ error: "Cost entry not found" });
    }
    res.json(updatedCost);
  } catch (err) {
    console.error("Error updating cost entry:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (updatedCost) {
      console.log("Cost entry update completed");
    }
  }
});

// Delete Cost Entry
app.delete("/costs/:id", async (req, res) => {
  let deletedCost;
  try {
    deletedCost = await Cost.findByIdAndDelete(req.params.id);
    if (!deletedCost) {
      return res.status(404).json({ error: "Cost entry not found" });
    }
    res.json({ message: "Cost entry deleted successfully" });
  } catch (err) {
    console.error("Error deleting cost entry:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (deletedCost) {
      console.log("Cost entry deletion completed");
    }
  }
});

// Routes for Employee Management

// Create Employee
app.post("/employees", async (req, res) => {
  let employee;
  try {
    employee = new Employee(req.body);
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (employee) {
      console.log("Employee entry operation completed");
    }
  }
});

// Read All Employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update Employee
app.put("/employees/:id", async (req, res) => {
  let updatedEmployee;
  try {
    updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(updatedEmployee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (updatedEmployee) {
      console.log("Employee entry update completed");
    }
  }
});

// Delete Employee
app.delete("/employees/:id", async (req, res) => {
  let deletedEmployee;
  try {
    deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (deletedEmployee) {
      console.log("Employee entry deletion completed");
    }
  }
});

// Routes for TaxForm Management

// Create TaxForm Entry
app.post("/tax-form", async (req, res) => {
  let taxForm;
  try {
    taxForm = new TaxForm(req.body);
    const savedTaxForm = await taxForm.save();
    res.status(201).json(savedTaxForm);
  } catch (err) {
    console.error("Error creating tax form:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (taxForm) {
      console.log("Tax form operation completed");
    }
  }
});

// Fetch All TaxForms
app.get("/tax-form", async (req, res) => {
  try {
    const taxForms = await TaxForm.find();
    res.json(taxForms);
  } catch (err) {
    console.error("Error fetching tax forms:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete TaxForm Entry
app.delete("/tax-form/:id", async (req, res) => {
  let deletedTaxForm;
  try {
    deletedTaxForm = await TaxForm.findByIdAndDelete(req.params.id);
    if (!deletedTaxForm) {
      return res.status(404).json({ error: "Tax form not found" });
    }
    res.json({ message: "Tax form deleted successfully" });
  } catch (err) {
    console.error("Error deleting tax form:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (deletedTaxForm) {
      console.log("Tax form deletion completed");
    }
  }
});

// Update TaxForm Entry
app.put("/tax-form/:id", async (req, res) => {
  let updatedTaxForm;
  try {
    updatedTaxForm = await TaxForm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTaxForm) {
      return res.status(404).json({ error: "Tax form not found" });
    }
    res.json(updatedTaxForm);
  } catch (err) {
    console.error("Error updating tax form:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (updatedTaxForm) {
      console.log("Tax form update completed");
    }
  }
});



const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true }, // content instead of description
  type: { type: String, required: true },
  notes: { type: String }, // For pooja notes (if applicable)
  imageSrc: { type: String }, // For image upload
});

const Note = mongoose.model("Note", noteSchema);




// Mongoose schema for Poojas
const poojaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String, required: false },
  content: { type: String, required: false },  // For notes and pooja content
  type: { type: String, default: "pooja" },
  imageSrc: { type: String }, // Path to the image file
});

const Pooja = mongoose.model("Pooja", poojaSchema);


// Multer Storage Setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Ensure the uploads directory exists
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Add timestamp to avoid duplicate filenames
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// POST route for adding Notes or Poojas
app.post("/dashboard/notes", upload.single("image"), async (req, res) => {
  try {
    // Extract fields from the request body
    const { title, date, content, type, notes } = req.body; // Use content instead of description
    const imageSrc = req.file ? `/uploads/${req.file.filename}` : null; // Handle image upload

    // Choose the model based on the type of entry (note or pooja)
    const Model = type === "pooja" ? Pooja : Note;

    // Create a new entry using the appropriate model
    const newEntry = new Model({
      title,
      date,
      content,  // Store content instead of description
      type,
      notes,
      imageSrc,
    });

    // Save the new entry to the database
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry); // Return the saved entry as a response
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).json({ error: "Failed to create entry. Please try again." });
  }
});


// GET route to fetch Notes and Poojas
app.get("/dashboard/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    const poojas = await Pooja.find();
    res.status(200).json([...notes, ...poojas]);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ error: "Failed to fetch entries." });
  }
});

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  before: {
    type: Number,
    required: true,
  },
  used: {
    type: Number,
    default: 0,
  },
  added: {
    type: Number,
    default: 0,
  },
  inStock: {
    type: Number,
    required: true,
  },
  minStock: {
    type: Number,
    required: true,
  },
});

const Stock = mongoose.model("Stock", stockSchema);





// Get all stock items by branch
app.get("/api/stock/:branch", async (req, res) => {
  const { branch } = req.params;
  try {
    const stockItems = await Stock.find({ branch });
    res.json(stockItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stock items" });
  }
});

// Add new stock item
app.post("/api/stock/add", async (req, res) => {
  const { name, branch, category, before, inStock, minStock } = req.body;

  // Log the received data to ensure it's being sent correctly
  console.log("Received data:", { name, branch, category, before, inStock, minStock });

  // Optional: Check if any required fields are missing
  if (!name || !branch || !category || !before || !inStock || !minStock) {
    console.log("Missing required fields.");
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newStock = new Stock({
      name,
      branch,
      category,
      before,
      inStock,
      minStock,
    });
    
    const savedStock = await newStock.save();
    
    // Log the saved stock item to ensure it's being saved correctly
    console.log("Stock item saved:", savedStock);

    res.json(savedStock);
  } catch (err) {
    console.error("Error while saving stock item:", err);
    res.status(500).json({ error: "Failed to add stock item" });
  }
});


// Update stock item (used and added quantities)
// Update stock item (used and added)
app.put("/api/stock/update/:id", async (req, res) => {
  const { used, added } = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId" });
  }

  try {
    // Find the stock item by ID
    const stockItem = await Stock.findById(id);
    
    if (!stockItem) {
      return res.status(404).json({ error: "Stock item not found" });
    }

    // Update the `inStock` and `before` values
    const newInStock = stockItem.inStock - used + added;
    const newBefore = stockItem.inStock;

    stockItem.inStock = newInStock;
    stockItem.before = newBefore;

    // Save the updated stock item
    await stockItem.save();

    res.json(stockItem);
  } catch (err) {
    console.error("Error updating stock item:", err);
    res.status(500).json({ error: "Failed to update stock item" });
  }
});

const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  inStock: Number,
  // Other fields based on your schema
});

const Item = mongoose.model('Item', itemSchema, 'stocks');



app.put('/api/stock/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, inStock } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id, 
      { name, category, inStock }, 
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});








// Error Middleware for Debugging
app.use((err, req, res, next) => {
  console.error("[ERROR] Uncaught error:", err);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// Start Server

app.listen(PORT, () => {
  console.log(`[DEBUG] Server running on port ${PORT}`);
});