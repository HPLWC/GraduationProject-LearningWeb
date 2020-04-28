/*
 Navicat Premium Data Transfer

 Source Server         : hplwc
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : learningweb

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 28/04/2020 21:04:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for attention
-- ----------------------------
DROP TABLE IF EXISTS `attention`;
CREATE TABLE `attention`  (
  `id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '用户id',
  `attention_user_id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '被关注用户id',
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `attent_id`(`attention_user_id`) USING BTREE,
  INDEX `in_attent_user_id`(`user_id`) USING BTREE,
  CONSTRAINT `attent_id` FOREIGN KEY (`attention_user_id`) REFERENCES `user_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `in_attent_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attention
-- ----------------------------
INSERT INTO `attention` VALUES ('dfe31ea0856b11eaa1ed2f18204485dc', 'c0a9d9d0781311ea9064e9d9b59810fe', '07af95b0781711eab9b06332bd827973', '2020-04-23 22:08:15.250773', '2020-04-23 22:08:15.250773');

-- ----------------------------
-- Table structure for authentication
-- ----------------------------
DROP TABLE IF EXISTS `authentication`;
CREATE TABLE `authentication`  (
  `id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `school` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `material` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '资料',
  `status` smallint(1) NULL DEFAULT NULL COMMENT '0：申请中  1：成功  2：拒绝',
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `authentication_user_id`(`user_id`) USING BTREE,
  CONSTRAINT `authentication_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of authentication
-- ----------------------------
INSERT INTO `authentication` VALUES ('0cc937507b1311eab97595fc9e2f1e84', 'c0a25fc0781311ea9064e9d9b59810fe', '张老师', '韶关学院', 'http://127.0.0.1:3000/upload/section/2020410/1586513687027.sql', 0, '2020-04-10 18:07:13.769811', '2020-04-24 23:30:24.000000');

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection`  (
  `id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `course_info_id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `collcet_user_id`(`user_id`) USING BTREE,
  INDEX `collect_course_info_id`(`course_info_id`) USING BTREE,
  CONSTRAINT `collcet_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `collect_course_info_id` FOREIGN KEY (`course_info_id`) REFERENCES `course_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of collection
-- ----------------------------
INSERT INTO `collection` VALUES ('f06e16f07ef711eaa77aabe0ed3472f6', 'c0a9d9d0781311ea9064e9d9b59810fe', '2745a5d07ef311eaa77aabe0ed3472f6', '2020-04-15 17:03:14.405215', '2020-04-15 17:03:14.405215');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '评论人id',
  `section_id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '视频id',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '评论内容',
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `section_id`(`section_id`) USING BTREE,
  INDEX `comment_firse_user_id`(`user_id`) USING BTREE,
  CONSTRAINT `comment_firse_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `section_id` FOREIGN KEY (`section_id`) REFERENCES `section` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('780e5ad07ef711eaa77aabe0ed3472f6', 'c0a9d9d0781311ea9064e9d9b59810fe', '56527a607ef311eaa77aabe0ed3472f6', '加油！', '2020-04-15 16:59:52.449687', '2020-04-15 16:59:52.449687');

-- ----------------------------
-- Table structure for comment_reply
-- ----------------------------
DROP TABLE IF EXISTS `comment_reply`;
CREATE TABLE `comment_reply`  (
  `id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `comment_id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '主评论id',
  `user_id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '评论人id',
  `to_user_id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '被评论人id',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '评论内容',
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `comment_id`(`comment_id`) USING BTREE,
  INDEX `comment_user_id`(`user_id`) USING BTREE,
  INDEX `comment_to_user_id`(`to_user_id`) USING BTREE,
  CONSTRAINT `comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `comment_to_user_id` FOREIGN KEY (`to_user_id`) REFERENCES `user_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment_reply
-- ----------------------------
INSERT INTO `comment_reply` VALUES ('fe8316f0849c11eabc5127ddd9e6cafe', '780e5ad07ef711eaa77aabe0ed3472f6', 'c0a9d9d0781311ea9064e9d9b59810fe', 'c0a9d9d0781311ea9064e9d9b59810fe', 'ddd', '2020-04-22 21:27:20.812750', '2020-04-22 21:27:20.812750');

-- ----------------------------
-- Table structure for course_info
-- ----------------------------
DROP TABLE IF EXISTS `course_info`;
CREATE TABLE `course_info`  (
  `id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '标题',
  `decoration` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '简介',
  `photo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '首页播放封面',
  `type_id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '类型id',
  `play_num` int(11) NULL DEFAULT 0 COMMENT '播放次数',
  `date` datetime(0) NULL DEFAULT NULL COMMENT '上传时间',
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `type_id`(`type_id`) USING BTREE,
  INDEX `info_user_id`(`user_id`) USING BTREE,
  CONSTRAINT `info_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `type_id` FOREIGN KEY (`type_id`) REFERENCES `course_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course_info
-- ----------------------------
INSERT INTO `course_info` VALUES ('2745a5d07ef311eaa77aabe0ed3472f6', '07af95b0781711eab9b06332bd827973', 'vue基础学习', 'Vue 是一套用于构建用户界面的渐进式JavaScript框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，方便与第三方库或既有项目整合。', 'http://127.0.0.1:3000/upload/img/2020415/1586939337803.jpg', '4d5813507ef011eaa77aabe0ed3472f6', 16, NULL, '2020-04-15 16:28:58.932234', '2020-04-23 22:08:13.000000');
INSERT INTO `course_info` VALUES ('c9d71ee07ef411eaa77aabe0ed3472f6', '07af95b0781711eab9b06332bd827973', 'Java后台开发', 'Java 是由Sun Microsystems公司于1995年5月推出的高级程序设计语言。\n\nJava可运行于多个平台，如Windows, Mac OS，及其他多种UNIX版本的系统。\n\n本教程通过简单的实例将让大家更好的了解JAVA编程语言。', 'http://127.0.0.1:3000/upload/img/2020415/1586940039657.jpg', 'f93e01b07ef111eaa77aabe0ed3472f6', 0, NULL, '2020-04-15 16:40:41.176362', '2020-04-15 16:40:41.176362');
INSERT INTO `course_info` VALUES ('ccdefd207ef311eaa77aabe0ed3472f6', '07af95b0781711eab9b06332bd827973', 'python基础讲解', 'Python是一种跨平台的计算机程序设计语言。 是一个高层次的结合了解释性、编译性、互动性和面向对象的脚本语言。最初被设计用于编写自动化脚本(shell)，随着版本的不断更新和语言新功能的添加，越多被用于独立的、大型项目的开发。', 'http://127.0.0.1:3000/upload/img/2020415/1586939615653.jpg', '28b9c4b07ef211eaa77aabe0ed3472f6', 3, NULL, '2020-04-15 16:33:36.757244', '2020-04-25 01:31:50.000000');

-- ----------------------------
-- Table structure for course_type
-- ----------------------------
DROP TABLE IF EXISTS `course_type`;
CREATE TABLE `course_type`  (
  `id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `decoration` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `photo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course_type
-- ----------------------------
INSERT INTO `course_type` VALUES ('28b9c4b07ef211eaa77aabe0ed3472f6', '人工智能', '人工智能是计算机科学的一个分支，它企图了解智能的实质，并生产出一种新的能以人类智能相似的方式做出反应的智能机器，该领域的研究包括机器人、语言识别、图像识别、自然语言处理和专家系统等。人工智能从诞生以来，理论和技术日益成熟，应用领域也不断扩大，可以设想，未来人工智能带来的科技产品，将会是人类智慧的“容器”。人工智能可以对人的意识、思维的信息过程的模拟。人工智能不是人的智能，但能像人那样思考、也可能超过人的智能。', 'http://127.0.0.1:3000/upload/img/2020415/1586938910585.jpg', '2020-04-15 16:21:51.870802', '2020-04-15 16:21:51.870802');
INSERT INTO `course_type` VALUES ('4d5813507ef011eaa77aabe0ed3472f6', 'web前端开发', '前端开发是创建Web页面或app等前端界面呈现给用户的过程，通过HTML，CSS及JavaScript以及衍生出来的各种技术、框架、解决方案，来实现互联网产品的用户界面交互 [1]  。它从网页制作演变而来，名称上有很明显的时代特征。在互联网的演化进程中，网页制作是Web1.0时代的产物，早期网站主要内容都是静态，以图片和文字为主，用户使用网站的行为也以浏览为主。随着互联网技术的发展和HTML5、CSS3的应用，现代网页更加美观，交互效果显著，功能更加强大。', 'http://127.0.0.1:3000/upload/img/2020415/1586938112867.jpg', '2020-04-15 16:08:34.318502', '2020-04-15 16:08:34.318502');
INSERT INTO `course_type` VALUES ('f93e01b07ef111eaa77aabe0ed3472f6', '后端开发', '后端开发，通常也称服务器端开发。顾名思义开发的是程序的后端，并不对用户显示，类似于后勤的样子，负责处理前端的请求，进行逻辑处理和数据交互。', 'http://127.0.0.1:3000/upload/img/2020415/1586938829816.jpg', '2020-04-15 16:20:32.210030', '2020-04-15 16:20:32.210030');

-- ----------------------------
-- Table structure for section
-- ----------------------------
DROP TABLE IF EXISTS `section`;
CREATE TABLE `section`  (
  `id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `info_id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `section_num` int(3) NOT NULL COMMENT '第几个',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `decoration` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `video` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '视频路径',
  `date` int(11) NULL DEFAULT NULL,
  `length` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '视频时长',
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `info_id`(`info_id`) USING BTREE,
  CONSTRAINT `info_id` FOREIGN KEY (`info_id`) REFERENCES `course_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of section
-- ----------------------------
INSERT INTO `section` VALUES ('45e7ca807ef411eaa77aabe0ed3472f6', 'ccdefd207ef311eaa77aabe0ed3472f6', 2, 'Linux基础（二）', '简单介绍Linux（二）', 'http://127.0.0.1:3000/upload/section/2020415/1586939815990.mp4', NULL, NULL, '2020-04-15 16:36:59.819576', '2020-04-15 16:36:59.819576');
INSERT INTO `section` VALUES ('56527a607ef311eaa77aabe0ed3472f6', '2745a5d07ef311eaa77aabe0ed3472f6', 1, 'vue基础（一）', '简单介绍vue的基础（一）', 'http://127.0.0.1:3000/upload/section/2020415/1586939408242.mp4', NULL, NULL, '2020-04-15 16:30:17.866213', '2020-04-15 16:30:17.866213');
INSERT INTO `section` VALUES ('72075fa07ef311eaa77aabe0ed3472f6', '2745a5d07ef311eaa77aabe0ed3472f6', 2, 'vue基础（二）', '简单介绍vue的基础（二）', 'http://127.0.0.1:3000/upload/section/2020415/1586939462182.mp4', NULL, NULL, '2020-04-15 16:31:04.348689', '2020-04-15 16:31:04.348689');
INSERT INTO `section` VALUES ('f5aa1aa07ef311eaa77aabe0ed3472f6', 'ccdefd207ef311eaa77aabe0ed3472f6', 1, 'Linux基础（一）', '简单介绍linux基础（一）', 'http://127.0.0.1:3000/upload/section/2020415/1586939680858.mp4', NULL, NULL, '2020-04-15 16:34:45.196270', '2020-04-15 16:34:45.196270');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `role` smallint(1) NOT NULL COMMENT '0为超管，1为老师，2为学生',
  `user_id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `is_used_comment` smallint(1) NULL DEFAULT NULL COMMENT '0为否，1为是',
  `is_used` smallint(1) NULL DEFAULT NULL COMMENT '0为否，1为是',
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('07a81ba0781711eab9b06332bd827973', '1003218089@qq.com', 'c9487512e236066182ad1268b29bea75d569b4da56486b280b0670aec28c3137', 1, '07af95b0781711eab9b06332bd827973', 0, 1, '2020-04-06 22:58:09.633522', '2020-04-22 23:55:16.000000');
INSERT INTO `user` VALUES ('c0a25fc0781311ea9064e9d9b59810f2', 'admin', 'c9487512e236066182ad1268b29bea75d569b4da56486b280b0670aec28c3137', 0, NULL, 0, 1, '2020-04-08 20:40:33.056761', '2020-04-08 20:40:33.056761');
INSERT INTO `user` VALUES ('c0a25fc0781311ea9064e9d9b59810fe', '935151619@qq.com', 'c9487512e236066182ad1268b29bea75d569b4da56486b280b0670aec28c3137', 2, 'c0a9d9d0781311ea9064e9d9b59810fe', 1, 1, '2020-04-06 22:34:41.988123', '2020-04-19 16:42:28.000000');

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `id` char(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `sex` enum('男','女','未知') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '未知',
  `phone` char(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `common` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '用户评论',
  `decoration` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '个人简介',
  `photo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('07af95b0781711eab9b06332bd827973', 'linyuhong', '男', '13415634431', '1003218089@qq.com', '2020-04-06 22:58:09.679283', '2020-04-24 22:29:06.000000', NULL, 'shuai 1', 'http://localhost:3000/upload/img/2020424/1587738544753.jpg');
INSERT INTO `user_info` VALUES ('c0a9d9d0781311ea9064e9d9b59810fe', 'HPLWC', '男', '15113125919', '935151619@qq.com', '2020-04-06 22:34:42.031765', '2020-04-22 15:56:45.000000', '这个平台提供了许多值得学习的视频，且都是免费的，在其中学到挺多的，冲冲冲。', '加油！', 'http://localhost:3000/upload/img/2020422/1587542202542.jpg');

SET FOREIGN_KEY_CHECKS = 1;
