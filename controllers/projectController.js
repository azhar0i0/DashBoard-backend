const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

exports.addProject = async (req, res) => {
  const { name, client, budget, status, startDate, endDate, notes } = req.body;
  const project = new Project({ name, client, budget, status, startDate, endDate, notes });
  await project.save();
  res.status(201).json(project);
};

exports.updateProject = async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};
