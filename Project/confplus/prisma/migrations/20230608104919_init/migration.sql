-- CreateTable
CREATE TABLE "Users" (
    "userID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "Dates" (
    "dayNo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Institutions" (
    "institutionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "institutionName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Locations" (
    "locationID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Papers" (
    "paperID" TEXT NOT NULL PRIMARY KEY,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    "paperTitle" TEXT NOT NULL,
    "paperSummary" TEXT NOT NULL,
    "paperPDF" TEXT NOT NULL,
    "presenterID" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "sessionID" TEXT,
    CONSTRAINT "Papers_presenterID_fkey" FOREIGN KEY ("presenterID") REFERENCES "Presenter" ("presenterID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Papers_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Papers_sessionID_fkey" FOREIGN KEY ("sessionID") REFERENCES "Schedule" ("sessionID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Presenter" (
    "presenterID" TEXT NOT NULL PRIMARY KEY,
    "presenterFname" TEXT NOT NULL,
    "presenterLname" TEXT NOT NULL,
    "presenterImage" TEXT NOT NULL,
    "institutionID" INTEGER NOT NULL,
    "presenterEmail" TEXT NOT NULL,
    CONSTRAINT "Presenter_institutionID_fkey" FOREIGN KEY ("institutionID") REFERENCES "Institutions" ("institutionID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Author" (
    "authorID" TEXT NOT NULL PRIMARY KEY,
    "authorFname" TEXT NOT NULL,
    "authorLname" TEXT NOT NULL,
    "authorImage" TEXT NOT NULL,
    "institutionID" INTEGER NOT NULL,
    "authorEmail" TEXT NOT NULL,
    "paperID" TEXT NOT NULL,
    CONSTRAINT "Author_institutionID_fkey" FOREIGN KEY ("institutionID") REFERENCES "Institutions" ("institutionID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Author_paperID_fkey" FOREIGN KEY ("paperID") REFERENCES "Papers" ("paperID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ratings" (
    "ratingID" TEXT NOT NULL PRIMARY KEY,
    "evaluated" BOOLEAN NOT NULL DEFAULT false,
    "evaluation" INTEGER,
    "contribution" INTEGER,
    "strengths" TEXT,
    "weaknesses" TEXT,
    "userID" INTEGER NOT NULL,
    "paperID" TEXT NOT NULL,
    CONSTRAINT "Ratings_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ratings_paperID_fkey" FOREIGN KEY ("paperID") REFERENCES "Papers" ("paperID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Schedule" (
    "sessionID" TEXT NOT NULL PRIMARY KEY,
    "sessionTitle" TEXT NOT NULL,
    "dateNo" INTEGER NOT NULL,
    "locationID" INTEGER NOT NULL,
    CONSTRAINT "Schedule_dateNo_fkey" FOREIGN KEY ("dateNo") REFERENCES "Dates" ("dayNo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Schedule_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES "Locations" ("locationID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_firstName_lastName_key" ON "Users"("firstName", "lastName");

-- CreateIndex
CREATE UNIQUE INDEX "Papers_presenterID_key" ON "Papers"("presenterID");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_dateNo_key" ON "Schedule"("dateNo");
