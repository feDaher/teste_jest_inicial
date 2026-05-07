import { UserRepository } from './UserRepository.js';

export class UserService {
  /**
   * Construtor com injeção de dependência
   * @param {UserRepository} userRepository - Instância do repositório
   */
  constructor(userRepository) {
    if (!(userRepository instanceof UserRepository)) {
      throw new Error('userRepository deve ser uma instância de UserRepository');
    }
    this.userRepository = userRepository;
  }

  /**
   * Obtém usuários formatados (apenas id, name, email)
   * @returns {Promise<Array>} Array de usuários formatados
   */
  async getUsers() {
    const usuariosBrutos = await this.userRepository.getUsers();
    return usuariosBrutos.map(usuario => ({
      id: usuario.id,
      name: usuario.name,
      email: usuario.email
    }));
  }

  async getUsersById(id) {
    const user = await this.userRepository.getUserById(id);
    return user;
  }
}
