import type { Request, Response } from "express";
import User from "~models/user";
import userSeeds from "~database/seedDB/userSeeds";

const seedUsers = async (_: Request, res: Response): Promise<Response> => {
  await User.deleteMany({});
  await User.insertMany(userSeeds);

  const users = await User.find({});

  return res.status(201).send(users);
};

export default seedUsers;
