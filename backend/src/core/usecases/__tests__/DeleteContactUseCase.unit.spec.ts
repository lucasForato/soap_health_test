import { Test, TestingModule } from '@nestjs/testing';
import DeleteContactUseCase from '../DeleteContactUseCase';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ContactsRepository } from 'src/core/repositories/contacts.repository';
import { faker } from '@faker-js/faker';
import Database from 'src/infrastructure/database';
import Exception from 'src/shared/errors';
import Contact from 'src/core/entities/Contact';
import { PhoneNumber } from 'src/shared/PhoneNumber';
import { createUniqueIdentifier } from 'src/shared/UniqueIdentifier';

describe('DeleteContactUseCase', () => {
  let usecase: DeleteContactUseCase;
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
      providers: [DeleteContactUseCase, ContactsRepository],
    }).compile();

    usecase = app.get<DeleteContactUseCase>(DeleteContactUseCase);
    database = app.get<Database>(Database);
  });

  beforeEach(() => {
    database.createContact(contact);
  });

  afterEach(() => {
    database.clean();
  });

  it('should delete a contact', () => {
    const result = usecase.execute({ id });

    const isFound = database.getContactById(id);

    expect(result.isSuccess).toBe(true);
    expect(isFound).toBeUndefined();
  });
});
