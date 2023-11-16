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
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<Error>(new DatabaseException(error.message));
    }
  }

  list(name?: string, phoneNumber?: string): Result<Contact[]> | Result<Error> {
    try {
      const contacts = this.database.listContacts({
        nameContains: name,
        phoneNumberContains: phoneNumber,
      });
      return Result.ok<Contact[]>(contacts);
    } catch (error) {
      return Result.fail<Error>(new DatabaseException(error.message));
    }
  }
}
