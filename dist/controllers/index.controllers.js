"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = exports.loginUser = void 0;
const database_1 = require("../database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = req.body;
    console.log(phone, password);
    try {
        const response = yield database_1.pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
        const user = response.rows[0];
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const accessToken = jsonwebtoken_1.default.sign({ phone: user.phone, email: user.email }, 'secret', { expiresIn: '1h' });
        yield database_1.pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS session_active BOOLEAN DEFAULT false');
        yield database_1.pool.query('UPDATE users SET session_active = $1 WHERE id = $2', [true, user.id]);
        const { password: passwordData } = user, restData = __rest(user, ["password"]);
        const auxUser = {
            user: Object.assign(Object.assign({}, restData), { session_active: true }),
            access_token: accessToken,
            token_type: 'bearer'
        };
        return res.status(200).json(auxUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server error');
    }
});
exports.loginUser = loginUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, email, password, address } = req.body;
    yield database_1.pool.query('INSERT INTO users (name, phone, email, password, address) VALUES ($1, $2, $3, $4, $5);', [name, phone, email, password, address]);
    return res.status(200).json(req.body);
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM users');
        console.log(response.rows);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server error');
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = parseInt(req.params.id);
        const response = yield database_1.pool.query('SELECT * FROM users WHERE id = $1', [idUser]);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server error');
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = parseInt(req.params.id);
        const { name, phone, email, password, address } = req.body;
        yield database_1.pool.query('UPDATE users SET name = $1, phone = $2, email = $3, password = $4, address = $5 WHERE id = $6', [name, phone, email, password, address, idUser]);
        const response = yield database_1.pool.query('SELECT * FROM users WHERE id = $1', [idUser]);
        if (response.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUser = response.rows[0];
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server error');
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = parseInt(req.params.id);
        yield database_1.pool.query('DELETE FROM users WHERE id = $1', [idUser]);
        return res.status(204).send();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server error');
    }
});
exports.deleteUser = deleteUser;
