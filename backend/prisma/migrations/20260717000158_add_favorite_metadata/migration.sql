/*
  Warnings:

  - Added the required column `title` to the `favorites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "favorites" ADD COLUMN     "posterPath" TEXT,
ADD COLUMN     "releaseDate" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "voteAverage" DOUBLE PRECISION NOT NULL DEFAULT 0;
