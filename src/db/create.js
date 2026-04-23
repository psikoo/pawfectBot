const db = require('./connection.js');

async function storeMessage(message) {
	const queryText = `
		INSERT INTO messages (message_id, author_id, content) 
		VALUES ($1, $2, $3)
		ON CONFLICT (message_id) DO NOTHING;
	`;
	const values = [message.id, message.author.id, message.content];

	try { await db.query(queryText, values); } 
	catch (err) { console.error('🟥 Error saving message:', err.stack); }
}

module.exports = {
  storeMessage
};