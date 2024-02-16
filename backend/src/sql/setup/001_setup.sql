CREATE DATABASE IF NOT EXISTS `PetPals`;
use `PetPals`

-- create user table
CREATE TABLE IF NOT EXISTS user (
  `id` integer auto_increment primary key,
  `username` varchar(100),
  `first_name` varchar(100),
  `last_name` varchar(100),
  `email` varchar(50),
  `password` varchar(100),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- create allowed_pet table
CREATE TABLE IF NOT EXISTS allowed_pet (
  `type` varchar(100) primary key
);

-- insert few default data
INSERT IGNORE INTO allowed_pet (`type`) VALUES
('dog'),
('cat'),
('bird'),
('fish'),
('guinea pig'),
('rabbit'),
('horse'),
('cow');


-- create pet table
CREATE TABLE IF NOT EXISTS pet (
  `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `user_id` integer,
  `name` VARCHAR(100),
  `breed` VARCHAR(100),
  `type` varchar(100),
  `age` INTEGER,
  `description` LONGTEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (`user_id`) REFERENCES `user`(id),
   FOREIGN KEY (`type`) REFERENCES allowed_pet(`type`)
);;


-- -- create post table
CREATE TABLE IF NOT EXISTS post (
  `id` integer auto_increment primary key,
  `user_id` integer,
  `pet_id` integer,
  `title` longtext,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES user(id),
   FOREIGN KEY (pet_id) REFERENCES pet(id)
);



-- create comment tables
CREATE TABLE IF NOT EXISTS comment (
  `id` integer auto_increment primary key,
  user_id integer,
  post_id integer,
  `content` longtext,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES user(id),
   FOREIGN KEY (post_id) REFERENCES post(id)
);


-- create friendship table
CREATE TABLE IF NOT EXISTS friendship (
  `id` integer auto_increment primary key,
  `user_id` integer,
  `friend_id` integer,
  `status` enum('pending','accepted'),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES user(id),
   FOREIGN KEY (friend_id) REFERENCES user(id)
);