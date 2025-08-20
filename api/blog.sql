-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `desc` varchar(1000) NOT NULL,
  `img` varchar(255) NOT NULL,
  `uid` int NOT NULL,
  `cat` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid_idx` (`uid`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Art','Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quas.','https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',4,'art'),(2,'science','Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quas.','https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',2,'science'),(3,'technology','Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quas.','https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',3,'technology'),(4,'art 2','Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quas.','https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',2,'art'),(5,'bbbbbbbbbbbbb','aaaaaaaaaaa','http://localhost:8081/uploads/1755642889800-1.JPG',4,'Art'),(6,'testttttttttttt','sssssssssss','http://localhost:8081/uploads/1755643150258-2.JPG',4,'Art'),(7,'aaaaaa','aaaaaaaaaaaaaa','http://localhost:8081/uploads/1755643375282-main_avartar.jpg',4,'Food'),(8,'tesssssst','aaaaaaaaaaahn','http://localhost:8081/uploads/http://localhost:8081/uploads/1755646269011-avatar.jpg',4,'Art'),(9,'heeeeeeeee','aaaaaaaaa','http://localhost:8081/uploads/http://localhost:8081/uploads/1755646330340-2.JPG',4,'Art'),(10,'1111111','11111111111111','http://localhost:8081/uploads/1755647710515-2.JPG',4,'Art'),(11,'aaaaaaa','111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111','http://localhost:8081/uploads/1755646538455-id.JPG',4,'Art');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'kietdo172','kietdo172@gmail.com','123456',NULL),(3,'kietdo173','kietdo174@gmail.com','111111',NULL),(4,'kietdo175','kietdo175@gmail.com','$2b$10$gdqTPAUyIBIUOvyaSky5he/YA9yS9c73MzhmMHmyK.KhiMQOu8NXm','https://randomuser.me/api/portraits/men/32.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-20 15:24:56
