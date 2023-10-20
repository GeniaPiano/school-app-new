-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               10.4.28-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Zrzut struktury bazy danych school_app_db
CREATE DATABASE IF NOT EXISTS `school_app_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `school_app_db`;

-- Zrzut struktury tabela school_app_db.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `id` varchar(36) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(40) NOT NULL,
  `role` varchar(6) NOT NULL DEFAULT 'admin',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli school_app_db.admin: ~1 rows (około)
INSERT INTO `admin` (`id`, `password`, `email`, `role`) VALUES
	('asdkfjhgk2j432543asd', '$2a$10$UmeWXznU56QhGoWwucmxYeGWfIp3mpKk9M/17DCTU1SUCT/cVnf76', 'admin@admin.com', 'admin');

-- Zrzut struktury tabela school_app_db.courses
CREATE TABLE IF NOT EXISTS `courses` (
  `id` varchar(36) NOT NULL,
  `name` varchar(40) NOT NULL,
  `teacher_id` varchar(36) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` int(5) NOT NULL,
  `photoUrl` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli school_app_db.courses: ~10 rows (około)
INSERT INTO `courses` (`id`, `name`, `teacher_id`, `description`, `price`, `photoUrl`) VALUES
	('0a95c9a3-ac83-4f32-a4a0-001f6a2cb5ca', 'Joga', '58d40a8c-dda8-4e98-9b18-250153464201', 'JOGA is a three dimensional movement system that hybrids the science of yoga with the biomechanics of sports movement. JOGA cultivates results as it optimizes the human system : essentially we have hacked traditional yoga and created a system that thrives on efficiency, results and optimal human performance.', 40, 'https://www.datocms-assets.com/107048/1697483765-dance-studio-5.png'),
	('0c35ece1-ca1c-4bb0-bd04-ebf29613b6df', 'Brodway dance ', 'd28de20c-632c-4195-94f7-e4256eb99c45', NULL, 50, 'https://www.datocms-assets.com/107048/1697483782-dance-studio-2.png'),
	('10da00d0-630d-44b0-a482-9353ca7882b7', 'Pilates', NULL, NULL, 40, 'https://www.datocms-assets.com/107048/1697483765-dance-studio-5.png'),
	('2d5cc783-e524-40e7-9fa0-395f68723a1d', 'latino', '520b229e-514c-4289-8176-19843131b7f0', NULL, 50, 'https://www.datocms-assets.com/107048/1697484069-dance-studio-10.png'),
	('457a2163-0444-41fa-af8d-8a1e51f2bcf4', 'pole dance', NULL, NULL, 50, 'https://www.datocms-assets.com/107048/1697483793-dance-studio.png'),
	('4d4c4843-ef6d-4523-8dce-9073c809471c', 'jiu jitsu', '520b229e-514c-4289-8176-19843131b7f0', NULL, 40, 'https://www.datocms-assets.com/107048/1697484074-dance-studio-9.png'),
	('5fc8688b-9acf-4821-8501-90603bfc65bc', 'break dance', '520b229e-514c-4289-8176-19843131b7f0', NULL, 50, 'https://www.datocms-assets.com/107048/1697483776-dance-studio-3.png'),
	('6bbe603b-ea15-48ec-b161-d93d3fb30b7e', 'hip hop', NULL, NULL, 50, 'https://www.datocms-assets.com/107048/1697483770-dance-studio-4.png'),
	('75b09ce2-e107-4706-b295-4cfad485c253', 'karate', NULL, NULL, 40, 'https://www.datocms-assets.com/107048/1697484138-dance-studio-12.png'),
	('adb40db3-05f8-4c5d-b760-b24fd212ebd1', 'judo', 'fb1b7dd1-9205-448e-9065-4e75de552b61', NULL, 40, 'https://www.datocms-assets.com/107048/1697484145-dance-studio-11.png');

