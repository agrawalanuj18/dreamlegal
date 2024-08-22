-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "active" TEXT NOT NULL DEFAULT 'draft',
    "category" TEXT[],
    "deployement" TEXT[],
    "mobileAvailable" BOOLEAN,
    "focusCountries" TEXT[],
    "avgTimeAdoption" TEXT,
    "languages" TEXT[],
    "securityCertificate" TEXT,
    "integration" TEXT[],
    "description" TEXT,
    "usp" TEXT,
    "upcomingUpdates" TEXT,
    "userCategory" TEXT[],
    "industry" TEXT[],
    "industryPercentage" TEXT[],
    "practiceAreas" TEXT[],
    "teamSize" TEXT,
    "processLifecycle" TEXT[],
    "features" TEXT[],
    "freeTrial" BOOLEAN,
    "timePeriod" TEXT,
    "freeVersion" BOOLEAN,
    "pricingModel" TEXT,
    "contractPeriod" TEXT,
    "nameofPlan" TEXT[],
    "validity" TEXT[],
    "price" TEXT[],
    "pricingParams" TEXT[],
    "Demo" TEXT[],
    "DemoNote" TEXT,
    "support" TEXT[],
    "supportNote" TEXT,
    "training" TEXT[],
    "trainingNote" TEXT,
    "storage" TEXT[],
    "storageNote" TEXT,
    "fileSize" TEXT[],
    "fileSizeNote" TEXT,
    "maintenance" TEXT[],
    "maintenanceNote" TEXT,
    "reqForChange" TEXT[],
    "reqForChangeNote" TEXT,
    "trainingReq" TEXT[],
    "trainingReqNote" TEXT,
    "dataMigration" TEXT[],
    "dataMigrationNote" TEXT,
    "Images" TEXT[],
    "videoUrl" TEXT[],
    "attachments" TEXT[],
    "youtubeUrl" TEXT[],
    "linkedinUrl" TEXT[],
    "twitterUrl" TEXT[],
    "instagramUrl" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companyInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
