-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 23, 2015 at 05:03 PM
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
  `appriciation` text,
  `appreciated_by` varchar(11) NOT NULL COMMENT 'Whow appricited',
  ` enable` char(2) DEFAULT NULL COMMENT '1=Active, 0=Deactive',
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tbl_appreciations`
--

INSERT INTO `tbl_appreciations` (`id`, `appriciation`, `appreciated_by`, ` enable`, `created`, `modified`) VALUES
(1, 'test1', '1', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_authorized_users`
--

CREATE TABLE IF NOT EXISTS `tbl_authorized_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `member_id` varchar(11) NOT NULL COMMENT 'Get from api and ',
  `auth_type` char(6) DEFAULT NULL COMMENT 'admin=admin user, hr=Hr Devision Users',
  `token` varchar(250) NOT NULL DEFAULT 'token_sss',
  `enable` char(2) DEFAULT NULL COMMENT '1=Active, 0=Deactive',
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tbl_authorized_users`
--

INSERT INTO `tbl_authorized_users` (`id`, `member_id`, `auth_type`, `token`, `enable`, `created`, `modified`) VALUES
(1, '1', 'admin', 'token_sss', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
