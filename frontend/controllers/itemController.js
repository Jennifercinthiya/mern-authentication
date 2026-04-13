const pool = require('../config/db');

// Add new item
exports.addItem = async (req, res) => {
  try {
    const { user_id, title, description, status } = req.body;

    if (!user_id || !title) {
      return res.status(400).json({ message: 'user_id and title required' });
    }

    const query = 'INSERT INTO items (user_id, title, description, status) VALUES (?, ?, ?, ?)';
    const [result] = await pool.execute(query, [user_id, title, description || '', status || 'pending']);
    res.json({ message: 'Item added successfully', itemId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all items
exports.getItems = async (req, res) => {
  try {
    const query = 'SELECT * FROM items';
    const [results] = await pool.execute(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const { id, title, description, status } = req.body;
    if (!id) return res.status(400).json({ message: 'Item id required' });

    const query = 'UPDATE items SET title=?, description=?, status=? WHERE id=?';
    await pool.execute(query, [title, description, status, id]);
    res.json({ message: 'Item updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: 'Item id required' });

    const query = 'DELETE FROM items WHERE id=?';
    await pool.execute(query, [id]);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};