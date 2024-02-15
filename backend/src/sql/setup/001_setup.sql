CREATE DATABASE IF NOT EXISTS `PetPals`;
use `PetPals`

-- create users table
CREATE TABLE IF NOT EXISTS users (
  `id` integer auto_increment primary key,
  `username` varchar(100),
  `email` varchar(50),
  `password` varchar(100),
  `created_at` timestamp,
  `updated_at` timestamp
);

-- create allowed_pets table
CREATE TABLE IF NOT EXISTS allowed_pets (
  `type` varchar(100) primary key
);

-- insert few default data
INSERT IGNORE INTO allowed_pets (`type`) VALUES
('dog'),
('cat'),
('bird'),
('fish'),
('guinea pig'),
('rabbit'),
('horse'),
('cow');


-- create pets table
CREATE TABLE IF NOT EXISTS pets (
  `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `user_id` integer,
  `name` VARCHAR(100),
  `breed` VARCHAR(100),
  `type` varchar(100),
  `age` INTEGER,
  `description` LONGTEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (`user_id`) REFERENCES `users`(id),
   FOREIGN KEY (`type`) REFERENCES allowed_pets(`type`)
);;


-- -- create posts table
CREATE TABLE IF NOT EXISTS posts (
  `id` integer auto_increment primary key,
  `user_id` integer,
  `pet_id` integer,
  `title` longtext,
  `created_at` timestamp,
  `updated_at` timestamp,
   FOREIGN KEY (user_id) REFERENCES users(id),
   FOREIGN KEY (pet_id) REFERENCES pets(id)
);



-- -- create comments tables
CREATE TABLE IF NOT EXISTS comments (
  `id` integer auto_increment primary key,
  user_id integer,
  post_id integer,
  `content` longtext,
  `created_at` timestamp,
  `updated_at` timestamp,
   FOREIGN KEY (user_id) REFERENCES users(id),
   FOREIGN KEY (post_id) REFERENCES posts(id)
);


-- create friendships table
CREATE TABLE IF NOT EXISTS friendships (
  `id` integer auto_increment primary key,
  `user_id` integer,
  `friend_id` integer,
  `status` enum('pending','accepted'),
   FOREIGN KEY (user_id) REFERENCES users(id),
   FOREIGN KEY (friend_id) REFERENCES users(id)
);