-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for buku_db
CREATE DATABASE IF NOT EXISTS `buku_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `buku_db`;

-- Dumping structure for table buku_db.buku
CREATE TABLE IF NOT EXISTS `buku` (
  `id` int NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) NOT NULL,
  `penulis` varchar(255) NOT NULL,
  `tahun` int NOT NULL,
  `kategori_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table buku_db.buku: ~2 rows (approximately)
DELETE FROM `buku`;
INSERT INTO `buku` (`id`, `judul`, `penulis`, `tahun`, `kategori_id`) VALUES
	(2, 'fsfs gfdg', '234', 3445, NULL),
	(4, 'sdfds', 'sdfsdf', 33333, NULL);

-- Dumping structure for table buku_db.kategori
CREATE TABLE IF NOT EXISTS `kategori` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kategori` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table buku_db.kategori: ~2 rows (approximately)
DELETE FROM `kategori`;
INSERT INTO `kategori` (`id`, `kategori`) VALUES
	(2, 'dsfdsf dssdfds'),
	(4, 'vsdvsdvds mgfbd');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
