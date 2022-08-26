import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

const userEmailIsExists = {
  email: 'emailexiste@email.com',
};

const mockPrismaService = {
  user: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deve ser retornado um usuario criado', async () => {
    mockPrismaService.user.findFirst.mockReturnValue(null);
    mockPrismaService.user.create.mockImplementation((data) => {
      return data.data;
    });

    const userDto: CreateUserDto = {
      cpf: '00000000',
      name: 'Manoel Gomes',
      email: 'manoel.gomes@fleye.com.br',
    };
    const userCrated = await service.create(userDto);

    expect(userCrated).toBeDefined();
    expect(userCrated.email).toBe(userDto.email);
  });

  it('Deve retornar um erro se o email ja existir', async () => {
    mockPrismaService.user.findFirst.mockReturnValue(userEmailIsExists);

    const userDto: CreateUserDto = {
      cpf: '00000000',
      name: 'Manoel Gomes',
      email: 'manoel.gomes@fleye.com.br',
    };

    await expect(service.create(userDto)).rejects.toThrowError(
      new BadRequestException('Email não encontrado'),
    );
    expect(mockPrismaService.user.create).not.toBeCalled();
  });
});
