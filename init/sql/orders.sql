CREATE TABLE IF NOT EXISTS `orders`(
    `orderId` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `orderNo` varchar(200) NOT NULL,
    `orderStatus` int(4) NOT NULL,
    `totalMoney` decimal(20,2) NOT NULL,
    `realTotalMoney` decimal(20,2) NOT NULL,
    `goodsName` varchar(200) NOT NULL,
    `goodsImage` varchar(255) NOT NULL,
    `goodsBrief` varchar(255) NOT NULL,
    `goodsCount` int(10) NOT NULL,
    `orderTime`varchar(255)  NOT NULL,
    `payType` int(4) NOT NULL,
    PRIMARY KEY (`orderId`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
