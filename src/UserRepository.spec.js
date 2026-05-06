/*
  UserRepository.spec.js - Arquivo de teste corrigido
  Correções aplicadas:
  - URL esperada: 'https://jsonplaceholder.typicode.com/users'
  - Mensagem de erro: 'Erro ao buscar usuários: Erro HTTP! Status: 500'
  - Mantida estrutura com comentários didáticos linha a linha
*/

import { UserRepository } from './UserRepository.js';

describe('UserRepository', () => {
  let repository;

  beforeEach(() => {
    // Inicializa nova instância do repositório antes de cada teste para isolamento
    repository = new UserRepository();
    // Limpa todos os mocks para evitar interferência entre testes
    jest.clearAllMocks();
  });

  it('deve buscar usuários com sucesso da URL correta', async () => {
    // Prepara dados mockados para simular resposta da API
    const mockUsers = [{ id: 1, name: 'John Doe' }];
    // Mock global do fetch para controlar a resposta da requisição HTTP
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      })
    );

    // Executa o método sob teste
    const users = await repository.getUsers();

    // Verifica se fetch foi chamado com a URL correta
    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    // Verifica se os usuários retornados são os esperados
    expect(users).toEqual(mockUsers);
  });

  it('deve lançar erro com mensagem específica em caso de falha HTTP 500', async () => {
    // Mock do fetch para simular erro HTTP com status 500
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    // Verifica se o erro lançado corresponde exatamente à mensagem esperada
    await expect(repository.getUsers()).rejects.toThrow(
      'Erro ao buscar usuários: Erro HTTP! Status: 500'
    );
  });
});


// /*
//   run.spec.js - Verificado e confirmado correto
//   - Testa função run que orquestra o fluxo (service -> repo)
//   - Usa mocks para isolar dependências
//   - Estrutura didática com comentários
// */

// import { run } from './run';

// // Mock do UserService para teste de integração
// jest.mock('./UserService');

// const MockedUserService = require('./UserService');

// describe('run', () => {
//   beforeEach(() => {
//     // Limpa mocks antes de cada teste
//     jest.clearAllMocks();
//   });

//   test('deve executar o fluxo completo: service -> repository sem erros', async () => {
//     // Configura mock do service para sucesso
//     const mockService = {
//       getUserNames: jest.fn().mockResolvedValue(['John', 'Jane']),
//     };
//     MockedUserService.default = jest.fn(() => mockService);

//     // Executa a função run sob teste
//     await run();

//     // Verifica se service foi instanciado e método chamado
//     expect(MockedUserService.default).toHaveBeenCalled();
//     expect(mockService.getUserNames).toHaveBeenCalledTimes(1);
//   });
// });
