import { jest } from '@jest/globals';

const mockUsers = [{ id: 1, name: 'John', username: 'john', email: 'john@test.com' }];
const mockFormattedUsers = [{ id: 1, name: 'John', email: 'john@test.com' }];
const mockUser = { id: 1, name: 'John', email: 'john@test.com' };

const part1Error = new Error('Erro no repositório');
const part2Error = new Error('Erro no serviço');
const part3Error = new Error('Erro no getUsersById');
const criticalErrorMsg = 'Falha no construtor';

describe('run.js', () => {
  let consoleLogSpy, consoleTableSpy, consoleErrorSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleTableSpy = jest.spyOn(console, 'table').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('executa o fluxo completo com sucesso (todas as partes)', async () => {
    await jest.isolateModules(async () => {
      jest.doMock('./UserRepository.js', () => ({
        UserRepository: jest.fn().mockImplementation(() => ({
          getUsers: jest.fn().mockResolvedValue(mockUsers)
        }))
      }));
      jest.doMock('./UserService.js', () => ({
        UserService: jest.fn().mockImplementation(() => ({
          getUsers: jest.fn().mockResolvedValue(mockFormattedUsers),
          getUsersById: jest.fn().mockResolvedValue(mockUser)
        }))
      }));
      await import('./run.js');
    });

    expect(consoleLogSpy).toHaveBeenCalledWith('=== PART 1: UserRepository (RAW DATA) ===');
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('Lança erro na Parte 1 (getUsers do repositório falha)', async () => {
    await jest.isolateModules(async () => {
      jest.doMock('./UserRepository.js', () => ({
        UserRepository: jest.fn().mockImplementation(() => ({
          getUsers: jest.fn().mockRejectedValue(part1Error)
        }))
      }));
      jest.doMock('./UserService.js', () => ({
        UserService: jest.fn().mockImplementation(() => ({
          getUsers: jest.fn().mockResolvedValue(mockFormattedUsers),
          getUsersById: jest.fn().mockResolvedValue(mockUser)
        }))
      }));
      await import('./run.js');
    });
  });

  it('Lança erro na Parte 2 (getUsers do serviço falha)', async () => {
    await jest.isolateModules(async () => {
      jest.doMock('./UserRepository.js', () => ({
        UserRepository: jest.fn().mockImplementation(() => ({
          getUsers: jest.fn().mockResolvedValue(mockUsers)
        }))
      }));
      jest.doMock('./UserService.js', () => ({
        UserService: jest.fn().mockImplementation(() => ({
          getUsers: jest.fn().mockRejectedValue(part2Error),
          getUsersById: jest.fn().mockResolvedValue(mockUser)
        }))
      }));
      await import('./run.js');
    });

  });

  it('Lança erro na Parte 3 (getUsersById rejeita)', async () => {
    await jest.isolateModules(async () => {
      jest.doMock('./UserRepository.js', () => ({
        UserRepository: jest.fn().mockImplementation(() => ({
          getUsers: jest.fn().mockResolvedValue(mockUsers)
        }))
      }));
      jest.doMock('./UserService.js', () => ({
        UserService: jest.fn().mockImplementation(() => ({
          getUsers: jest.fn().mockResolvedValue(mockFormattedUsers),
          getUsersById: jest.fn().mockRejectedValue(part3Error)
        }))
      }));
      await import('./run.js');
    });

  });

  it('Parte 3: usuário não encontrado (getUsersById retorna null)', async () => {
    await jest.isolateModules(async () => {
      jest.doMock('./UserRepository.js', () => ({
        UserRepository: jest.fn().mockImplementation(() => ({
          getUsers: jest.fn().mockResolvedValue(mockUsers)
        }))
      }));
      jest.doMock('./UserService.js', () => ({
        UserService: jest.fn().mockImplementation(() => ({
          getUsers: jest.fn().mockResolvedValue(mockFormattedUsers),
          getUsersById: jest.fn().mockResolvedValue(null)
        }))
      }));
      await import('./run.js');
    });

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('Todas as 3 partes falham', async () => {
    await jest.isolateModules(async () => {
      jest.doMock('./UserRepository.js', () => ({
        UserRepository: jest.fn().mockImplementation(() => ({
          getUsers: jest.fn().mockRejectedValue(part1Error)
        }))
      }));
      jest.doMock('./UserService.js', () => ({
        UserService: jest.fn().mockImplementation(() => ({
          getUsers: jest.fn().mockRejectedValue(part2Error),
          getUsersById: jest.fn().mockRejectedValue(part3Error)
        }))
      }));
      await import('./run.js');
    });
  });

  it('Falha crítica (construtor do UserRepository lança erro)', async () => {
    await jest.isolateModules(async () => {
      jest.doMock('./UserRepository.js', () => ({
        UserRepository: jest.fn().mockImplementation(() => {
          throw new Error(criticalErrorMsg);
        })
      }));
      jest.doMock('./UserService.js', () => ({
        UserService: jest.fn()
      }));
      await import('./run.js');
    });

    expect(consoleLogSpy).not.toHaveBeenCalled();
  });
});