-- Zrzut struktury tabela school_app_db.courses_students
CREATE TABLE IF NOT EXISTS `courses_students` (
  `id` varchar(36) NOT NULL,
  `course_id` varchar(36) NOT NULL,
  `student_id` varchar(36) NOT NULL,
  `startedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `courses_students_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  CONSTRAINT `courses_students_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli school_app_db.courses_students: ~7 rows (około)
INSERT INTO `courses_students` (`id`, `course_id`, `student_id`, `startedAt`) VALUES
	('47nf57vn75v5b59ge9', '75b09ce2-e107-4706-b295-4cfad485c253', '535bb083-4291-4962-bb63-03496a82b73a', '2023-10-19'),
	('4tfe88yg03948th45gtrh', '4d4c4843-ef6d-4523-8dce-9073c809471c', '49b98916-f74e-4c15-b650-669a3652ed42', '2023-10-08'),
	('5v5g4e9hg0weurg0t98t4t', '6bbe603b-ea15-48ec-b161-d93d3fb30b7e', 'e3e8e231-0c2e-4003-9b7c-fc2b258e0d97', '2023-10-17'),
	('asdb44rff77gdsdsssddff', '0c35ece1-ca1c-4bb0-bd04-ebf29613b6df', '3e3e6e95-5e71-40a3-8ae6-c790c1fa0689', '2023-10-16'),
	('djfhvbf8fuifnj4kltglnbdrsfdc', '0a95c9a3-ac83-4f32-a4a0-001f6a2cb5ca', '3e3e6e95-5e71-40a3-8ae6-c790c1fa0689', '2023-10-06'),
	('dzfzsd8fhv394hv93874cirawefsrg', '2d5cc783-e524-40e7-9fa0-395f68723a1d', 'f8ea52bd-7a31-49f5-b12d-13859f55427c', '2023-10-17'),
	('v5t498ghegw09j9fjq3rgwrtg', '2d5cc783-e524-40e7-9fa0-395f68723a1d', '49b98916-f74e-4c15-b650-669a3652ed42', '2023-10-18');

-- Zrzut struktury tabela school_app_db.courses_students_history
CREATE TABLE IF NOT EXISTS `courses_students_history` (
  `id` varchar(36) NOT NULL,
  `student_id` varchar(36) NOT NULL,
  `course_id` varchar(36) NOT NULL,
  `finishedAt` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli school_app_db.courses_students_history: ~0 rows (około)

-- Zrzut struktury tabela school_app_db.courses_teachers
CREATE TABLE IF NOT EXISTS `courses_teachers` (
  `id` varchar(36) NOT NULL,
  `course_id` varchar(36) NOT NULL,
  `teacher_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`teacher_id`) USING BTREE,
  CONSTRAINT `courses_teachers_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli school_app_db.courses_teachers: ~5 rows (około)
INSERT INTO `courses_teachers` (`id`, `course_id`, `teacher_id`) VALUES
	('1364281d-3f6c-4f91-85a7-040061fbc068', '4d4c4843-ef6d-4523-8dce-9073c809471c', '520b229e-514c-4289-8176-19843131b7f0'),
	('2d135e46-36cb-435f-be85-a75bfd617434', '0a95c9a3-ac83-4f32-a4a0-001f6a2cb5ca', '58d40a8c-dda8-4e98-9b18-250153464201'),
	('658aaef0-316a-465a-b4fa-1e6eb8a1afc8', '0c35ece1-ca1c-4bb0-bd04-ebf29613b6df', 'd28de20c-632c-4195-94f7-e4256eb99c45'),
	('9be99a44-9dde-410b-9866-173078867774', '5fc8688b-9acf-4821-8501-90603bfc65bc', '520b229e-514c-4289-8176-19843131b7f0'),
	('ed5b7b05-fe1f-41ba-ae79-229ca7a3cf51', '2d5cc783-e524-40e7-9fa0-395f68723a1d', '520b229e-514c-4289-8176-19843131b7f0');

-- Zrzut struktury tabela school_app_db.course_student_rates
CREATE TABLE IF NOT EXISTS `course_student_rates` (
  `id` varchar(36) NOT NULL,
  `course_id` varchar(36) NOT NULL,
  `student_id` varchar(36) NOT NULL,
  `stars` tinyint(1) NOT NULL,
  `opinion` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli school_app_db.course_student_rates: ~0 rows (około)

-- Zrzut struktury tabela school_app_db.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` varchar(36) NOT NULL,
  `heading` varchar(100) NOT NULL,
  `content` text DEFAULT NULL,
  `authorId` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli school_app_db.posts: ~0 rows (około)

