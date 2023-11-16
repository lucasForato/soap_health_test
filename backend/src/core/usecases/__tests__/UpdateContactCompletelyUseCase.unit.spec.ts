import { Test, TestingModule } from '@nestjs/testing';
import UpdateContactCompletelyUseCase from '../UpdateContactCompletelyUseCase';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ContactsRepository } from 'src/core/repositories/contacts.repository';
import { faker } from '@faker-js/faker';
import Database from 'src/infrastructure/database';
import Exception from 'src/shared/errors';
import Contact from 'src/core/entities/Contact';
import { PhoneNumber } from 'src/shared/PhoneNumber';
import { createUniqueIdentifier } from 'src/shared/UniqueIdentifier';

describe('UpdateContactCompletelyUseCase', () => {
  let usecase: UpdateContactCompletelyUseCase;
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
      providers: [UpdateContactCompletelyUseCase, ContactsRepository],
    }).compile();

    usecase = app.get<UpdateContactCompletelyUseCase>(
      UpdateContactCompletelyUseCase,
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
      lastName: faker.lorem.word(),
      phoneNumber: '1234567899',
      id,
    };

    const result = usecase.execute(newContact);

    const contact = database.getContactById(id);

    expect(result.isSuccess).toBe(true);
    expect(contact.firstName).toBe(newContact.firstName);
    expect(contact.lastName).toBe(newContact.lastName);
    expect(contact.phoneNumber.toString()).toBe(newContact.phoneNumber);
  });

  it('should fail if any prop is missing', () => {
    const newContact = {
      firstName: faker.lorem.word(),
      lastName: faker.lorem.word(),
      id,
    };

    const result = usecase.execute(newContact as any);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBeInstanceOf(Exception);
  });
});
