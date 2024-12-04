DROP TABLE IF EXISTS `migrations`;

-- 创建迁移表
CREATE TABLE
  `migrations` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL COMMENT '迁移名称',
    `created_at` DATETIME (3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE INDEX `migrations_name_unique` (`name`)
  ) DEFAULT CHARACTER
SET
  utf8mb4 COLLATE utf8mb4_unicode_ci;
