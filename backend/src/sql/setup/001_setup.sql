CREATE DATABASE IF NOT EXISTS `social-media`;
use `social-media`

-- create user table
CREATE TABLE IF NOT EXISTS user (
  `user_id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(50) UNIQUE NOT NULL,
  `username` VARCHAR(100) UNIQUE NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `provider` ENUM("email","google","github") NOT NULL,
  `password` VARCHAR(100),
  `profile_picture` VARCHAR(100),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -- create post table
CREATE TABLE IF NOT EXISTS post (
  `post_id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `user_id` INTEGER NOT NULL,
  `content` LONGTEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- -- create post_asset table
CREATE TABLE IF NOT EXISTS post_asset (
  `post_asset_id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `post_id` INTEGER NOT NULL,
  `url` VARCHAR(100) NOT NULL,
  `type` ENUM("image", "video") NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (post_id) REFERENCES post(post_id)
);

-- create like tables
CREATE TABLE IF NOT EXISTS `like` (
  `like_id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `user_id` INTEGER NOT NULL,
  `post_id` INTEGER NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES user(user_id),
   FOREIGN KEY (post_id) REFERENCES post(post_id)
);

-- create comment tables
CREATE TABLE IF NOT EXISTS comment (
  `comment_id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `user_id` INTEGER NOT NULL,
  `post_id` INTEGER NOT NULL,
  `parent_comment_id` INTEGER,
  `content` longtext NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES user(user_id),
   FOREIGN KEY (post_id) REFERENCES post(post_id)
);


-- create friendship table
CREATE TABLE IF NOT EXISTS following (
  `following_id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `following_user_id` INTEGER NOT NULL,
  `followed_user_id` INTEGER NOT NULL,
  `status` ENUM('pending','accepted'),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (following_user_id) REFERENCES user(user_id),
   FOREIGN KEY (followed_user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS token (
  `token` VARCHAR(250) PRIMARY KEY NOT NULL,
  `user_id` INTEGER NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   FOREIGN KEY (user_id) REFERENCES user(user_id),
)