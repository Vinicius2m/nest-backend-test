import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    try {
      const user = await this.usersRepository.findOneBy({
        email: createUserDto.email,
      });

      if (user) {
        throw new HttpException(
          { message: 'User already exists' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const createdUser = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      const { password, ...createdUserInfo } = await this.usersRepository.save(
        createdUser,
      );

      return createdUserInfo;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Partial<User>[]> {
    const users = await this.usersRepository.find();
    return users.map(
      ({ password, ...userWhitoutPassword }) => userWhitoutPassword,
    );
  }

  async findOne(id: string): Promise<Partial<User>> {
    try {
      const user = await this.usersRepository.findOneBy({ user_id: id });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.usersRepository.update({ user_id: id }, updateUserDto);
      const updatedUser = await this.usersRepository.findOneBy({ user_id: id });

      if (!updatedUser) {
        throw new HttpException(
          { messge: 'User not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      const { password, ...updatedUserWithoutPassword } = updatedUser;

      return updatedUserWithoutPassword;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const user = await this.usersRepository.findOneBy({ user_id: id });

      if (!user) {
        throw new HttpException(
          { message: 'User not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.usersRepository.delete({ user_id: id });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ email });

      if (!user) {
        throw new HttpException(
          { message: 'User not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
