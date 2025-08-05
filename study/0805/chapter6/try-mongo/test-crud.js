require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const uri = process.env.MONGODB_URI_TEST;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
});

async function main() {
  try {
    await client.connect();
    console.log("MongoDB에 연결되었습니다.");

    const collection = client.db("test").collection("person");

    await collection.insertOne({
      name: "John Doe",
      age: 30,
    });

    console.log("데이터가 성공적으로 삽입되었습니다.");

    const documents = await collection.find({}).toArray();
    console.log("현재 데이터:", documents);

    await collection.updateOne({ name: "John Doe" }, { $set: { age: 31 } });
    console.log("데이터가 성공적으로 업데이트되었습니다.");

    const updatedDocuments = await collection.find({}).toArray();
    console.log("업데이트된 데이터:", updatedDocuments);

    await client.close();
  } catch (error) {
    console.error("에러 발생:", error);
  } finally {
    await client.close();
  }
}

main();
