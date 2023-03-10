import pool from '../src/db.js';

export const getAllCategories = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    if (result.rows.length === 0) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.send(result.rows);
  } catch (error) {
    next(error);
  }
};