-- Zrzut struktury tabela school_app_db.students
CREATE TABLE IF NOT EXISTS `students` (
  `id` varchar(36) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `last_name` varchar(40) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(64) NOT NULL,
  `role` varchar(7) NOT NULL DEFAULT 'student',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli school_app_db.students: ~7 rows (około)
INSERT INTO `students` (`id`, `name`, `last_name`, `email`, `password`, `role`) VALUES
	('3e3e6e95-5e71-40a3-8ae6-c790c1fa0689', 'Test', 'User', 'test@test.com', '$2a$10$mxRh0Btqnc.PBPk7jW4RduqHur7fwIE1J4vDzmFug3XEaHpWqacxK', 'student'),
	('49b98916-f74e-4c15-b650-669a3652ed42', 'Krzysztof', 'Kolanko', 'krzychu@gmail.com', '$2a$10$u7fuL6pkOlrYYkJcuyhelunHar9OYplnpmtG4lcOBKGsx2Ph3OafG', 'student'),
	('535bb083-4291-4962-bb63-03496a82b73a', 'Anna', 'Wolińska', 'ania@gmail.com', '$2a$10$84t8JEfTsEyaTXJwPocSx.lodNUzaHo9T9CKQciQDpCxTUJgoggV2', 'student'),
	('9be30e5e-3b06-47ad-a71e-13b67330d9ed', 'Sonia', 'Wiatraczek', 'sonia@gmail.com', '$2a$10$wvk2TaO5JhRqaVhFSu6xQuRGemyphPY97jz2WUu9pdsX/02UIW3Dq', 'student'),
	('c581685e-822e-487b-b6f4-31526787d2f3', 'Weronika', 'Liczko', 'wero@gmail.com', '$2a$10$3JFVcyNS9hKZswPlJHvJluj8vihixJ/2JeKhKEpl2OR5UigQcyYYm', 'student'),
	('e3e8e231-0c2e-4003-9b7c-fc2b258e0d97', 'Katarzyna', 'Kornacka', 'kati@gmail.com', '$2a$10$xOQVI3/cicNMuJYTuNBCruBI6l0lzGfCMz3Z/O/atHn5o1Hj5ADO6', 'student'),
	('f8ea52bd-7a31-49f5-b12d-13859f55427c', 'Adam ', 'Walczak', 'adam@gmail.com', '$2a$10$CEccczrO/7r.CHsKbtTwnOO5my6jfDL4G4s7Nw1Fa2ZWLtwgLACzO', 'student');

-- Zrzut struktury tabela school_app_db.teachers
CREATE TABLE IF NOT EXISTS `teachers` (
  `id` varchar(36) NOT NULL,
  `name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(64) NOT NULL,
  `role` varchar(7) NOT NULL DEFAULT 'teacher',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli school_app_db.teachers: ~7 rows (około)
INSERT INTO `teachers` (`id`, `name`, `last_name`, `email`, `password`, `role`) VALUES
	('520b229e-514c-4289-8176-19843131b7f0', 'Stanisław', 'Nowak', 'stas@gmail.com', '$2a$10$YSyJmMNP1RDMbQFa/jrR8egcfIQ5dCKlFv8WgUI2MaXDwzJPIC7Ne', 'teacher'),
	('58d40a8c-dda8-4e98-9b18-250153464201', 'Katarzyna', 'Molewicz', 'kasi@gamil.com', '$2a$10$JiM4XKS1BoYMgP0eK/NnKO9WjLS7JeU/.TNfZ6XmjpD4eDNcgMwmm', 'teacher'),
	('c29748a3-ebf4-4b9c-bf21-1bce02410e66', 'Luiza', 'Boruska', 'patryk@asd', '$2a$10$rTe4a/u58tKhccNHvK6nCeHAkTbQGkvF.Dj3aWnB6BMDKfZoX8O9K', 'teacher'),
	('c9daa121-75aa-42ba-9eaa-f1a87c166ba1', 'Jan', 'Smoczyński', 'smoczke@gmail.com', '$2a$10$Nl.h/a0QIlS8l1eScR4UlOX/62Q6UiBg.sbG2ZrMdddTQs5.A5RNK', 'teacher'),
	('d28de20c-632c-4195-94f7-e4256eb99c45', 'Karolina', 'Koszalińska', 'kor@kar', '$2a$10$UIWqyxVQFUZq8JrTsftD4Ovhl97O7L/m.tD4oUa1trzNcw.CRPXEi', 'teacher'),
	('fb1b7dd1-9205-448e-9065-4e75de552b61', 'Kamil', 'Szor', 'kam2szor@', '$2a$10$8HPIwg8pkZheLXBe118H6e8oYivgcrM/XDXufQtwFr9T7A5jprTJ2', 'teacher');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
