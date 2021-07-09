import { Router } from "express";

// import User controllers
import {
  createUser,
  deleteUser,
  dropUsers,
  getUsers,
  seedUsers,
  updateUser,
  viewUser
} from "api/controllers/users";

// import Tag controllers
import {
  createTag,
  deleteTag,
  dropTags,
  getTags,
  seedTags,
  updateTag,
  viewTag
} from "api/controllers/tags";

const router = Router();

// setup user routes, which call the controllers
router.post("/users/create", createUser);
router.get("/users", getUsers);
router.post("/users/seed", seedUsers);
router.post("/users/drop", dropUsers);
router.get("/users/view/:id", viewUser);
router.put("/users/update/:id", updateUser);
router.delete("/users/delete/:id", deleteUser);

// setup tag routes, which call the controllers
router.post("/tags/create", createTag);
router.get("/tags", getTags);
router.post("/tags/seed", seedTags);
router.post("/tags/drop", dropTags);
router.get("/tags/view/:id", viewTag);
router.put("/tags/update/:id", updateTag);
router.delete("/tags/delete/:id", deleteTag);

export default router;
