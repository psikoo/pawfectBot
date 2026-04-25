const db = require('./connection.js');

const banned = `'774119126129049642', '1172067536397938733', '791663437334970399', '566111661619150859', '637248628418674713', '721755865249480775', '747578139273592972', '982911033553354763', '842624461487734785', '523770905843990530'`

async function getTop() {
	const queryText = `
		SELECT author_id, COUNT(*) AS message_count FROM messages
		WHERE author_id NOT IN (${banned})
		GROUP BY author_id
		ORDER BY message_count DESC 
		LIMIT 10;
	`;
	
	try { 
		const res = await db.query(queryText);
		return res.rows;
	} 
	catch (err) { console.error('🟥 Error getting data:', err.stack); }
}

async function getMessage() {
	const queryText = `
		SELECT * FROM messages
    WHERE author_id NOT IN (${banned})
    ORDER BY RANDOM() 
    LIMIT 1;
	`;
	
	try { 
		const res = await db.query(queryText);
		return res.rows;
	} 
	catch (err) { console.error('🟥 Error getting data:', err.stack); }
}

module.exports = {
  getTop,
	getMessage
};