import { Body, Controller, Get, Post } from '@nestjs/common';
import CreateContactUseCase, {
  CreateContactUseCaseInput,
} from '../usecases/CreateContactUseCase';

@Controller('contacts')
export class ContactsController {
  constructor(private createContactUseCase: CreateContactUseCase) {}

  @Post('/')
  createContact(@Body() input: CreateContactUseCaseInput) {
    const responseOrError = this.createContactUseCase.execute(input);
    if (responseOrError.isFailure) throw responseOrError.getError();
    return responseOrError.getValue();
  }
}
