import { Injectable } from '@nestjs/common';
import Database from 'src/infrastructure/database';
import { Result } from 'src/shared/Result';
import { DatabaseException } from 'src/shared/errors';
import Contact from '../entities/Contact';

@Injectable()
export class ContactsRepository {
  constructor(private database: Database) {}

  create(contact: Contact): Result<void> | Result<Error> {
    try {
      this.database.createContact(contact);
    } catch (error) {
      return Result.fail<Error>(new DatabaseException(error.message));
    }
  }
}
