// ===== UserRepository.js =====
// Camada de Repositório: Responsável pelo acesso direto aos dados (API).

export class UserRepository {
  async getUsers() {
    try {
      // fetch() é uma função assíncrona que retorna uma Promise.
      // O 'await' pausa a execução até que a Promise seja resolvida.
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      // Verifica se a resposta HTTP está ok (status 200-299).
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      
      // response.json() também retorna uma Promise, por isso usamos 'await'.
      // Ela converte o corpo da resposta JSON em um objeto JavaScript.
      const users = await response.json();
      return users;
    } catch (error) {
      // Propaga o erro para quem chamou.
      throw new Error(`Erro no repositório: ${error.message}`);
    }
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