import { Injectable } from '@nestjs/common';
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

  create(createAccountDto: CreateAccountDto) {
    const entity = this.accountsRepository.create(createAccountDto);

    return this.accountsRepository.save(entity);
  }

  findAll() {
    return this.accountsRepository.find();
  }
}
