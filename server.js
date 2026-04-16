const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// FILE PATH FIX
const filePath = path.join(__dirname, "data.json");

// SAVE DATA
app.post("/contact", (req, res) => {
    try {
        const { name, mobile, message } = req.body;

        const newData = { name, mobile, message };

        // read file safely
        let data = [];

        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            data = fileContent ? JSON.parse(fileContent) : [];
        }

        // push new data
        data.push(newData);

        // write file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        console.log("✅ DATA SAVED:", newData);

        res.json({ message: "Saved Successfully" });

    } catch (err) {
        console.error("❌ ERROR:", err);
        res.status(500).json({ error: "Error saving data" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});