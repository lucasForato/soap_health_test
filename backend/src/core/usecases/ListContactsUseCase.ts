import { Injectable } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';
import { Result } from 'src/shared/Result';
import { UseCase } from 'src/shared/UseCase';
import Contact, { ContactDto } from '../entities/Contact';
import { ContactsRepository } from '../repositories/contacts.repository';

export class ListContactsUseCaseInput {
  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;
}

export type ListContactsUseCaseOutput = ContactDto[];

@Injectable()
export default class ListContactsUseCase
  implements UseCase<ListContactsUseCaseInput, ListContactsUseCaseOutput>
{
  constructor(private repository: ContactsRepository) {}

  execute(
    input: ListContactsUseCaseInput,
  ): Result<Error> | Result<ListContactsUseCaseOutput> {
    const listOrError = this.repository.list(input.name, input.phoneNumber);
    if (listOrError.isFailure) return listOrError as Result<Error>;
    const list = listOrError.getValue() as Contact[];

    return Result.ok<ListContactsUseCaseOutput>(
      list.map((contact) => contact.toDto()),
    );
  }
}
