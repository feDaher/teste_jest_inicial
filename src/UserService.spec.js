import { UserService } from './UserService.js';
import { UserRepository } from './UserRepository.js';

describe('UserService', () => {
  let userService;
  let mockUserRepository;

  beforeEach(() => {
    mockUserRepository = Object.create(UserRepository.prototype);
    mockUserRepository.findById = jest.fn();

    userService = new UserService(mockUserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch user by ID', async () => {
    const mockUser = {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
        lat: "-37.3159",
        lng: "81.1496"
        }
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets"
        }
    };

    mockUserRepository.findById.mockResolvedValue(mockUser);

    const user = await userService.getUsersById(1);

    expect(user).toEqual(mockUser);
    // expect(mockUserRepository.findById).toHaveBeenCalledWith(1);
  });

  it('verifies mock passes instanceof UserRepository', () => {
    expect(mockUserRepository instanceof UserRepository).toBe(true);
  });
});
