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

  update(contact: Contact): Result<void> | Result<Error> {
    try {
      this.database.updateContact(contact);
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<Error>(new DatabaseException(error.message));
    }
  }

  getById(id: string): Result<Contact> | Result<Error> {
    try {
      const contact = this.database.getContactById(id);
      return Result.ok<Contact>(contact);
    } catch (error) {
      return Result.fail<Error>(new DatabaseException(error.message));
    }
  }

  delete(id: string): Result<void> | Result<Error> {
    try {
      this.database.deleteContactById(id);
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<Error>(new DatabaseException(error.message));
    }
  }
}
