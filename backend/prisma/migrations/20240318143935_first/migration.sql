-- CreateTable
CREATE TABLE "codeEntries" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "codeLanguage" TEXT NOT NULL,
    "stdin" TEXT NOT NULL,
    "timeStamp" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "codeEntries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "codeEntries_username_key" ON "codeEntries"("username");
