import { Module } from '@nestjs/common';
import { ContactsController } from './controllers/contacts.controller';
import CreateContactUseCase from './usecases/CreateContactUseCase';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ContactsRepository } from './repositories/contacts.repository';
import ListContactsUseCase from './usecases/ListContactsUseCase';

@Module({
  imports: [InfrastructureModule],
  controllers: [ContactsController],
  providers: [CreateContactUseCase, ContactsRepository, ListContactsUseCase],
})
export class CoreModule {}
