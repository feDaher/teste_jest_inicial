import { UserRepository } from './UserRepository';

beforeAll(() => {
  global.fetch = jest.fn();
});

beforeEach(() => {
  fetch.mockClear();
});

afterAll(() => {
  delete global.fetch;
});

describe('UserRepository', () => {
  describe('getUsers', () => {
    it('deve retornar a lista de usuários quando a requisição é bem-sucedida', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
      ];
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockUsers)
      };
      fetch.mockResolvedValue(mockResponse);

      const repository = new UserRepository();
      const users = await repository.getUsers();

      expect(users).toEqual(mockUsers);
      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('deve lançar erro quando a resposta HTTP não é bem-sucedida', async () => {
      const mockResponse = {
        ok: false,
        status: 404
      };
      fetch.mockResolvedValue(mockResponse);

      const repository = new UserRepository();
      await expect(repository.getUsers()).rejects.toThrow('Erro HTTP! Status: 404');
    });

    it('deve lançar erro quando há falha de rede', async () => {
      const errorMessage = 'falha de rede';
      fetch.mockRejectedValue(new Error(errorMessage));

      const repository = new UserRepository();
      await expect(repository.getUsers()).rejects.toThrow(`Erro ao buscar usuários: ${errorMessage}`);
    });
  });

  describe('getUserById', () => {
    it('deve retornar o usuário pelo ID quando a requisição é bem-sucedida', async () => {
      const userId = 1;
      const mockUser = { id: userId, name: 'John Doe' };
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockUser)
      };
      fetch.mockResolvedValue(mockResponse);

      const repository = new UserRepository();
      const user = await repository.getUserById(userId);

      expect(user).toEqual(mockUser);
      expect(fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/users/${userId}`);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('deve lançar erro quando a resposta HTTP não é bem-sucedida', async () => {
      const userId = 999;
      const mockResponse = {
        ok: false,
        status: 404
      };
      fetch.mockResolvedValue(mockResponse);

      const repository = new UserRepository();
      await expect(repository.getUserById(userId)).rejects.toThrow('Erro HTTP! Status: 404');
    });

    it('deve lançar erro quando há falha de rede', async () => {
      const userId = 1;
      const errorMessage = 'falha de rede';
      fetch.mockRejectedValue(new Error(errorMessage));

      const repository = new UserRepository();
      await expect(repository.getUserById(userId)).rejects.toThrow(`Erro ao buscar usuários: ${errorMessage}`);
    });
  });
});
