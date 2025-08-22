import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM posts";
    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    }); 
}

export const getPost = (req, res) => {
    const q = `
      SELECT u.username, p.title, p.\`desc\`, p.img AS postImg, p.cat, p.uid, u.img AS userImg
      FROM users u
      JOIN posts p ON u.id = p.uid
      WHERE p.id = ?
    `;
  
    db.query(q, [req.params.id], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(data[0]);
    });
  };
  

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("SQL Error:", err);  // log đầy đủ
            return res.status(500).json({ error: err.message });
          }
          return res.json({insertId: data.insertId});
    });
  });
}

export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const q = "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ? WHERE `id` = ?";
        const values = [req.body.title, req.body.desc, req.body.img];
            db.query(q, [...values, req.params.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been updated.");
        });
    });
}

export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been deleted.");
        });
    });
}

export const getPostsByUserId = (req, res) => {
    const q = "SELECT * FROM posts WHERE `uid` = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}