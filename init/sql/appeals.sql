CREATE TABLE IF NOT EXISTS `appeal`(
  `appealId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `appealTime` varchar(255) NOT NULL,
  `appealOrder` varchar(255) NOT NULL,
  `appealType` int(4) NOT NULL,
  `appealDes` varchar(255) NOT NULL,
  `appealManageStatus` int(4) NOT NULL,
  `appealContact` varchar(200) NOT NULL,
  PRIMARY KEY (`appealId`)


) ENGINE=InnoDB DEFAULT CHARSET=utf8;