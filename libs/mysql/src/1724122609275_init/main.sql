DROP TABLE IF EXISTS `migrations`;
-- 创建迁移表
CREATE TABLE `migrations`
(
    `id`         INTEGER     NOT NULL AUTO_INCREMENT,
    `version`    VARCHAR(64) NOT NULL COMMENT '版本标识',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`),
    UNIQUE INDEX `migrations_version_unique` (`version`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;


INSERT INTO `migrations` (`version`) VALUES ('0.0.1');
