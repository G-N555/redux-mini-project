const router = require("express").Router();
const builds = require("./builds");
const {
  store,
  addProject,
  removeProject,
  modifyProject,
} = require("../../redux.js");

router.get("/", (req, res) => {
  const results = { projects: store.getState() };
  res.status(200).send(results);
});

router.post("/", (req, res) => {
  const project = req.body;
  store.dispatch(addProject(project));
  res.status(200).send({ projects: store.getState() });
});

router.get("/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  res
    .status(200)
    .send(store.getState().find((project) => project.id === projectId));
});

router.patch("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const { project } = req.body;
  // TODO edit a projects information. Make sure to validate whats being sent!
  res.status(418).json({ message: "Not Implemented" });
});

router.delete("/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  store.dispatch(removeProject(projectId));
  res.status(200).send(store.getState());
});

router.use("/:projectId/builds", builds);

module.exports = router;
