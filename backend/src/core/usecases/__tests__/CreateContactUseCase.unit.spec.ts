import { Test, TestingModule } from '@nestjs/testing';
import CreateContactUseCase from '../CreateContactUseCase';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ContactsRepository } from 'src/core/repositories/contacts.repository';
import { faker } from '@faker-js/faker';
import Database from 'src/infrastructure/database';
import Exception from 'src/shared/errors';

describe('CreateContactUseCase', () => {
  let usecase: CreateContactUseCase;
  let database: Database;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [CreateContactUseCase, ContactsRepository],
    }).compile();

    usecase = app.get<CreateContactUseCase>(CreateContactUseCase);
    database = app.get<Database>(Database);
  });

  afterEach(() => {
    database.clean();
  });

  it('should create a contact', () => {
    const contact = {
      firstName: faker.lorem.word(),
      lastName: faker.lorem.word(),
      phoneNumber: '1234567890',
    };

    const result = usecase.execute(contact);

    expect(result.isSuccess).toBe(true);
  });

  it('should fail if firstName is invalid', () => {
    const contact = {
      firstName: ' invalid',
      lastName: faker.lorem.word(),
      phoneNumber: '1234567890',
    };

    const result = usecase.execute(contact);

    expect(result.isFailure).toBe(true);
  });

  it('should fail if PhoneNumber is invalid', () => {
    const contact = {
      firstName: ' invalid',
      lastName: faker.lorem.word(),
      phoneNumber: '1234567890123123123123123123131',
    };

    const result = usecase.execute(contact);

    expect(result.isFailure).toBe(true);
  });
});
