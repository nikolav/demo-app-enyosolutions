
create database app;

create table if not exists imports (
  id          int not null auto_increment primary key, 
  importDate  datetime not null,
  rawContent  text null
) engine=innodb;

create table if not exists articles (
  id               int not null auto_increment primary key, 
  description      text, 
  externalId       varchar(500),
  importDate       datetime,
  link             text, 
  mainPicture      text,
  publicationDate  datetime,
  title            text
) engine=innodb;
