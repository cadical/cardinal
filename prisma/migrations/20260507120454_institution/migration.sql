-- CreateTable
CREATE TABLE "Institution" (
    "id" TEXT NOT NULL,
    "instName" TEXT NOT NULL,
    "instType" TEXT NOT NULL,
    "cac" TEXT NOT NULL,
    "yearEstablished" INTEGER,
    "staffCount" INTEGER,
    "bedCapacity" INTEGER,
    "state" TEXT NOT NULL,
    "lga" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "altPhone" TEXT,
    "email" TEXT NOT NULL,
    "services" TEXT[],
    "specialistOpts" TEXT[],
    "consultOpts" TEXT[],
    "reagentOpts" TEXT[],
    "eduOpts" TEXT[],
    "volume" TEXT,
    "notes" TEXT,
    "nafdac" TEXT,
    "pcn" TEXT,
    "confirmDocs" BOOLEAN NOT NULL DEFAULT false,
    "accountEmail" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Institution_accountEmail_key" ON "Institution"("accountEmail");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
