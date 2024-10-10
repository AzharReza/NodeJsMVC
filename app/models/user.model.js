// user.model.js
const pool = require("../models/db.js");
const path = require("path");
const fs = require("fs");

class UserModel {
    async getAllUsers() {
        try {
            const [rows] = await pool.execute('SELECT * FROM users');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id) {
        try {
            const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async createUser(name, email, image=null) {
        try {
            const [results] = await pool.execute('INSERT INTO users (name, email, image) VALUES (?, ?, ?)', [name, email, image]);
            return results.insertId;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id, name, email, image) {
        try {
            // Initialize the base query and the parameters array
            let query = 'UPDATE users SET';
            const params = [];

            // Dynamically add fields to the query and params based on non-undefined values
            if (name !== undefined && name !== null) {
                query += ' name = ?';
                params.push(name);
            }
            if (email !== undefined && email !== null) {
                query += params.length ? ', email = ?' : ' email = ?';
                params.push(email);
            }
            if (image !== undefined && image !== null) {
                await this.removeOldImage(id);
                query += params.length ? ', image = ?' : ' image = ?';
                params.push(image);
            }

            // Check if there are columns to update
            if (params.length === 0) {
                throw new Error('No fields to update');
            }

            // Add the WHERE clause for the user ID
            query += ' WHERE id = ?';
            params.push(id);

            // Execute the query
            await pool.execute(query, params.map(param => param === undefined ? null : param));
        } catch (error) {
            throw error;
        }
    }

    async removeOldImage(id){
        // Step 1: Retrieve the current user data to check if an image exists
        const user = await this.getUserById(id);
        // Step 2: Delete the old image if it exists
        if (user && user.image) {
            const oldImagePath = path.join(__dirname, '../../', user.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); // Delete the file
            }
        }
    }

    async deleteUser(id) {
        try {
            await pool.execute('DELETE FROM users WHERE id = ?', [id]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserModel();
