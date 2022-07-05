import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ user_id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update({ user_id: id }, updateUserDto);
    const updatedUser = await this.usersRepository.findOneBy({ user_id: id });

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete({ user_id: id });
  }
}
