const db = require('./connection.js');

async function getTop() {
	const queryText = `
		SELECT author_id, COUNT(*) AS message_count FROM messages
		GROUP BY author_id
		ORDER BY message_count DESC 
		LIMIT 25;
	`;
	
	try { 
		const res = await db.query(queryText);
		return res.rows;
	} 
	catch (err) { console.error('🟥 Error getting top:', err.stack); }
}

module.exports = {
  getTop
};