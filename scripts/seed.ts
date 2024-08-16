const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient();

async function main() {
    try {
        // First, delete all existing records in the admin table
        await database.admin.deleteMany({});
        console.log("Deleted all existing admin records");

        // Then, create new admin records
        await database.admin.createMany({
            data: [
                {
                    email: "ekiregha@gmail.com",
                    name: "Ezechiel",
                    phone: "+250790802201"
                },
                {
                    email: "kkiregha@gmail.com",
                    name: "EzechielWill",
                    phone: "+250790001171"
                }
            ]
        });
        console.log("Successfully created new admin records");
    } catch (error) {
        console.error("Error manipulating the Admin table:", error);
    } finally {
        await database.$disconnect();
    }
}

main();