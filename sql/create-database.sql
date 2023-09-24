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
  `role` varchar(6) NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli school_app_db.admin: ~0 rows (około)
INSERT INTO `admin` (`id`, `password`, `email`, `role`) VALUES
	('asdkfjhgk2j432543asd', '$2a$10$Aj6PG6Yvf2tKo2XeKP.yc..N5BXjq0KvrLa0lvl7igoyGykE.0iEG', 'admin@admin.com', 'admin');

-- Zrzut struktury tabela school_app_db.courses
CREATE TABLE IF NOT EXISTS `courses` (
  `id` varchar(36) NOT NULL,
  `name` varchar(40) NOT NULL,
  `teacher_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli school_app_db.courses: ~10 rows (około)
INSERT INTO `courses` (`id`, `name`, `teacher_id`) VALUES
	('75b09ce2-e107-4706-b295-4cfad485c253', 'karate kyokushin', NULL),
	('2d5cc783-e524-40e7-9fa0-395f68723a1d', 'Musical sing', '520b229e-514c-4289-8176-19843131b7f0'),
	('adb40db3-05f8-4c5d-b760-b24fd212ebd1', 'Tenis', 'fb1b7dd1-9205-448e-9065-4e75de552b61'),
	('0c35ece1-ca1c-4bb0-bd04-ebf29613b6df', 'Brodway dance ', 'd28de20c-632c-4195-94f7-e4256eb99c45'),
	('457a2163-0444-41fa-af8d-8a1e51f2bcf4', 'Piłka nożna', NULL),
	('5fc8688b-9acf-4821-8501-90603bfc65bc', 'Ukulele', NULL),
	('0a95c9a3-ac83-4f32-a4a0-001f6a2cb5ca', 'Joga', '58d40a8c-dda8-4e98-9b18-250153464201'),
	('6bbe603b-ea15-48ec-b161-d93d3fb30b7e', 'Choire', NULL),
	('4d4c4843-ef6d-4523-8dce-9073c809471c', 'Pianino', '520b229e-514c-4289-8176-19843131b7f0'),
	('10da00d0-630d-44b0-a482-9353ca7882b7', 'Pilates', NULL);

-- Zrzut struktury tabela school_app_db.courses_students
CREATE TABLE IF NOT EXISTS `courses_students` (
  `id` varchar(36) NOT NULL,
  `course_id` varchar(36) NOT NULL,
  `student_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli school_app_db.courses_students: ~22 rows (około)
INSERT INTO `courses_students` (`id`, `course_id`, `student_id`) VALUES
	('c8bf6964-1adb-4d1e-942c-ec56766bc9f9', '457a2163-0444-41fa-af8d-8a1e51f2bcf4', 'e27358ff-50a2-4bef-a1fe-1d3075514f2f'),
	('57d424ed-5e80-4279-8e80-2eaec828831b', '75b09ce2-e107-4706-b295-4cfad485c253', '8ba573a2-581a-4bdd-922a-17f37fe20c75'),
	('0af89755-a1a5-4474-ab8f-08570cff134b', '457a2163-0444-41fa-af8d-8a1e51f2bcf4', '8ba573a2-581a-4bdd-922a-17f37fe20c75'),
	('f7e4a72f-3d74-4967-a86b-2fa8660be86b', '2d5cc783-e524-40e7-9fa0-395f68723a1d', '8ba573a2-581a-4bdd-922a-17f37fe20c75'),
	('0a2e062a-ad86-4eb9-ad9c-cb3b021c98ee', '457a2163-0444-41fa-af8d-8a1e51f2bcf4', '84d2d7a6-b7c6-4a15-9b4c-924d304b1beb'),
	('2e6b065e-96c0-4520-8720-136238acccd7', '0c35ece1-ca1c-4bb0-bd04-ebf29613b6df', '5bde42cc-b02f-447d-a7ee-e584aec86bd0'),
	('8928d819-1c24-4089-8428-1fabf3a0b905', '2d5cc783-e524-40e7-9fa0-395f68723a1d', '5bde42cc-b02f-447d-a7ee-e584aec86bd0'),
	('3317ef89-ef75-491f-bf6c-45660392f105', '0c35ece1-ca1c-4bb0-bd04-ebf29613b6df', '8aa6cf5a-1f63-487d-abe8-c8a816007b20'),
	('10573359-bc5f-4ec0-a63c-9729663a21f9', 'adb40db3-05f8-4c5d-b760-b24fd212ebd1', '7f37c165-8b72-4fac-98f7-7c27dade7186'),
	('c9b63db8-aa2e-426e-9494-f6f92d19c706', '4d4c4843-ef6d-4523-8dce-9073c809471c', '65cdbdd1-fcbb-4b09-b233-f89c9b785f9e'),
	('e26aca53-d710-4431-a155-5d5997447b29', 'adb40db3-05f8-4c5d-b760-b24fd212ebd1', '65cdbdd1-fcbb-4b09-b233-f89c9b785f9e'),
	('a2b0585c-6cd6-4291-bd17-6c01fcae48ac', '2d5cc783-e524-40e7-9fa0-395f68723a1d', '65cdbdd1-fcbb-4b09-b233-f89c9b785f9e'),
	('d0e15de4-419c-4a02-b442-4331fe687fb5', '75b09ce2-e107-4706-b295-4cfad485c253', '0fd81e14-27b9-469f-9ee6-c59f622d5c2f'),
	('4caeaa7d-8782-4245-b010-91424901dcb0', '5fc8688b-9acf-4821-8501-90603bfc65bc', '0fd81e14-27b9-469f-9ee6-c59f622d5c2f'),
	('5ae55179-3a42-4aa7-98c4-2e0ef26268e7', '6bbe603b-ea15-48ec-b161-d93d3fb30b7e', '0fd81e14-27b9-469f-9ee6-c59f622d5c2f'),
	('7e118e3b-b453-43c0-bd12-911f0079419c', '2d5cc783-e524-40e7-9fa0-395f68723a1d', 'bc1a73b9-4043-44c8-8762-9a6bbcdc7447'),
	('7ff0e3fc-5ae1-4652-bd7d-e29de83e4cb2', '75b09ce2-e107-4706-b295-4cfad485c253', 'bc1a73b9-4043-44c8-8762-9a6bbcdc7447'),
	('48c02696-1da6-4994-836e-9aea1468cc21', '10da00d0-630d-44b0-a482-9353ca7882b7', '31aa1f63-64df-4398-92c4-9070ff49b08d'),
	('74ae7481-1839-45b4-95b0-c1800ac92db9', '75b09ce2-e107-4706-b295-4cfad485c253', '31aa1f63-64df-4398-92c4-9070ff49b08d'),
	('54db39f4-1768-46f0-bba1-8f35ce6cb82e', '457a2163-0444-41fa-af8d-8a1e51f2bcf4', '31aa1f63-64df-4398-92c4-9070ff49b08d'),
	('76b28e8e-36fd-4006-b679-d8e84f28eb7b', '2d5cc783-e524-40e7-9fa0-395f68723a1d', '31aa1f63-64df-4398-92c4-9070ff49b08d'),
	('a687ef3d-0315-43bc-b553-022d1052f947', '6bbe603b-ea15-48ec-b161-d93d3fb30b7e', '31aa1f63-64df-4398-92c4-9070ff49b08d'),
	('ed6eeb84-65bf-4f1e-a7e7-9cb417e7d3ed', 'adb40db3-05f8-4c5d-b760-b24fd212ebd1', 'ccc8613d-3ba5-4394-a090-f8efea80a40b'),
	('1fa5d909-a5d6-4160-ba83-fa808ef110d1', 'adb40db3-05f8-4c5d-b760-b24fd212ebd1', '04faa90c-17e8-421f-bc3c-cb15a20abc52');

-- Zrzut struktury tabela school_app_db.courses_teachers
CREATE TABLE IF NOT EXISTS `courses_teachers` (
  `id` varchar(36) NOT NULL,
  `course_id` varchar(36) NOT NULL,
  `teacher_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`teacher_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli school_app_db.courses_teachers: ~3 rows (około)
INSERT INTO `courses_teachers` (`id`, `course_id`, `teacher_id`) VALUES
	('2d135e46-36cb-435f-be85-a75bfd617434', '0a95c9a3-ac83-4f32-a4a0-001f6a2cb5ca', '58d40a8c-dda8-4e98-9b18-250153464201'),
	('658aaef0-316a-465a-b4fa-1e6eb8a1afc8', '0c35ece1-ca1c-4bb0-bd04-ebf29613b6df', 'd28de20c-632c-4195-94f7-e4256eb99c45'),
	('84e429c5-93de-4b6b-9b0a-e9785d24a8c8', '2d5cc783-e524-40e7-9fa0-395f68723a1d', '520b229e-514c-4289-8176-19843131b7f0'),
	('8b2b1810-c7ff-4792-8ff9-84c1c2dea6ac', '4d4c4843-ef6d-4523-8dce-9073c809471c', '520b229e-514c-4289-8176-19843131b7f0');

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

-- Zrzucanie danych dla tabeli school_app_db.students: ~19 rows (około)
INSERT INTO `students` (`id`, `name`, `last_name`, `email`, `password`, `role`) VALUES
	('04faa90c-17e8-421f-bc3c-cb15a20abc52', 'Tomasz', 'Borucki', 'tom@gamail.com', '$2a$10$5A7Bya0oIPy6Srnw0ltmm.OYpuG/bkUrD5/o/BFvRuZ/oyw7Gs5z2', 'student'),
	('0fd81e14-27b9-469f-9ee6-c59f622d5c2f', 'Natalia', 'Piotrowska', 'nati@gmail.com', '$2a$10$JnbJFOST5wNKuNCwA3yBq..M7kGRfuTmPjFch1dDWRzXYGNyMnKY2', 'student'),
	('243540ca-3789-4174-8ea9-84a44d40063e', NULL, NULL, 'testowy@testowy', '$2a$10$c5S5mdiKglh4CVKbEGdHfOAJKPf9g2mypHR/fd.A8p9OxTH5PRObi', 'student'),
	('31aa1f63-64df-4398-92c4-9070ff49b08d', 'Ewa', 'Fala', 'ela@gmail.com', '$2a$10$2o4zGWqu8aWOuQ/fP3A4/O4V3H.ewbcr6N78I1V2gShaXes71vPfm', 'student'),
	('35c5c265-8758-4fa3-a14b-2a9c1d316505', 'unknown', 'unknown', 'asdasdasd@asdasdp', '$2a$10$Vj07FO5.2m8dI19ydVDsKewGDCE9G5/B1nNRoi0nn3bYCW2ToDhaG', 'student'),
	('5bde42cc-b02f-447d-a7ee-e584aec86bd0', 'Ania', 'wrzosek', 'ania@wp.pl', '$2a$10$9X9/mAZqRGa47X5CORMa4ObQNtMUuxkRctOuFy4wdtfERlSB0ryWO', 'student'),
	('65cdbdd1-fcbb-4b09-b233-f89c9b785f9e', 'Oliwia', 'Wieczorek', 'oli@gmail.com', '$2a$10$8YuctcwcXHs67qqh8x44hurTcuBfHf7H1GadWJLTmTOqQ0kMN3ly.', 'student'),
	('7f37c165-8b72-4fac-98f7-7c27dade7186', 'Basia', 'Budka', 'basia@gmail.com', '$2a$10$bbCS2ULP4u99dmju4utADu6emBE4i.XpXV4q0socEAdc.rFXwtrNy', 'student'),
	('84d2d7a6-b7c6-4a15-9b4c-924d304b1beb', 'Natalia', 'Paluch', 'natalia@gmail.com', '$2a$10$OXcFYIIvNVuYnamhleViL.IXzkhcTiJe3KvQqGg3EwZPLtmd/qYRu', 'student'),
	('8aa6cf5a-1f63-487d-abe8-c8a816007b20', 'Wiki', 'Komi', 'wiwk@gmail.com', '$2a$10$9/S7osb1IGeO6/YM5gol2eH9TzFQfI2HAFvGO6xJs2Kk85xuBk/xy', 'student'),
	('8ba573a2-581a-4bdd-922a-17f37fe20c75', 'Kamil', 'Balonik', 'kamil@wp.pl', '$2a$10$5oVxuCNesYCjZXLzLMr41enO.xrcdXXMjfJJbAgcMIbKNOwMonU2C', 'student'),
	('bc1a73b9-4043-44c8-8762-9a6bbcdc7447', 'Justyna', 'Król', 'justi@gmail.com', '$2a$10$3Igd6TiXEvYQ8/ciINMsVORgw7sbN59CD6NbNElKM32McskFXc7ce', 'student'),
	('ccc8613d-3ba5-4394-a090-f8efea80a40b', 'asd', 'asd', 'asd@2asd', '$2a$10$78nOl7eVvCdsEtX7sMFbYehCLOnu648Nec8PGukZw63XP6C5ldqcm', 'student'),
	('e27358ff-50a2-4bef-a1fe-1d3075514f2f', 'Kajtek', 'Lui', 'kajtek@lu', '$2a$10$BhXpF061ikOYGsxlac5JJeb.gk4FReNaW7KU43sUx1bO6FZsadp.m', 'student'),
	('e66e55bd-f138-41d8-b6d4-4491f47fd13c', 'Witold', 'Nowiński', 'wit@gmail.com', '$2a$10$jExBAgGmXtS8BwrkzY2xN.U0YhLEbwhP2Ac3Puo5We3AHLZ8dVQIK', 'student'),
	('eb8b427a-79e9-45ee-86c4-aea3c2ff8ae9', 'Tomek', 'Sroka', 'tomek@gmail.com', '$2a$10$zSNu.NTaIxmo8RCgdGjSs.SOroME27usrSMi0ihJp2QEygsxwrFWu', 'student'),


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

-- Zrzut struktury tabela school_app_db.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli school_app_db.users: ~0 rows (około)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
