import { Injectable } from '@nestjs/common';
import { IsString } from 'class-validator';
import { PhoneNumber } from 'src/shared/PhoneNumber';
import { Result } from 'src/shared/Result';
import { UseCase } from 'src/shared/UseCase';
import Contact from '../entities/Contact';
import { ContactsRepository } from '../repositories/contacts.repository';

export class DeleteContactUseCaseInput {
  @IsString()
  id: string;
}

export type DeleteContactUseCaseOutput = void;

@Injectable()
export default class DeleteContactUseCase
  implements UseCase<DeleteContactUseCaseInput, DeleteContactUseCaseOutput>
{
  constructor(private repository: ContactsRepository) {}

  execute(
    input: DeleteContactUseCaseInput,
  ): Result<Error> | Result<DeleteContactUseCaseOutput> {
    const deletedOrFail = this.repository.delete(input.id);
    if (deletedOrFail.isFailure) return deletedOrFail as Result<Error>;
    return Result.ok<void>();
  }
}
