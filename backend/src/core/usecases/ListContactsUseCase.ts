import { Result } from 'src/shared/Result';
import { UseCase } from 'src/shared/UseCase';
import { ContactsRepository } from '../repositories/contacts.repository';
import Contact, { ContactDto } from '../entities/Contact';
import { Injectable } from '@nestjs/common';
import { PhoneNumber } from 'src/shared/PhoneNumber';
import { IsOptional, IsString, Length } from 'class-validator';

export class ListContactsUseCaseInput {
  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  @Length(1, 15)
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
