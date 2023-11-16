import { Test, TestingModule } from '@nestjs/testing';
import UpdateContactPartiallyUseCase from '../UpdateContactPartiallyUseCase';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ContactsRepository } from 'src/core/repositories/contacts.repository';
import { faker } from '@faker-js/faker';
import Database from 'src/infrastructure/database';
import Exception from 'src/shared/errors';
import Contact from 'src/core/entities/Contact';
import { PhoneNumber } from 'src/shared/PhoneNumber';
import { createUniqueIdentifier } from 'src/shared/UniqueIdentifier';

describe('UpdateContactPartiallyUseCase', () => {
  let usecase: UpdateContactPartiallyUseCase;
  let database: Database;
  const id = createUniqueIdentifier();
  let contact = Contact.create(
    {
      firstName: faker.lorem.word(),
      lastName: faker.lorem.word(),
      phoneNumber: PhoneNumber.create('1234567890').getValue() as PhoneNumber,
    },
    id,
  ).getValue() as Contact;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [UpdateContactPartiallyUseCase, ContactsRepository],
    }).compile();

    usecase = app.get<UpdateContactPartiallyUseCase>(
      UpdateContactPartiallyUseCase,
    );
    database = app.get<Database>(Database);
  });

  beforeEach(() => {
    database.createContact(contact);
  });

  afterEach(() => {
    database.clean();
  });

  it('should update a contact', () => {
    const newContact = {
      firstName: faker.lorem.word(),
      lastName: undefined,
      phoneNumber: undefined,
      id,
    };

    const result = usecase.execute(newContact);

    const updatedContact = database.getContactById(id);

    expect(result.isSuccess).toBe(true);
    expect(updatedContact.firstName).toBe(newContact.firstName);
    expect(updatedContact.lastName).toBe(contact.lastName);
    expect(updatedContact.phoneNumber.toString()).toBe(
      contact.phoneNumber.toString(),
    );
  });
});
