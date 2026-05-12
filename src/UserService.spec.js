import { UserService } from './UserService.js';

jest.mock('./UserRepository.js');
import { UserRepository } from './UserRepository.js';

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('constructor - aceita instância válida de UserRepository', () => {
    const mockUserRepository = new UserRepository();
    expect(() => new UserService(mockUserRepository)).not.toThrow();
  });

  it('constructor - lança erro se userRepository não for instância de UserRepository', () => {
    expect(() => new UserService({})).toThrow('userRepository deve ser uma instância de UserRepository');
  });

  it('getUsers - retorna usuários formatados sem campos extras', async () => {
    const mockUserRepository = new UserRepository();
    const rawUsers = [
      { id: 1, name: 'João', email: 'joao@email.com', senha: '123' },
      { id: 2, name: 'Maria', email: 'maria@email.com', extra: 'ignorado' }
    ];
    mockUserRepository.getUsers.mockResolvedValue(rawUsers);

    const userService = new UserService(mockUserRepository);
    const result = await userService.getUsers();

    expect(result).toEqual([
      { id: 1, name: 'João', email: 'joao@email.com' },
      { id: 2, name: 'Maria', email: 'maria@email.com' }
    ]);
    expect(mockUserRepository.getUsers).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.getUsers).toHaveBeenCalledWith();
  });

  it('getUsersById - retorna o usuário completo pelo ID', async () => {
    const mockUserRepository = new UserRepository();
    const userComplete = {
      id: 1,
      name: 'João',
      email: 'joao@email.com',
      senha: '123456',
      role: 'admin'
    };
    const id = 1;
    mockUserRepository.getUserById.mockResolvedValue(userComplete);

    const userService = new UserService(mockUserRepository);
    const result = await userService.getUsersById(id);

    expect(result).toEqual(userComplete);
    expect(mockUserRepository.getUserById).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(id);
  });
});
