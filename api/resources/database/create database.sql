CREATE DATABASE IF NOT EXISTS gnom_app;

CREATE TABLE IF NOT EXISTS restaurant (
	restaurant_id INT NOT NULL AUTO_INCREMENT,
    restaurant_name VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    city VARCHAR(30) NOT NULL,
    state VARCHAR(30) NULL,
    COUNTRY VARCHAR(30) NOT NULL,
    PRIMARY KEY (restaurant_id)
    );
    
CREATE TABLE IF NOT EXISTS user (
	user_id INT NOT NULL AUTO_INCREMENT,
	user_email VARCHAR(255) NOT NULL,
	user_password CHAR(128) NOT NULL,
	user_first_name VARCHAR(50) NULL,
	user_last_name VARCHAR(50) NULL,
	user_roles VARCHAR(50) NOT NULL,
	facebook_id varchar(255),
  facebook_token varchar(255),
  facebook_email varchar(255),
	google_id varchar(255),
  google_token varchar(255),
  google_email varchar(255),
	PRIMARY KEY (user_id)
	);
    
CREATE TABLE IF NOT EXISTS restaurant_owner (
	restaurant_owner_id INT NOT NULL AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (restaurant_owner_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
    );
    
CREATE TABLE IF NOT EXISTS restaurant_review (
	restaurant_review_id INT NOT NULL AUTO_INCREMENT,
	restaurant_id INT NOT NULL,
	restaurant_review VARCHAR(200) NOT NULL,
	restaurant_photo VARCHAR(200) NULL,
	restaurant_rating INT NULL,
	user_id INT NOT NULL,
	PRIMARY KEY (restaurant_review_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id)
);
    
CREATE TABLE IF NOT EXISTS deal (
	deal_id INT NOT NULL AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    deal_name VARCHAR(50) NOT NULL,
    meal_type VARCHAR(50) NOT NULL,
    food_type VARCHAR(50) NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    progress varchar(30),
    price float NOT NULL,
    PRIMARY KEY (deal_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
	);
    
CREATE TABLE IF NOT EXISTS deal_review (
	deal_review_id INT NOT NULL AUTO_INCREMENT,
    deal_review VARCHAR(200) NOT NULL,
    deal_photo VARCHAR(200) NOT NULL,
    deal_rating INT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (deal_review_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);    
    
CREATE TABLE IF NOT EXISTS `order` (
	order_id INT NOT NULL AUTO_INCREMENT,
    deal_id INT NOT NULL,
    user_id INT NOT NULL,
    order_total float NOT NULL,
    order_detail VARCHAR(50) NULL,
    PRIMARY KEY (order_id),
    FOREIGN KEY (deal_id) REFERENCES deal(deal_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
    );
    
