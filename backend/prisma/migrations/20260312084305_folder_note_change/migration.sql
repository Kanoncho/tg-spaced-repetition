/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[path]` on the table `Note` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `Folder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mtime` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Folder_name_key";

-- DropIndex
DROP INDEX "Note_name_key";

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "mtime" INTEGER NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_path_key" ON "Folder"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Note_path_key" ON "Note"("path");
