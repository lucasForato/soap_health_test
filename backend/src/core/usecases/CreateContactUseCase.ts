import { Result } from 'src/shared/Result';
import { UseCase } from 'src/shared/UseCase';
import { ContactsRepository } from '../repositories/contacts.repository';
import Contact from '../entities/Contact';
import { Injectable } from '@nestjs/common';
import { PhoneNumber } from 'src/shared/PhoneNumber';
import { IsString, Length } from 'class-validator';

export class CreateContactUseCaseInput {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @Length(1, 15)
  phoneNumber: string;
}

export type CreateContactUseCaseOutput = void;

@Injectable()
export default class CreateContactUseCase
  implements UseCase<CreateContactUseCaseInput, CreateContactUseCaseOutput>
{
  constructor(private repository: ContactsRepository) {}

  execute(
    input: CreateContactUseCaseInput,
  ): Result<Error> | Result<CreateContactUseCaseOutput> {
    const phoneNumberOrError = PhoneNumber.create(input.phoneNumber);
    if (phoneNumberOrError.isFailure)
      return phoneNumberOrError as Result<Error>;
    const phoneNumber = phoneNumberOrError.getValue() as PhoneNumber;

    const contactOrError = Contact.create({
      firstName: input.firstName,
      lastName: input.lastName,
      phoneNumber,
    });
    if (contactOrError.isFailure) return contactOrError as Result<Error>;
    const contact = contactOrError.getValue() as Contact;

    const createdOrError = this.repository.create(contact);
    if (createdOrError.isFailure) return createdOrError as Result<Error>;

    return Result.ok<void>();
  }
}
