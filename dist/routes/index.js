"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controllers_1 = require("../controllers/index.controllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/api/v1/users/login', index_controllers_1.loginUser);
router.get('/api/v1/users', index_controllers_1.getUsers);
router.get('/api/v1/users/:id', authMiddleware_1.authenticateToken, index_controllers_1.getUser);
router.post('/api/v1/users', authMiddleware_1.authenticateToken, index_controllers_1.createUser);
router.put('/api/v1/users/:id', authMiddleware_1.authenticateToken, index_controllers_1.updateUser);
router.delete('/api/v1/users/:id', authMiddleware_1.authenticateToken, index_controllers_1.deleteUser);
exports.default = router;
