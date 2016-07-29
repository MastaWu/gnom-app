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
    
CREATE TABLE restaurant_admin (
	restaurant_admin_id INT NOT NULL AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (restaurant_admin_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
    );
    
CREATE TABLE deal (
	deal_id INT NOT NULL AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    meal_type VARCHAR(50) NOT NULL,
    food_type VARCHAR(50) NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    progress varchar(30),
    price float NOT NULL,
    restaurant_id INT NOT NULL,
    PRIMARY KEY (deal_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
	);
    
CREATE TABLE deal_comment (
	deal_comment_id INT NOT NULL AUTO_INCREMENT,
    deal_comment VARCHAR(200) NOT NULL,
    deal_photo VARCHAR(200) NOT NULL,
    deal_rating INT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (deal_comment_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);    
    
CREATE TABLE invoice (
	invoice_id INT NOT NULL AUTO_INCREMENT,
    deal_id INT NOT NULL,
    user_id INT NOT NULL,
    invoice_total float NOT NULL,
    invoice_detail VARCHAR(50) NULL,
    PRIMARY KEY (invoice_id),
    FOREIGN KEY (deal_id) REFERENCES deal(deal_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
    );
    
