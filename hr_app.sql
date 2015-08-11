-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 10, 2015 at 07:25 AM
-- Server version: 5.5.39
-- PHP Version: 5.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `openarc_rad_hr_appreciations_01`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_appreciations`
--

CREATE TABLE IF NOT EXISTS `tbl_appreciations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `appreciation` text,
  `appreciated_to` int(11) NOT NULL COMMENT 'Appriciate this menmber',
  `appreciated_by` varchar(11) NOT NULL COMMENT 'Whow appricited',
  `enable` char(2) DEFAULT 'A' COMMENT '1=Active, 1=Deactive',
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=72 ;

--
-- Dumping data for table `tbl_appreciations`
--

INSERT INTO `tbl_appreciations` (`id`, `appreciation`, `appreciated_to`, `appreciated_by`, `enable`, `created`, `modified`) VALUES
(1, 'appreciation_decription 1\r\n', 1, '1', 'A', '2015-07-24 02:43:43', '2015-07-24 03:13:12'),
(2, 'appreciation_decription 1', 2, '2', 'A', '2015-07-24 02:43:43', '0000-00-00 00:00:00'),
(3, 'appreciation_decription 2', 2, '3', 'A', '2015-07-24 02:43:43', '2015-07-24 02:43:43'),
(68, 'appreciation_decription 3', 2, '2', 'A', '2015-07-24 02:43:43', '0000-00-00 00:00:00'),
(69, 'nice work', 1, '1', 'A', '2015-02-02 00:00:00', '2015-02-02 00:00:00'),
(71, 'ddd', 1, '1', 'A', '2015-02-02 00:00:00', '2015-02-02 00:00:00'),
(70, 't', 1, '1', 'A', '2015-02-02 00:00:00', '2015-02-02 00:00:00'),
(67, 'appreciation_decription 4', 2, '1', 'A', '2015-07-24 02:43:43', '2015-07-24 02:43:43'),
(66, 'hi 5', 1, '2', 'A', '2015-02-02 00:00:00', '2015-02-02 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_authorized_users`
--

CREATE TABLE IF NOT EXISTS `tbl_authorized_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `member_id` varchar(11) NOT NULL COMMENT 'Get from api and ',
  `auth_type` char(6) DEFAULT NULL COMMENT 'admin=admin user, hr=Hr Devision Users, emp = employer',
  `token` varchar(250) NOT NULL DEFAULT 'token_sss',
  `enable` char(2) DEFAULT NULL COMMENT '1=Active, 0=Deactive',
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_authorized_users`
--

INSERT INTO `tbl_authorized_users` (`id`, `member_id`, `auth_type`, `token`, `enable`, `created`, `modified`) VALUES
(1, '1', 'admin', 'token_sss', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, '219', 'emp', 'new_token1\r\n', '1', '2015-07-24 10:05:03', '2015-07-24 10:05:03');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;