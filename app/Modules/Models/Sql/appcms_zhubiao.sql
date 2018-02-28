CREATE TABLE `@app@@zhubiao@` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `catid` smallint(5) unsigned NOT NULL default '0',
  `typeid` smallint(5) unsigned NOT NULL,
  `title` char(80) NOT NULL default '',
  `style` char(24) NOT NULL default '',
  `thumb` char(100) NOT NULL default '',
  `keywords` char(40) NOT NULL default '',
  `tags` varchar(255) NOT NULL default '',
  `description` char(255) NOT NULL default '',
  `posid` tinyint(1) unsigned NOT NULL default '0',
  `url` char(100) NOT NULL,
  `listorder` tinyint(3) unsigned NOT NULL default '0',
  `status` tinyint(2) unsigned NOT NULL default '1',
  `sysadd` tinyint(1) unsigned NOT NULL default '0',
  `islink` tinyint(1) unsigned NOT NULL default '0',
  `username` char(20) NOT NULL,
  `inputtime` int(10) unsigned NOT NULL default '0',
  `updatetime` int(10) unsigned NOT NULL default '0',
  `views` int(11) NOT NULL DEFAULT '0' COMMENT '�������',
  `yesterdayviews` int(11) NOT NULL DEFAULT '0' COMMENT '����',
  `dayviews` int(10) NOT NULL DEFAULT '0' COMMENT '���յ����',
  `weekviews` int(10) NOT NULL DEFAULT '0' COMMENT '���ܷ�����',
  `monthviews` int(10) NOT NULL DEFAULT '0' COMMENT '���·���',
  `viewsupdatetime` int(10) NOT NULL DEFAULT '0' COMMENT '��������ʱ��',
  PRIMARY KEY  (`id`),
  KEY `status` (`status`,`listorder`,`id`),
  KEY `listorder` (`catid`,`status`,`listorder`,`id`),
  KEY `catid` (`catid`,`status`,`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;