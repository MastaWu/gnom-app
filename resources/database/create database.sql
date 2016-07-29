/*CREATE DATABASE gnom_app;*/

CREATE TABLE restaurant (
	restaurant_id INT NOT NULL AUTO_INCREMENT,
    restaurant_name VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    city VARCHAR(30) NOT NULL,
    state VARCHAR(30) NULL,
    COUNTRY VARCHAR(30) NOT NULL,
    PRIMARY KEY (restaurant_id)
    );
    
CREATE TABLE user (
	user_id INT NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(50) NOT NULL,
	user_password VARCHAR(50) NOT NULL,
	user_first_name VARCHAR(50) NULL,
	user_last_name VARCHAR(50) NULL,
	user_email VARCHAR(50) NOT NULL,
	PRIMARY KEY (user_id)
	);
    
CREATE TABLE