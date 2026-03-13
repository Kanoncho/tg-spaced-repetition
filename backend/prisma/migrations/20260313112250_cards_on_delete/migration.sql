-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_noteId_fkey";

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
