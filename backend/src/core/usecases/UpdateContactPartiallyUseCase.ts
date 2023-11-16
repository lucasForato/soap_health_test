import { Injectable } from '@nestjs/common';
import { IsOptional, IsString, Length } from 'class-validator';
import { PhoneNumber } from 'src/shared/PhoneNumber';
import { Result } from 'src/shared/Result';
import { UseCase } from 'src/shared/UseCase';
import { NotFoundException } from 'src/shared/errors';
import Contact from '../entities/Contact';
import { ContactsRepository } from '../repositories/contacts.repository';

export class UpdateContactPartiallyUseCaseInput {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;
}

export type UpdateContactPartiallyUseCaseOutput = void;

@Injectable()
export default class UpdateContactPartiallyUseCase
  implements
    UseCase<
      UpdateContactPartiallyUseCaseInput & { id: string },
      UpdateContactPartiallyUseCaseOutput
    >
{
  constructor(private repository: ContactsRepository) {}

  execute(
    input: UpdateContactPartiallyUseCaseInput & { id: string },
  ): Result<Error> | Result<UpdateContactPartiallyUseCaseOutput> {
    const contactOrNullOrError = this.repository.getById(input.id);
    if (contactOrNullOrError.isFailure) {
      return contactOrNullOrError as Result<Error>;
    }
    if (!contactOrNullOrError.getValue()) {
      return Result.fail<Error>(new NotFoundException('Contact not found'));
    }

    const contact = contactOrNullOrError.getValue() as Contact;

    if (input.firstName) contact.update({ firstName: input.firstName });

    if (input.lastName) contact.update({ lastName: input.lastName });

    if (input.phoneNumber) {
      const phoneNumberOrError = PhoneNumber.create(input.phoneNumber);
      if (phoneNumberOrError.isFailure) {
        return phoneNumberOrError as Result<Error>;
      }
      const phoneNumber = phoneNumberOrError.getValue() as PhoneNumber;
      contact.update({ phoneNumber });
    }

    const updatedOrError = this.repository.update(contact);
    if (updatedOrError.isFailure) return updatedOrError as Result<Error>;

    return Result.ok<void>();
  }
}
