import { Pool } from 'pg';

const pool = new Pool({
    connectString: 'postgres://ibuiyrvi:6ZDtKSRYydWPE9n0qlVtVRG5PFfeA3AC@heffalump.db.elephantsql.com/ibuiyrvi',
});

export default pool;