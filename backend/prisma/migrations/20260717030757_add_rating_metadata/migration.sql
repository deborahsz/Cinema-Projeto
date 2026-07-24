-- AlterTable
ALTER TABLE "ratings" ADD COLUMN     "posterPath" TEXT,
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';
