import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import CreateContactUseCase, {
  CreateContactUseCaseInput,
} from '../usecases/CreateContactUseCase';
import ListContactsUseCase, {
  ListContactsUseCaseInput,
} from '../usecases/ListContactsUseCase';

@Controller('contacts')
export class ContactsController {
  constructor(
    private createContactUseCase: CreateContactUseCase,
    private listContactsUseCase: ListContactsUseCase,
  ) {}

  @Post('/')
  createContact(@Body() input: CreateContactUseCaseInput) {
    const responseOrError = this.createContactUseCase.execute(input);
    if (responseOrError.isFailure) throw responseOrError.getError();
    return responseOrError.getValue();
  }

  @Get('/')
  listContacts(@Query() params: ListContactsUseCaseInput) {
    const responseOrError = this.listContactsUseCase.execute(params);
    if (responseOrError.isFailure) throw responseOrError.getError();
    return responseOrError.getValue();
  }
}
