import { Injectable } from '@nestjs/common';
import { IsString, Length } from 'class-validator';
import { PhoneNumber } from 'src/shared/PhoneNumber';
import { Result } from 'src/shared/Result';
import { UseCase } from 'src/shared/UseCase';
import { NotFoundException } from 'src/shared/errors';
import Contact from '../entities/Contact';
import { ContactsRepository } from '../repositories/contacts.repository';

export class UpdateContactCompletelyUseCaseInput {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @Length(1, 15)
  phoneNumber: string;
}

export type UpdateContactCompletelyUseCaseOutput = void;

@Injectable()
export default class UpdateContactCompletelyUseCase
  implements
    UseCase<
      UpdateContactCompletelyUseCaseInput & { id: string },
      UpdateContactCompletelyUseCaseOutput
    >
{
  constructor(private repository: ContactsRepository) {}

  execute(
    input: UpdateContactCompletelyUseCaseInput & { id: string },
  ): Result<Error> | Result<UpdateContactCompletelyUseCaseOutput> {
    const contactOrNullOrError = this.repository.getById(input.id);
    if (contactOrNullOrError.isFailure) {
      return contactOrNullOrError as Result<Error>;
    }
    if (!contactOrNullOrError.getValue()) {
      return Result.fail<Error>(new NotFoundException('Contact not found'));
    }

    const contact = contactOrNullOrError.getValue() as Contact;

    const phoneNumberOrError = PhoneNumber.create(input.phoneNumber);
    if (phoneNumberOrError.isFailure) {
      return phoneNumberOrError as Result<Error>;
    }

    contact.update({ firstName: input.firstName });
    contact.update({ lastName: input.lastName });

    const phoneNumber = phoneNumberOrError.getValue() as PhoneNumber;
    contact.update({ phoneNumber });

    const updatedOrError = this.repository.update(contact);
    if (updatedOrError.isFailure) return updatedOrError as Result<Error>;

    return Result.ok<void>();
  }
}
