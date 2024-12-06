const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Setup koneksi ke MySQL
const db = mysql.createConnection({
  host: "localhost",  // ganti dengan host database Anda
  user: "root",       // ganti dengan username database Anda
  password: "",       // ganti dengan password database Anda
  database: "buku_db", // ganti dengan nama database Anda
});

// Test koneksi
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/api/buku", (req, res) => {
    db.query("SELECT * FROM buku", (err, results) => {
        if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).send("Internal Server Error");
        }
        res.json(results);
    });
});
  
  // API untuk menambah data buku
app.post("/api/buku", (req, res) => {
    const { judul, penulis, tahun } = req.body;
    db.query(
        "INSERT INTO buku (judul, penulis, tahun) VALUES (?, ?, ?)",
        [judul, penulis, tahun],
        (err, results) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.status(201).send("Buku ditambahkan");
        }
    );
});
  
  // API untuk memperbarui data buku
app.put("/api/buku/:id", (req, res) => {
    const { judul, penulis, tahun } = req.body;
    db.query(
        "UPDATE buku SET judul = ?, penulis = ?, tahun = ? WHERE id = ?",
        [judul, penulis, tahun, req.params.id],
        (err, results) => {
        if (err) {
            console.error("Error updating data:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.send("Buku diperbarui");
        }
    );
});
  
  // API untuk menghapus data buku
app.delete("/api/buku/:id", (req, res) => {
    db.query("DELETE FROM buku WHERE id = ?", [req.params.id], (err, results) => {
        if (err) {
        console.error("Error deleting data:", err);
        return res.status(500).send("Internal Server Error");
        }
        res.send("Buku dihapus");
    });
});


// API untuk menampilkan data kategori
app.get("/api/kategori", (req, res) => {
    db.query("SELECT * FROM kategori", (err, results) => {
        if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).send("Internal Server Error");
        }
        res.json(results);
    });
});
  
  // API untuk menambah data kategori
app.post("/api/kategori", (req, res) => {
    const { kategori } = req.body;
    db.query(
        "INSERT INTO kategori (kategori) VALUES (?)",
        [kategori],
        (err, results) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.status(201).send("kategori ditambahkan");
        }
    );
});
  
  // API untuk memperbarui data kategori
app.put("/api/kategori/:id", (req, res) => {
    const { kategori } = req.body;
    db.query(
        "UPDATE kategori SET kategori = ? WHERE id = ?",
        [kategori, req.params.id],
        (err, results) => {
        if (err) {
            console.error("Error updating data:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.send("kategori diperbarui");
        }
    );
});
  
  // API untuk menghapus data kategori
app.delete("/api/kategori/:id", (req, res) => {
    db.query("DELETE FROM kategori WHERE id = ?", [req.params.id], (err, results) => {
        if (err) {
        console.error("Error deleting data:", err);
        return res.status(500).send("Internal Server Error");
        }
        res.send("kategori dihapus");
    });
});
  

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
