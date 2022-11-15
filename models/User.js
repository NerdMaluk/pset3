const { Pool } = require("pg");
const pool = require("../config/config_db");
const bcrypt = require('bcrypt');

class User {

    
    static async get_byId(id) {
        try {
            const user = await pool.query("SELECT * FROM users WHERE id = $1",[id]);
            return user.rows[0];
        } catch (error) {
            console.error(error.message);
        }
    }

    static async get_byEmail(email) {
        try {
            const user = await pool.query("SELECT * FROM users WHERE email = $1",[email]);

            return user.rows[0];
        } catch (error) {
            console.error(error.message);
        }
    }
    static async check_password(password, password_hash) {
        return await bcrypt.compare(password, password_hash);
    }

    

    static async create_user(name, username, email, password, birth, gender) {
        try {
            const password_hash = await bcrypt.hash(password, 8);
          const user = await pool.query("INSERT INTO users (name, username, email, password, birth, gender) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [name, username, email, password_hash, birth, gender]);
          return user.rows[0]  
        } catch (error) {
            console.error(error.message);
        }
    }

    static async update_user(id, name, username, email, password, birth, gender) {
        try {
            let user;

            if(name) {
                user = await pool.query("UPDATE users SET  name = $1 WHERE  id = $2 RETURNING *", [name, id]);
            }
            if (username) {
                 user = await pool.query("UPDATE users SET  username = $1 WHERE  id = $2 RETURNING *", [username, id]); 
            }
            if(email) {
                user = await pool.query("UPDATE users SET  email = $1 WHERE  id = $2 RETURNING *", [email, id]);
            }
            if(password) {
                const password_hash = await bcrypt.hash(password, 8);
                user = await pool.query("UPDATE users SET  password = $1 WHERE  id = $2 RETURNING *", [password_hash, id]);
            }
            if(birth) {
                user = await pool.query("UPDATE users SET  birth = $1 WHERE  id = $2 RETURNING *", [birth, id]);
            }
            if(gender) {
                user = await pool.query("UPDATE users SET  gender = $1 WHERE  id = $2 RETURNING *", [gender, id]);
            }
           return user.rows[0]
        } catch (error) {
            console.error(error.message);
        }
    }

    static async delete_user(id) {
        try {
                await pool.query("DELETE FROM users WHERE id = $1", [id]); 
            
        } catch (error) {
            console.error(error.message);
        }

    }
}
module.exports = User;