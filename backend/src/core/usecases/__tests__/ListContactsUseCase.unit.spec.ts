import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactsRepository } from 'src/core/repositories/contacts.repository';
import Database from 'src/infrastructure/database';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { PhoneNumber } from 'src/shared/PhoneNumber';
import ListContactsUseCase from '../ListContactsUseCase';
import Contact, { ContactDto } from 'src/core/entities/Contact';

describe('ListContactsUseCase', () => {
  let usecase: ListContactsUseCase;
  let database: Database;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [ListContactsUseCase, ContactsRepository],
    }).compile();

    usecase = app.get<ListContactsUseCase>(ListContactsUseCase);
    database = app.get<Database>(Database);
  });

  beforeEach(() => {
    database.clean();
    const phone1 = PhoneNumber.create('123456789').getValue() as PhoneNumber;
    const phone2 = PhoneNumber.create('134567809').getValue() as PhoneNumber;

    const contact1 = Contact.create({
      firstName: 'lucas',
      lastName: 'forato',
      phoneNumber: phone1,
    }).getValue() as Contact;

    const contact2 = Contact.create({
      firstName: 'erick',
      lastName: 'gomes',
      phoneNumber: phone2,
    }).getValue() as Contact;

    const contact3 = Contact.create({
      firstName: 'mark',
      lastName: 'robson',
      phoneNumber: phone1,
    }).getValue() as Contact;

    database.createContact(contact1);
    database.createContact(contact2);
    database.createContact(contact3);
  });

  afterEach(() => {
    database.clean();
  });

  it('should list all contacts', () => {
    const result = usecase.execute({});
    const value = result.getValue() as ContactDto[];

    expect(result.isSuccess).toBe(true);
    expect(value.length).toBe(3);
  });

  it('should filter by name', () => {
    const result = usecase.execute({ name: 'lucas' });
    const value = result.getValue() as ContactDto[];

    expect(result.isSuccess).toBe(true);
    expect(value.length).toBe(1);
    expect(value[0].firstName).toBe('lucas');
  });

  it('should filter by phone number', () => {
    const result = usecase.execute({ phoneNumber: '1345' });
    const value = result.getValue() as ContactDto[];

    expect(result.isSuccess).toBe(true);
    expect(value.length).toBe(1);
    expect(value[0].firstName).toBe('erick');
  });
});
