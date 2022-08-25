import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { DateUtils } from 'src/utils/DateUtils';
import { UserErrors } from './users.errors';
import { UsersService } from './users.service';

const userEmailExists: Partial<User> = {
  email: 'email@exists.com',
};

const userCPFExists: Partial<User> = {
  cpf: '00000000000',
};

const prismaUserService = {
  create: jest.fn(),
  findFirst: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: prismaUserService,
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('throwErrorIfEmailExists', () => {
    it('Se um usuario não for encontrado por email, então retorne um erro', async () => {
      prismaUserService.findFirst.mockReturnValue(userEmailExists);

      await expect(
        service.throwErrorIfEmailExists(userEmailExists.email),
      ).rejects.toThrowError(new BadRequestException(UserErrors.EMAIL_EXISTS));
    });
  });

  describe('throwErrorIfCPFExists', () => {
    it('Se um usuario não for encontrado por CPF, então retorne um erro', async () => {
      prismaUserService.findFirst.mockReturnValue(userCPFExists.cpf);

      await expect(
        service.throwErrorIfCPFExists(userEmailExists.cpf),
      ).rejects.toThrowError(new BadRequestException(UserErrors.CPF_EXISTS));
    });
  });

  describe('create', () => {
    it('Deve ser criado um usuario', async () => {
      // Define mocks
      service.throwErrorIfEmailExists = jest.fn();
      service.throwErrorIfCPFExists = jest.fn();
      DateUtils.addYears = jest.fn();

      prismaUserService.create.mockImplementation((params) => {
        const { data } = params;
        return data;
      });

      const name = 'Manoel Gomes';
      const cpf = '00000000000';
      const email = 'manoel.gomes@fleye.com.br';

      const results = await service.create({
        name,
        cpf,
        email,
      });

      expect(results).toBeDefined();
      expect(results).toMatchObject({
        name,
        cpf,
        email,
      });
    });

    it('Quando criado um novo cadastro, ele é valido até um ano', async () => {
      // Define mocks
      prismaUserService.create.mockImplementation((params) => {
        const { data } = params;
        return data;
      });
      service.throwErrorIfEmailExists = jest.fn();
      service.throwErrorIfCPFExists = jest.fn();

      const name = 'Manoel Gomes';
      const cpf = '00000000000';
      const email = 'manoel.gomes@fleye.com.br';
      const createdAt = new Date(2022, 0, 1, 0, 0, 0);
      const expiredAt = new Date(2023, 0, 1, 0, 0, 0);

      const mockDate = jest.spyOn(Date, 'now');
      mockDate.mockImplementation(() => createdAt.getTime());
      DateUtils.addYears = jest.fn().mockReturnValue(expiredAt);

      const results = await service.create({
        name,
        cpf,
        email,
      });

      expect(results).toBeDefined();
      expect(DateUtils.addYears).toBeCalledWith(createdAt, 1);
    });
  });
});
