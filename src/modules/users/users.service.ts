import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { DateUtils } from 'src/utils/DateUtils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserErrors } from './users.errors';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async throwErrorIfEmailExists(email: string) {
    const emailExists = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      throw new BadRequestException(UserErrors.EMAIL_EXISTS);
    }
  }

  async throwErrorIfCPFExists(userCpf: string) {
    const cpfExists = await this.prismaService.user.findFirst({
      where: {
        cpf: userCpf,
      },
    });

    if (cpfExists) {
      throw new BadRequestException(UserErrors.CPF_EXISTS);
    }
  }

  async create(createUserDto: CreateUserDto) {
    await this.throwErrorIfEmailExists(createUserDto.email);
    await this.throwErrorIfCPFExists(createUserDto.cpf);

    const createdAt = new Date(Date.now());
    const expiredAt = DateUtils.addYears(createdAt, 1);

    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        expiredAt,
      },
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
