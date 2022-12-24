const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const jobsRoutes = require("./routes/jobs");
const userRoutes = require("./routes/user");

const Job = require("./models/job");
const Customer = require("./models/customer")
const Part = require("./models/part")

const app = express();

mongoose
  .connect(
    "mongodb+srv://admin:fIBvkN1DVbjQwg9Y@ccacheating.pmwelpi.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/jobs", jobsRoutes)
app.use("/api/user", userRoutes)


///////////////////////////////////////////////
// JOBS
///////////////////////////////////////////////




///////////////////////////////////////////////
// CUSTOMERS
///////////////////////////////////////////////


// Create a Cutomers
app.post("/api/customers", (req, res, next) => {
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address
  });
  customer.save().then(createdCustomer => {
    res.status(201).json({
      message: "Customer added successfully!",
      customerId: createdCustomer._id
    });
  });
});

// Get all customers
app.get("/api/customers", (req, res, next) => {
  Customer.find().then((documents) => {
    res.status(200).json({
      message: "Customers fetched successfully!",
      customers: documents,
    });
  });
});

// Delete customer by id
app.delete("/api/customers/:id", (req, res, next) => {
  Customer.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Customer deleted!" });
  });
});


///////////////////////////////////////////////
// PARTS
///////////////////////////////////////////////

// Create a Part
app.post("/api/parts", (req, res, next) => {
  const part = new Part({
    partName: req.body.partName,
    cost: req.body.cost,
  });
  part.save().then(createdPart => {
    res.status(201).json({
      message: "Part added successfully!",
      partId: createdPart._id
    });
  });
});

// Get all parts
app.get("/api/parts", (req, res, next) => {
  Part.find().then((documents) => {
    res.status(200).json({
      message: "Parts fetched successfully!",
      parts: documents,
    });
  });
});

// Delete part by id
app.delete("/api/parts/:id", (req, res, next) => {
  console.log(req.params.id)
  Part.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Part deleted!" });
  });
});

module.exports = app;
