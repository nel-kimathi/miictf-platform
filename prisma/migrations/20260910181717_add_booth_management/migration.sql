-- CreateTable
CREATE TABLE `exhibition_hall` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `exhibition_hall_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booth` (
    `id` VARCHAR(191) NOT NULL,
    `hallId` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `size` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `status` ENUM('AVAILABLE', 'RESERVED', 'ALLOCATED', 'OCCUPIED') NOT NULL DEFAULT 'AVAILABLE',
    `price` DECIMAL(10, 2) NULL,
    `exhibitorId` VARCHAR(191) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `booth_hallId_number_key`(`hallId`, `number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `booth` ADD CONSTRAINT `booth_hallId_fkey` FOREIGN KEY (`hallId`) REFERENCES `exhibition_hall`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booth` ADD CONSTRAINT `booth_exhibitorId_fkey` FOREIGN KEY (`exhibitorId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
