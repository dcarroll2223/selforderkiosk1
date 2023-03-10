import pool from '../src/db.js';

export const getAllProducts = async (req, res, next) => {
  const { category } = req.query;
  try {
    if (category) {
      const result = await pool.query(
        'SELECT * FROM products WHERE category = $1',
        [category]
      );
      return res.send(result.rows);
    } else {
      const result = await pool.query('SELECT * FROM products');
      return res.send(result.rows);
    }
  } catch (error) {
    next(error);
  }
};
