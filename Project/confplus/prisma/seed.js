import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const conferenceDatePath = path.join(process.cwd(), 'app/json/conference-dates.json')
const institutionPath = path.join(process.cwd(), 'app/json/institutions.json')
const locationPath = path.join(process.cwd(), 'app/json/locations.json')
const userPath = path.join(process.cwd(), 'app/json/users.json')

async function main() {
    try {
        const conferences =  await fs.readJson(conferenceDatePath)
        const institutions = await fs.readJson(institutionPath)
        const locations = await fs.readJson(locationPath)
        const users = await fs.readJson(userPath)
   

        for (const conference of conferences)  await prisma.dates.create({ data: conference })
        for (const institution of institutions)  await prisma.institutions.create({ data: institution })
        for (const location of locations)  await prisma.locations.create({ data: location })
        for (const user of users)  await prisma.users.create({ data: user })
    } catch (error) {
        console.error(error)
        return { error :error.message }
     }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
    })
