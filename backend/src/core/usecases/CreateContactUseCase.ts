import { Result } from 'src/shared/Result';
import { UseCase } from 'src/shared/UseCase';
import { ContactsRepository } from '../repositories/contacts.repository';
import Contact from '../entities/Contact';
import { Injectable } from '@nestjs/common';

export type CreateContactUseCaseInput = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export type CreateContactUseCaseOutput = void;

@Injectable()
export default class CreateContactUseCase
  implements UseCase<CreateContactUseCaseInput, CreateContactUseCaseOutput>
{
  constructor(private repository: ContactsRepository) {}

  execute(
    input: CreateContactUseCaseInput,
  ): Result<Error> | Result<CreateContactUseCaseOutput> {
    const contactOrError = Contact.create(input);
    if (contactOrError.isFailure) return contactOrError as Result<Error>;
    const contact = contactOrError.getValue() as Contact;

    const createdOrError = this.repository.create(contact);
    if (createdOrError.isFailure) return createdOrError as Result<Error>;

    return Result.ok<void>();
  }
}
