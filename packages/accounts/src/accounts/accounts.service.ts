import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const { email } = createAccountDto;

    const account = await this.accountsRepository.findOne({
      where: {
        email,
      },
    });

    if (account) throw new BadRequestException('Conta já cadastrada!');

    const entity = this.accountsRepository.create(createAccountDto);

    return this.accountsRepository.save(entity);
  }

  findAll() {
    return this.accountsRepository.find();
  }
}
