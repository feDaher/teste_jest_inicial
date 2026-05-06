import { UserService } from './UserService';

// Conceito de Mock:
// Um mock é um objeto falso que simula o comportamento de um objeto real.
// Usamos mocks para isolar a unidade de teste (Service) das dependências externas (Repositório/API).
// Assim, os testes são rápidos, confiáveis e não dependem de rede.

describe('UserService', () => {
  let userService;
  let mockRepository;

  beforeEach(() => {
    // Cria um mockRepository que tem o mesmo método getUsers.
    // Isso é injeção de dependência + mock fácil.
    mockRepository = {
      getUsers: jest.fn()  // jest.fn() cria uma função mock
    };
    userService = new UserService(mockRepository);
  });

  test('deve buscar e formatar users com sucesso', async () => {
    // Arrange: configura o mock para retornar dados fake.
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
    ];
    mockRepository.getUsers.mockResolvedValue(mockUsers);  // ResolvedValue para sucesso async

    // Act: executa o método.
    const result = await userService.getUsers();

    // Assert: verifica o resultado.
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    });
    expect(mockRepository.getUsers).toHaveBeenCalledTimes(1);
  });

  test('deve tratar erro do repositório', async () => {
    // Arrange: configura mock para falhar.
    mockRepository.getUsers.mockRejectedValue(new Error('Falha na API'));

    // Act & Assert: espera que rejeite com erro.
    await expect(userService.getUsers()).rejects.toThrow('Erro no service: Erro no repositório: Falha na API');
  });
});
