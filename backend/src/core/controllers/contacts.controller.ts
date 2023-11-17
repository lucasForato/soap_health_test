import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import CreateContactUseCase, {
  CreateContactUseCaseInput,
} from '../usecases/CreateContactUseCase';
import ListContactsUseCase, {
  ListContactsUseCaseInput,
} from '../usecases/ListContactsUseCase';
import UpdateContactCompletelyUseCase, {
  UpdateContactCompletelyUseCaseInput,
} from '../usecases/UpdateContactCompletelyUseCase';
import UpdateContactPartiallyUseCase, {
  UpdateContactPartiallyUseCaseInput,
} from '../usecases/UpdateContactPartiallyUseCase';
import DeleteContactUseCase, {
  DeleteContactUseCaseInput,
} from '../usecases/DeleteContactUseCase';

@Controller('v1/contacts')
export class ContactsController {
  constructor(
    private createContactUseCase: CreateContactUseCase,
    private listContactsUseCase: ListContactsUseCase,
    private updateContactCompletelyUseCase: UpdateContactCompletelyUseCase,
    private updateContactPartiallyUseCase: UpdateContactPartiallyUseCase,
    private deleteContactUseCase: DeleteContactUseCase,
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

  @Put('/:id')
  updateCompletely(
    @Param('id') id: string,
    @Body() input: UpdateContactCompletelyUseCaseInput,
  ) {
    const responseOrError = this.updateContactCompletelyUseCase.execute({
      ...input,
      id,
    });
    if (responseOrError.isFailure) throw responseOrError.getError();
    return responseOrError.getValue();
  }

  @Patch('/:id')
  updatePartially(
    @Param('id') id: string,
    @Body() input: UpdateContactPartiallyUseCaseInput,
  ) {
    const responseOrError = this.updateContactPartiallyUseCase.execute({
      ...input,
      id,
    });
    if (responseOrError.isFailure) throw responseOrError.getError();
    return responseOrError.getValue();
  }

  @Delete('/:id')
  deleteContact(@Param() params: DeleteContactUseCaseInput) {
    const responseOrError = this.deleteContactUseCase.execute(params);
    if (responseOrError.isFailure) throw responseOrError.getError();
    return responseOrError.getValue();
  }
}
