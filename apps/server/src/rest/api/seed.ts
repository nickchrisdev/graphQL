import express from "express";
import { getConnection } from "typeorm";

import {
  Author,
  Avatar,
  Book,
  BookCopy,
  Review,
  User
} from "../../database/entity";
import { HttpStatusCodes } from "../../http-status-codes";
import { loadFixtures } from "../../testUtils/fixtures";

const router = express.Router();

router.post("/", async (req, res) => {
  const connection = getConnection();

  const tables = [Book, Review, BookCopy, Author, User, Avatar].map(
    (entity) => connection.getMetadata(entity).tableName
  );
  tables.push("users_favourite_books");

  await connection.query(`TRUNCATE TABLE ${tables.join(", ")};`);
  await loadFixtures();

  res.sendStatus(HttpStatusCodes.OK);
});

export { router as seed };
