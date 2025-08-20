import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    //CHECK EXISTING USER
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  
        db.query(q, [req.body.email, req.body.username], (err, data) => {
            if (err) return res.status(500).json("Database error occurred");
            if (data.length) return res.status(409).json("User already exists!");

      //Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?,?,?)";
      const values = [req.body.username, req.body.email, hash];

      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json("Failed to create user");
        return res.status(201).json("User created successfully");
      });
    });
  };

export const login = (req, res) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
        return res.status(400).json("Username/email and password are required");
    }

    // Find user by username or email
    const q = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(q, [usernameOrEmail, usernameOrEmail], (err, data) => {
        if (err) return res.status(500).json("Database error occurred");
        if (data.length === 0) {
            return res.status(404).json("User not found");
        }

        const user = data[0];

        // Compare password
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong password or credentials");
        }

        const token = jwt.sign({ id: user.id }, "secretkey");
        const { password: _, ...userWithoutPassword } = user;
        res
          .cookie("access_token", token, {
              httpOnly: true,
          })
          .status(200)
          .json(userWithoutPassword);
    });
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    }).status(200).json("User logged out successfully");
}