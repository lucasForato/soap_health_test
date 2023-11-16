import { Module } from '@nestjs/common';
import { ContactsController } from './controllers/contacts.controller';
import CreateContactUseCase from './usecases/CreateContactUseCase';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ContactsRepository } from './repositories/contacts.repository';
import ListContactsUseCase from './usecases/ListContactsUseCase';
import UpdateContactCompletelyUseCase from './usecases/UpdateContactCompletelyUseCase';
import UpdateContactPartiallyUseCase from './usecases/UpdateContactPartiallyUseCase';

@Module({
  imports: [InfrastructureModule],
  controllers: [ContactsController],
  providers: [
    CreateContactUseCase,
    ContactsRepository,
    ListContactsUseCase,
    UpdateContactCompletelyUseCase,
    UpdateContactPartiallyUseCase,
  ],
})
export class CoreModule {}
