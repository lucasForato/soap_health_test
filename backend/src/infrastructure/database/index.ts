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

  createContact(contact: Contact): void {
    this.contacts.push(contact);
  }

  deleteContactById(id: string): void {
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
  }
}

export default Database;
