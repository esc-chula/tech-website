-- CreateTable
CREATE TABLE "UserServiceRole" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "appId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "UserServiceRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserServiceRole_userId_appId_key" ON "UserServiceRole"("userId", "appId");

-- AddForeignKey
ALTER TABLE "UserServiceRole" ADD CONSTRAINT "UserServiceRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
