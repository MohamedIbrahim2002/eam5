const db = require('../db');

// Create a new department
const createDepartment = async (req, res) => {
  try {
    const { name, companyid } = req.body;
    const connection = await db.getConnection();
    const result = await connection.query('INSERT INTO department (name, companyid) VALUES (?, ?)', [name,  companyid]);
    const department = await connection.query('SELECT * FROM department WHERE id = ?', [result.insertId]);
    connection.release();
    res.status(201).json({ message: 'Department created successfully', department: department[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a department
const updateDepartment = async (req, res) => {
  try {
    const { name, companyid } = req.body;
    const connection = await db.getConnection();
    await connection.query('UPDATE department SET name = ?,  companyid = ? WHERE id = ?', [name,  companyid, req.params.id]);
    const updatedDepartment = await connection.query('SELECT * FROM department WHERE id = ?', [req.params.id]);
    connection.release();
    if (!updatedDepartment.length) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json({ message: 'Department updated successfully', department: updatedDepartment[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const departments = await connection.query('SELECT * FROM department');
    connection.release();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a department by ID
const getDepartmentById = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const department = await connection.query('SELECT * FROM department WHERE id = ?', [req.params.id]);
    connection.release();
    if (!department.length) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(department[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a department
const deleteDepartment = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const deleted = await connection.query('DELETE FROM department WHERE id = ?', [req.params.id]);
    connection.release();
    if (deleted.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(204).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//search a department by name
const searchDepartment= async (req, res) => {
  try{
    const connection = await db.getConnection();
    const department = await connection.query('SELECT * FROM department WHERE name= ?', [req.params.name]);
    connection.release();
    if (!department.length) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(department[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  searchDepartment
};
