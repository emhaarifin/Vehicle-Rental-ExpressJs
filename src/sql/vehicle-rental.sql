-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 11, 2021 at 07:16 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicle-rental`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name_category` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name_category`) VALUES
(1, 'Bike'),
(2, 'Cars'),
(3, 'Motorbike');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `name_location` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `name_location`) VALUES
(1, 'Bali'),
(2, 'Yogyakarta'),
(3, 'Jakarta'),
(4, 'Kalimantan'),
(5, 'Malang');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `id` varchar(128) NOT NULL,
  `userId` varchar(128) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `qty` int(10) NOT NULL,
  `subTotal` int(128) NOT NULL,
  `startDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `expDate` timestamp NOT NULL,
  `status` enum('pending','pay') NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt`  timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`id`, `userId`, `vehicleId`, `qty`, `subTotal`, `startDate`, `expDate`, `status`, `createdAt`, `updatedAt`) VALUES
('338caee0-0241-45a2-846c-77cf64c00fbf', 'f18ebc63-0505-404c-826e-e410e34220b7', 165, 3, 20000, '2021-08-26', '2021-08-26', 'pending', '2021-08-26', '2021-08-26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(128) NOT NULL,
  `avatar` varchar(128) DEFAULT NULL,
  `fullname` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `phone_number` varchar(15) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `adress` varchar(128) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `status` enum('inactive','active') NOT NULL DEFAULT 'inactive',
  `roles` enum('member','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `avatar`, `fullname`, `email`, `password`, `created_at`, `phone_number`, `gender`, `adress`, `date_of_birth`, `status`, `roles`) VALUES
('0234498d-b200-412f-9d09-04d3a9cebeed', 'http://localhost:4000/file/1629920468324-ScreenShot2021-07-21at10.14.19.png', 'Muhammad Arifin', 'armisja.404@gmail.com', '$2a$10$4KCRhJhL6Aq.2Qo02j.Kvel10SkFTY9tber8I7D6USAEC.SsK2Z36', '2021-08-21 17:51:16', '', 'Female', '', NULL, 'active', 'admin'),
('f18ebc63-0505-404c-826e-e410e34220b7', NULL, 'Arifin', '101muhammadarifin@gmail.com', '$2a$10$rCd/dMgi/YfNA/w28ERDWepMmuCbGyrFdFTejCPUOEdl/bWYK9bke', '2021-08-26 04:35:29', NULL, NULL, NULL, NULL, 'active', 'member'),
('f5593264-92b3-40d2-ba6c-3721415b8f75', NULL, 'Arifin', 'emhaarifin02@gmail.com', '$2a$10$2GinSqlKCpRjfl.M2Kvn2.pIhqtoiRRA/aaKMfYxX/6pIHI8DgBqK', '2021-08-26 03:58:09', NULL, NULL, NULL, NULL, 'active', 'member');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `location_id` int(8) NOT NULL,
  `category_id` int(8) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(150) NOT NULL,
  `price` int(128) NOT NULL,
  `status` enum('Available','Full Booked') NOT NULL,
  `image` varchar(1028) NOT NULL,
  `stock` int(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `location_id`, `category_id`, `name`, `description`, `price`, `status`, `image`, `stock`) VALUES
(141, 3, 2, 'Trail', 'tumbas maem', 100000, 'Available', '[\"http://localhost:4000/file/1629469324244-dave-goudreau-8ZfrYgVcU6A-unsplash1.svg\",\"http://localhost:4000/file/1629469324268-iqx-azmi-jn01MSrsUpE-unsplash(1)1.svg\"]', 1),
(146, 2, 1, 'Sepeda Gunung', 'Hanya untuk 1 orang', 10000, 'Available', '[\"http://localhost:4000/file/1629469348217-alonso-talbert-s6DiDMLK0jk-unsplash1.svg\"]', 1),
(147, 1, 1, 'Vespa Matic', 'Vespa custom bbm awet', 10000, 'Available', '[\"http://localhost:4000/file/1629469366652-lawrence-chismorie--tRWfFcwEp4-unsplash6.svg\"]', 1),
(148, 2, 2, 'Mobil Rally', 'Siap hadapi badai pasir', 100000, 'Available', '[\"http://localhost:4000/file/1629470830535-marcus-p-oUBjd22gF6w-unsplash1.svg\"]', 1),
(149, 1, 1, 'Vespa Matic', 'Ve', 100000, 'Available', '[\"http://localhost:4000/file/1629470926093-pascal-obermeier-YOphb-Xr2sk-unsplash1.svg\"]', 1),
(150, 2, 1, 'Sepeda Gunung', 'Banyak varian', 100000, 'Available', '[\"http://localhost:4000/file/1629470849870-pascal-obermeier-YOphb-Xr2sk-unsplash1.svg\"]', 1),
(157, 1, 3, 'Mobil hutan', 'Cocok untuk kamping', 1000000, 'Available', '[\"http://localhost:4000/file/1629470947954-chuttersnap-AcdxiyTSR0A-unsplash1.svg\"]', 1),
(158, 2, 3, 'Mobil Balap', 'Spek cc 3000', 1500000, 'Available', '[\"http://localhost:4000/file/1629470982657-volkan-olmez-SvMlXH_eW6o-unsplash3.svg\"]', 10),
(159, 3, 2, 'Test update', 'tumbas maem ', 100, 'Full Booked', '[\"http://localhost:4000/file/1629485531386-marcus-p-oUBjd22gF6w-unsplash1.svg\",\"http://localhost:4000/file/1629485531388-iqx-azmi-jn01MSrsUpE-unsplash(1)1.svg\",\"http://localhost:4000/file/1629485531428-dave-goudreau-8ZfrYgVcU6A-unsplash1.svg\"]', 999),
(160, 3, 1, 'Sepeda', 'Muat 1 orang saja ya!', 10000, 'Available', '[\"http://localhost:4000/file/1629686918074-robert-bye-tG36rvCeqng-unsplash1.svg\",\"http://localhost:4000/file/1629686918124-pascal-obermeier-YOphb-Xr2sk-unsplash1.svg\",\"http://localhost:4000/file/1629686918167-alonso-talbert-s6DiDMLK0jk-unsplash1.svg\"]', 2),
(161, 1, 2, 'Mobil', 'ngeng', 100000, 'Available', '[\"http://localhost:4000/file/1629469081647-iqx-azmi-jn01MSrsUpE-unsplash(1)1.svg\"]', 1),
(162, 3, 3, 'Trail hutanerr', 'Jangan', 1, 'Available', '[\"http://localhost:4000/file/1629573421131-volkan-olmez-SvMlXH_eW6o-unsplash3.svg\",\"http://localhost:4000/file/1629573421200-lawrence-chismorie--tRWfFcwEp4-unsplash6.svg\",\"http://localhost:4000/file/1629573421246-chuttersnap-AcdxiyTSR0A-unsplash1.svg\"]', 1),
(164, 2, 1, 'Vespa Matic', 'Irit BBm', 100000, 'Available', '[\"http://localhost:4000/file/1629483590472-lawrence-chismorie--tRWfFcwEp4-unsplash6.svg\",\"http://localhost:4000/file/1629483590535-chuttersnap-AcdxiyTSR0A-unsplash1.svg\",\"http://localhost:4000/file/1629483590611-alonso-talbert-s6DiDMLK0jk-unsplash1.svg\"]', 10),
(165, 5, 3, 'Vespa Matic', 'Irit BBm', 10000, 'Available', '[\"http://localhost:4000/file/1629490247229-lawrence-chismorie--tRWfFcwEp4-unsplash6.svg\",\"http://localhost:4000/file/1629490247265-alonso-talbert-s6DiDMLK0jk-unsplash1.svg\",\"http://localhost:4000/file/1629490247276-chuttersnap-AcdxiyTSR0A-unsplash1.svg\"]', 9),
(169, 1, 1, '', '', 1, 'Available', '[]', 2),
(170, 1, 1, '', '', 1, 'Available', '[]', 1),
(171, 1, 1, '', '', 1, 'Available', '[]', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `vehicleId` (`vehicleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_id` (`location_id`) USING BTREE,
  ADD KEY `category_id` (`category_id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

