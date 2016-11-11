/* This just adds dummy data into the database */
INSERT INTO gnomApp.restaurant (restaurant_id, restaurant_name, address, city, state, country) values (2, "TEST2", "123 Test Street", "Test", "TEST", "TEST");
INSERT INTO gnomApp.deal (deal_id, restaurant_id, meal_type, food_type, date_start, date_end, progress, price) VALUES (4,2,"dinner","chinese",now(),now(),"In Progress",13.46);
INSERT INTO gnomApp.restaurant SET restaurant_name="TEST3", address="123 Test Street", city="Test", state="TEST", COUNTRY="TEST";
INSERT INTO gnomApp.user SET user_name="admin", user_email="gnom.app@gmail.com", user_password="test", user_role="admin";

SELECT * FROM gnomApp.restaurant;
SELECT * FROM gnomApp.user;

SELECT user_name, user_password, user_email FROM gnomApp.user WHERE user_name="admin";

DELETE FROM gnomApp.user where user_id = 1;

INSERT INTO gnomApp.user SET user_email="gnom@gmail.com";
UPDATE gnomApp.user SET user_email="gnom@gmail.com", user_name="admin2", user_password="test2" WHERE user_email="gnom@gmail.com";

SELECT * FROM gnomApp.user;

ALTER TABLE gnomApp.user add primary key(user_email);

INSERT INTO gnomApp.restaurant_admin(restaurant_id, user_id) values (2, 19);

SET SQL_SAFE_UPDATES = 0;
