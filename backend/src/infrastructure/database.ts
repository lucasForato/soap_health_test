import { Injectable } from '@nestjs/common';
import Contact from 'src/core/entities/Contact';

@Injectable()
class Database {
  private contacts: Contact[] = [];

  getContacts(): Contact[] {
    return this.contacts;
  }

  getContactById(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  createContact(contact: Contact): void | Error {
    if (!contact.id) throw new Error('Contact must have an id');
    if (!contact.firstName) throw new Error('Contact must have a first name');
    if (!contact.lastName) throw new Error('Contact must have a last name');
    if (!contact.phoneNumber)
      throw new Error('Contact must have a phone number');

    const idExists = this.contacts.some((contact) => contact.id === contact.id);
    if (idExists) throw new Error('Contact already exists');

    this.contacts.push(contact);
  }

  deleteContactById(id: string): void {
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
  }
}

export default Database;
