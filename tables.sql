CREATE TABLE `openings` (
  `store_id` int(11) NOT NULL,
  `open` time NOT NULL,
  `close` time NOT NULL,
  `day_of_week` smallint(1) NOT NULL,
  KEY `foreignkey` (`store_id`),
  KEY `open` (`open`),
  KEY `close` (`close`),
  KEY `day_of_week` (`day_of_week`),
  CONSTRAINT `foreignkey` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22034 DEFAULT CHARSET=utf8;

CREATE TABLE `userlists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(50) NOT NULL DEFAULT '',
  `listname` text NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listname` (`listname`(50)),
  KEY `userid` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;