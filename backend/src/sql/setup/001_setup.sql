CREATE DATABASE IF NOT EXISTS `social-media`;
use `social-media`

-- create user table
CREATE TABLE IF NOT EXISTS user (
  `user_id` integer auto_increment primary key,
  `email` varchar(50),
  `username` varchar(100),
  `first_name` varchar(100),
  `last_name` varchar(100),
  `password` varchar(100),
  `profile_picture` varchar(100),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -- create post table
CREATE TABLE IF NOT EXISTS post (
  `post_id` integer auto_increment primary key,
  `user_id` integer,
  `content` longtext,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- -- create post_asset table
CREATE TABLE IF NOT EXISTS post_asset (
  `post_asset_id` INTEGER auto_increment primary key,
  `post_id` INTEGER,
  `url` VARCHAR(100),
  `type` ENUM("image", "video"),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (post_id) REFERENCES post(post_id)
);

-- create like tables
CREATE TABLE IF NOT EXISTS `like` (
  `like_id` INTEGER auto_increment PRIMARY KEY,
  `user_id` INTEGER NOT NULL,
  `post_id` INTEGER NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES user(user_id),
   FOREIGN KEY (post_id) REFERENCES post(post_id)
);

-- create comment tables
CREATE TABLE IF NOT EXISTS comment (
  `comment_id` INTEGER auto_increment PRIMARY KEY,
  `user_id` INTEGER NOT NULL,
  `post_id` INTEGER NOT NULL,
  `parent_comment_id` INTEGER,
  `content` longtext,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES user(user_id),
   FOREIGN KEY (post_id) REFERENCES post(post_id)
);


-- create friendship table
CREATE TABLE IF NOT EXISTS following (
  `following_id` integer auto_increment primary key,
  `following_user_id` integer,
  `followed_user_id` integer,
  `status` enum('pending','accepted'),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (following_user_id) REFERENCES user(user_id),
   FOREIGN KEY (followed_user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS token (
  `token` VARCHAR(250) PRIMARY KEY,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)