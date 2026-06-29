/*
    store() -> Criar um novo dado
    index() -> Listar todos os dados
    show() -> Exibir um dado específico
    update() -> Atualizar um dado específico
    delete() -> Deletar um dado específico
*/

import { v4 } from 'uuid';
import User from '../models/User.js';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';

class UserController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (error) {
      return response.status(400).json({ error: error.errors });
    }

    try {
      const { name, email, password, admin } = request.body;

      const existingUser = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        return response.status(400).json({ message: 'Email already in use' });
      }

      const password_hash = await bcrypt.hash(password, 10);

      const user = await User.create({
        id: v4(),
        name,
        email,
        password_hash,
        admin,
      });

      return response.status(201).json({
        message: 'User created',
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();

