/*
    store() -> Criar um novo dado
    index() -> Listar todos os dados
    show() -> Exibir um dado específico
    update() -> Atualizar um dado específico
    delete() -> Deletar um dado específico
*/

import { v4 } from 'uuid';
import User from '../models/User.js';

class UserController {
  async store(request, response) {
    try { const { name, email, password_hash, admin } = request.body;

    const user = await User.create({ id: v4(), name, email, password_hash, admin });

    return response.status(201).json({ message: 'User created', 
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin
     });
     
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return response.status(400).json({ error: error.message });
  }
}}


export default new UserController();
