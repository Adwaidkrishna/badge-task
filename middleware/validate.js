module.exports = (req, res, next) => {
const { name,email, password } = req.body;

  if (! /^[A-Za-z ]+$/.test(name)) {
    return res.status(400).json({ message: "Name should contain only letters"});
  }
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!email.includes("@gmail.com")) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be 8 characters" });
  }
  if (!/[!@#$]/.test(password)) {
    return res.status(400).json({ message: "use specail passwrd" })
  }


  next();
};