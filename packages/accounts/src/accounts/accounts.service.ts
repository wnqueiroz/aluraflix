import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { SignInAccountDto } from './dto/signin-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const { email } = createAccountDto;

    const account = await this.getAccountByEmail(email);

    if (account) throw new BadRequestException('Conta já cadastrada!');

    const entity = this.accountsRepository.create(createAccountDto);

    return this.accountsRepository.save(entity);
  }

  async signin(signInAccountDto: SignInAccountDto) {
    const { email, password } = signInAccountDto;

    const account = await this.getAccountByEmail(email);

    if (!account) throw new BadRequestException('Conta não existe!');

    if (account.password !== password)
      throw new BadRequestException(
        'Dados inválidos! Verifique e tente novamente',
      );

    delete account.password;

    return account;
  }

  async getAccountByEmail(email: string) {
    const account = await this.accountsRepository.findOne({
      where: {
        email,
      },
    });

    return account;
  }
}
