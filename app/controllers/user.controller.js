const UserModel = require('../models/user.model');

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await UserModel.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await UserModel.getUserById(id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.json(user);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createUser(req, res) {
        try {
            const { name, email } = req.body;
            const image = req.file?.path || null;
            if (!name || !email) {
                return res.status(400).json({ message: 'Name and email are required' });
            }
            const id = await UserModel.createUser(name, email, image);
            res.json({ message: `User created with id ${id}` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const { name, email } = req.body;
            const image = req.file?.path || null;
            await UserModel.updateUser(id, name, email, image);
            res.json({ message: `User updated with id ${id}` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            await UserModel.deleteUser(id);
            res.json({ message: `User deleted with id ${id}` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserController(); // Exporting an instance directly
