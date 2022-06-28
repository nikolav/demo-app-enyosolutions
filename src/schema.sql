-- 1.
create database app;

-- 2.
create table if not exists imports (
  id          int not null auto_increment primary key, 
  importDate  datetime not null default current_timestamp,
  rawContent  longtext
) engine=innodb;

-- 3.
create table if not exists articles (
  id               int not null auto_increment primary key, 
  description      text, 
  externalId       varchar(500),
  importDate       datetime not null default current_timestamp,
  link             text, 
  mainPicture      text,
  publicationDate  datetime,
  title            text,
  unique (externalId)
) engine=innodb;
