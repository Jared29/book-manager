import * as mongodb from "mongodb";
import { Book } from "./book";

export const collections: {
  books?: mongodb.Collection<Book>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("bookDB");
  await applySchemaValidation(db);

  const booksCollection = db.collection<Book>("books");
  collections.books = booksCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "author", "start", "chapters"],
      additionalProperties: false,
      properties: {
        _id: {},
        title: {
          bsonType: "string",
          description: "'title' is required and is a string",
        },
        author: {
          bsonType: "string",
          description: "'author' is required and is a string",
        },
        genre: {
          bsonType: "string",
          description: "'genre' is a string",
        },
        start: {
          bsonType: "string",
          description: "'start' is required and is a string",
        },
        finish: {
          bsonType: "string",
          description: "'finish' is a string",
        },
        chapters: {
          bsonType: "int",
          description: "'chapters' is required and is an int",
        },
      },
    },
  };

  await db
    .command({
      collMod: "books",
      validator: jsonSchema,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === "NameSpaceNotFound") {
        await db.createCollection("books", { validator: jsonSchema });
      }
    });
}
