-- CreateTable
CREATE TABLE "Tool" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToTool" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TagToTool_AB_unique" ON "_TagToTool"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToTool_B_index" ON "_TagToTool"("B");

-- AddForeignKey
ALTER TABLE "_TagToTool" ADD CONSTRAINT "_TagToTool_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTool" ADD CONSTRAINT "_TagToTool_B_fkey" FOREIGN KEY ("B") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
