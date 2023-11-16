import { Module } from '@nestjs/common';
import { ContactsController } from './controllers/contacts.controller';
import CreateContactUseCase from './usecases/CreateContactUseCase';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ContactsRepository } from './repositories/contacts.repository';

@Module({
  imports: [InfrastructureModule],
  controllers: [ContactsController],
  providers: [CreateContactUseCase, ContactsRepository],
})
export class CoreModule {}
