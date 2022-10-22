-- CreateEnum
CREATE TYPE "Size" AS ENUM ('S', 'M', 'L', 'XL');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "size" "Size"[] DEFAULT ARRAY['S', 'XL', 'M', 'L']::"Size"[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'USER';
