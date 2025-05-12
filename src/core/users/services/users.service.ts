import {
    BadRequestException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EncryptionsService } from 'src/common/services/encryptions/encryptions.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
    private logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly encryptionsService: EncryptionsService,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, username } = createUserDto;

        try {
            const hashedPassword = await this.encryptionsService.encrypt(password);

            const newUser = this.userRepository.create({
                email,
                username,
                password: hashedPassword,
            });

            const savedUser = await this.userRepository.save(newUser);

            return savedUser;
        } catch (error) {
            this.logger.error(`Error creating user with email ${createUserDto.email}`, error);

            throw error instanceof HttpException
                ? error
                : new InternalServerErrorException(
                    'An unexpected error occurred while creating the user',
                );
        }
    }

    async findOne(id: number): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({
                where: { id },
                select: { id: true, email: true, password: true, username: true },
            });

            if (!user) throw new NotFoundException('User not found');

            return user;
        }
        catch (error) {
            this.logger.error(`Error finding user with id ${id}`, error);

            throw error instanceof HttpException
                ? error
                : new InternalServerErrorException(
                    'An unexpected error occurred while finding the user',
                );
        }
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { email },
            select: { id: true, email: true, password: true, username: true },
        });
    }
}
