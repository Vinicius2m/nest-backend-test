import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => CartService))
    private readonly cartService: CartService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    try {
      const userByEmail = await this.usersRepository.findOneBy({
        email: createUserDto.email,
      });

      const userByCpf = await this.usersRepository.findOneBy({
        cpf: createUserDto.cpf,
      });

      if (userByEmail || userByCpf) {
        throw new HttpException(
          { message: 'User already exists' },
          HttpStatus.CONFLICT,
        );
      }

      const cart = await this.cartService.create();

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const createdUser = this.usersRepository.create({
        ...createUserDto,
        cart: cart,
        password: hashedPassword,
      });

      const finalUser = await this.usersRepository.save(createdUser);

      return { ...finalUser, password: undefined };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Partial<User>[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => ({ ...user, password: undefined }));
  }

  async findOne(id: string): Promise<Partial<User>> {
    try {
      const user = await this.usersRepository.findOneBy({ user_id: id });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return { ...user, password: undefined };
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

      return { ...updatedUser, password: undefined };
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
