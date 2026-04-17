const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve frontend
app.use(express.static(path.join(__dirname)));

// FILE PATH
const filePath = path.join(__dirname, "data.json");

// API
app.post("/contact", (req, res) => {
    try {
        const { name, mobile, message } = req.body;

        const newData = { name, mobile, message };

        let data = [];

        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            data = fileContent ? JSON.parse(fileContent) : [];
        }

        data.push(newData);

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        console.log("✅ DATA SAVED:", newData);

        res.json({ message: "Saved Successfully" });

    } catch (err) {
        console.error("❌ ERROR:", err);
        res.status(500).json({ error: "Error saving data" });
    }
});

// ✅ IMPORTANT FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
