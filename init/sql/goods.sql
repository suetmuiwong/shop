CREATE TABLE IF NOT EXISTS `goods`(
     `goodsId` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
     `goodsName` varchar(200) NOT NULL,
     `goodsImage` varchar(32) NOT NULL,
     `goodsBrief` varchar(255) NOT NULL,
     `goodsElement` varchar(255) NOT NULL,
     `originalPrice` decimal(20,2) NOT NULL,
     `discountPrice` decimal(20,2) NOT NULL,
     `goodsStore` int(10) NOT NULL,
     `goodsUptime` int(10) NOT NULL,
     `goodsDowntime` int(10) NOT NULL,
     `goodsBuycount` int(10) NOT NULL,
    PRIMARY KEY (`goodsId`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;