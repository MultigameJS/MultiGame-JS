-- Active: 1732878219942@@mysql-multigame.alwaysdata.net@3306@multigame_js
CREATE TABLE Role(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(55) NOT NULL
);

CREATE TABLE User(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(55) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_admin TINYINT(1) DEFAULT 0,
    is_banned TINYINT(1) DEFAULT 0,
    is_verified TINYINT(1) DEFAULT 0,
    id_role int NOT NULL,
    FOREIGN KEY (id_role) REFERENCES Role(id)
);