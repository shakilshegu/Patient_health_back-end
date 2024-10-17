const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/DBconnection");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3009;
const cors = require("cors");

const adminRoute = require("./routes/admin");
const patientRoutes = require('./routes/patientRoutes');


connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const allowedOrigins = process.env.CLIENT_URLS

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use("/",adminRoute);
app.use('/api/patients', patientRoutes);


app.listen(PORT, () => {
    console.log(`server connected ${PORT}`);
  });