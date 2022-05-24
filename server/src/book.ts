import * as mongodb from "mongodb";

export interface Book {
  title: string;
  author: string;
  genre?: string;
  start: string;
  finish?: string;
  chapters: number;
  _id?: mongodb.ObjectId;
}
