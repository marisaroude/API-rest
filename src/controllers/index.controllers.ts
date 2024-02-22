import { Request, Response } from 'express';
import { pool } from '../database';
import { QueryResult } from 'pg';
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { phone, password } = req.body;
    console.log(phone, password)
    try {
        const response: QueryResult = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);

        const user = response.rows[0];
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const accessToken = jwt.sign({ phone: user.phone, email: user.email }, 'secret', { expiresIn: '1h' });
        await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS session_active BOOLEAN DEFAULT false');
        await pool.query('UPDATE users SET session_active = $1 WHERE id = $2', [true, user.id]);

        const { password: passwordData, ...restData } = user
        const auxUser = {
            user: {
                ...restData,
                session_active: true
            },
            access_token: accessToken,
            token_type: 'bearer'
        }
        return res.status(200).json(auxUser);
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server error')
    }
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, phone, email, password, address } = req.body;
    await pool.query('INSERT INTO users (name, phone, email, password, address) VALUES ($1, $2, $3, $4, $5);', [name, phone, email, password, address]);
    return res.status(200).json(req.body);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM users')
        console.log(response.rows);
        return res.status(200).json(response.rows);

    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server error')
    }
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const idUser = parseInt(req.params.id)
        const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [idUser])
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server error')
    }
}
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const idUser = parseInt(req.params.id);
        const { name, phone, email, password, address } = req.body;

        await pool.query('UPDATE users SET name = $1, phone = $2, email = $3, password = $4, address = $5 WHERE id = $6', [name, phone, email, password, address, idUser]);

        const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [idUser]);

        if (response.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = response.rows[0];
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server error')
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const idUser = parseInt(req.params.id)
        await pool.query('DELETE FROM users WHERE id = $1', [idUser])
        return res.status(204).send();
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server error')
    }
}