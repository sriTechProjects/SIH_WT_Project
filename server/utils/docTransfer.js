const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://relevancysync:yncZKIP3CQPj54ZZ@cluster0.fqcm6.mongodb.net/db4drdo?retryWrites=true&w=majority"; // Replace with your MongoDB Atlas URI
const client = new MongoClient(uri);

const transferDocuments = async () => {
    try {
        await client.connect();

        const database = client.db("db4drdo"); // Replace with your DB name
        const sourceCollection = database.collection("externalExperts");
        const destinationCollection = database.collection("externalexperts");

        // Fetch all documents from externalExperts
        const documents = await sourceCollection.find({}).toArray();

        if (documents.length > 0) {
            // Insert documents into externalexperts
            const result = await destinationCollection.insertMany(documents);
            console.log(`${result.insertedCount} documents transferred successfully!`);
        } else {
            console.log("No documents found in externalExperts.");
        }
    } catch (error) {
        console.error("Error transferring documents:", error);
    } finally {
        await client.close();
    }
};

transferDocuments();
