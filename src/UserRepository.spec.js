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
