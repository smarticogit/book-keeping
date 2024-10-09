-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "doc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statement" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerNumber" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "beginningBalance" TEXT NOT NULL,
    "endingBalance" TEXT NOT NULL,
    "statementDate" TEXT NOT NULL,
    "statementFile" BYTEA NOT NULL,
    "statementKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Statement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountActivity" (
    "id" TEXT NOT NULL,
    "statementId" TEXT NOT NULL,
    "postDate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "debit" TEXT NOT NULL,
    "credit" TEXT NOT NULL,
    "balance" TEXT NOT NULL,
    "category" TEXT,

    CONSTRAINT "AccountActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- AddForeignKey
ALTER TABLE "Statement" ADD CONSTRAINT "Statement_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountActivity" ADD CONSTRAINT "AccountActivity_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "Statement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
