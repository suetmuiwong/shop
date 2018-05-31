CREATE TABLE   IF NOT EXISTS  `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `hashedPassword` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createTime` varchar(20) DEFAULT NULL,

  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- INSERT INTO `user` set userName ='admin', hashedPassword='123456';

INSERT INTO `user` (userName,hashedPassword) value('admin','123456');

-- INSERT INTO `user` set name='admin', password='123456';


 
