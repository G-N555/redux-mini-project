const redux = require("redux");
const shortid = require("shortid");

const addProject = (project) => {
  const action = {
    type: "ADD_PROJECT",
    payload: project,
  };
  return action;
};

const removeProject = (projectId) => {
  const action = {
    type: "REMOVE_PROJECT",
    payload: projectId,
  };
  return action;
};

const modifyProject = (project) => {
  const action = {
    type: "MODIFY_PROJECT",
    payload: project,
  };
  return action;
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_PROJECT":
      action.payload.id = shortid.generate();
      return [...state, action.payload]; //spread operator ; make shallow copy and concatenate new project
    case "REMOVE_PROJECT":
      return state.filter((project) => project.id !== action.payload);
    case "MODIFY_PROJECT":
      for (const project of state) {
        if (project.id === action.payload.id) {
          Object.assign(project, action.payload);
          break;
        }
      }
      return state;
    default:
      return state;
  }
};

const store = redux.createStore(reducer);

module.exports = { store, addProject, removeProject, modifyProject };
