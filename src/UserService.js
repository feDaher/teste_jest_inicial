// Classe de serviço que recebe UserRepository por injeção de dependência
// Formata os dados selecionando apenas id, name e email
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
}

// ===== Exemplo de uso (usage.js) =====
// Para testar a API real:

// async function main() {
//   const repo = new UserRepository();
//   const service = new UserService(repo);
//   try {
//     const users = await service.getUsers();
//     console.log('Users:', users);
//   } catch (err) {
//     console.error('Erro:', err.message);
//   }
// }

// main();


// ===== UserService.test.js =====
// Testes unitários simplificados com Jest.
// Instale: npm init -y && npm i --save-dev jest
// Rode: npx jest UserService.test.js