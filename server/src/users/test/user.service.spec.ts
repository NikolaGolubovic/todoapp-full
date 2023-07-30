import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';

describe('UserController', () => {
  let service: UsersService;

  const mockUserRepository = {
    create: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: Date.now(), ...dto })),
    save: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });
  it('should create new user', async () => {
    const dto: User = {
      username: 'test',
      password: 'test',
      email: 'test',
      id: 1,
      createdAt: new Date(),
      todos: [],
    };
    expect(await service.create(dto)).toEqual({
      ...dto,
    });
  });
});
