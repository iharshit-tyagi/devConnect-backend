/*
  Warnings:

  - A unique constraint covering the columns `[sender_id,receiver_id]` on the table `match_requests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "match_requests_sender_id_receiver_id_key" ON "match_requests"("sender_id", "receiver_id");
