const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
require('dotenv').config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Port = 3000;
app.listen(Port, '0.0.0.0', () => {
    console.log(`Server started on port ${Port}`);
});

app.get("/", async (req, res) => {
    res.render("index.ejs", { page: "home" });
});

app.get("/project", (req, res) => {
    res.render("project.ejs", { page: "project" });
});

app.get("/resume", (req, res) => {
    res.render("resume.ejs", { page: "resume" });
});

app.get("/skills", (req, res) => {
    res.render("skills.ejs", { page: "skills" });
});

app.get("/about", (req, res) => {
    res.render("about.ejs", { page: "about" });
});

app.get("/contact", (req, res) => {
  res.render('contact.ejs', { success: req.query.success, page: "contact" });
});

app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSW,
        },
    });

    const mailOptions = {
        from: process.env.MY_EMAIL,
        to: process.env.MY_PASSW,
        subject: 'Contact Form Message',
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`,
        replyTo: req.body.email
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully");
        res.redirect('/contact?success=true');
    } catch (error) {
        console.error("Email error:", error);
        res.redirect('/contact?success=false');
    }
});