export class UserRepository {
  /**
   * Busca os usuários da API JSONPlaceholder
   * @returns {Promise<Array>} Array de usuários brutos
   */
  async getUsers() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const users = await response.json();
      return users;
    } catch (error) {
      throw new Error(`Erro ao buscar usuários: ${error.message}`);
    }
  }
}
