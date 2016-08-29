/* This just adds dummy data into the database */
INSERT INTO gnom.restaurant (restaurant_id, restaurant_name, address, city, state, country) values (2, "TEST2", "123 Test Street", "Test", "TEST", "TEST");
INSERT INTO gnom.deal (deal_id, restaurant_id, meal_type, food_type, date_start, date_end, progress, price) VALUES (4,2,"dinner","chinese",now(),now(),"In Progress",13.46);
INSERT INTO gnom.restaurant SET restaurant_name="TEST3", address="123 Test Street", city="Test", state="TEST", COUNTRY="TEST";
