/*
Navicat MySQL Data Transfer

Source Server         : DueTy
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2018-09-20 20:27:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for archive
-- ----------------------------
DROP TABLE IF EXISTS `archive`;
CREATE TABLE `archive` (
  `id` varchar(40) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL,
  `articles` tinyint(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of archive
-- ----------------------------

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` varchar(40) NOT NULL,
  `title` varchar(20) DEFAULT NULL,
  `type` char(4) DEFAULT NULL,
  `tags` varchar(40) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `content` longtext,
  `abstract` varchar(80) DEFAULT NULL,
  `size` char(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('e9a20bf8-0594-48f4-950a-22d1164efe8b', '随笔', 'arti', '学习', '2018-09-19 05:38:36', '2018-09-19 05:38:36', '<p>只是一篇随笔</p>', '这是一篇随笔', '25B');
INSERT INTO `article` VALUES ('ee72f1fb-62cb-4d21-8647-a97883a89969', '随笔', 'arti', '学习', '2018-09-19 05:40:45', '2018-09-19 05:40:45', '<p>只是一篇随笔</p>', '这是一篇随笔', '25B');

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `tag_id` varchar(40) NOT NULL,
  `tag_name` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES ('040bea99-c2a0-4e2f-a3b6-9f04badaa4ba', '学习', '2017-06-05 12:10:19', '2017-06-05 12:10:19');
INSERT INTO `tag` VALUES ('059a5877-65c2-43fb-b849-855d15c483d3', '随笔', '2017-06-05 12:07:45', '2017-06-05 12:07:45');
INSERT INTO `tag` VALUES ('358d76ee-61b1-4c96-84ef-62b0f4e2c564', 'JavaScrip', '2018-09-18 00:02:48', '2018-09-19 04:41:23');
INSERT INTO `tag` VALUES ('60d1e798-1d18-4aaf-800b-8d9f2c061bc3', 'React', '2018-09-19 00:15:33', '2018-09-19 00:15:33');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` varchar(40) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `personal_desc` varchar(255) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('351a22af-89c7-47f6-a05c-5dd2d707b48c', 'duety123', 'male', ' ', '123', '2017-06-03 00:00:00');
INSERT INTO `user` VALUES ('9eb12b2b-ce4c-4548-88e2-1b6e9a75afff', 'duety789', 'male', null, '123', '2017-06-03 00:00:00');
INSERT INTO `user` VALUES ('9ec43597-7f22-42cd-8c23-8c51bbe559eb', 'duety123', 'female', '你好世界', '123', '2017-06-06 02:36:43');
