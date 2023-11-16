import { Entity } from 'src/shared/Entity';
import { PhoneNumber } from 'src/shared/PhoneNumber';
import { Result } from 'src/shared/Result';
import { createUniqueIdentifier } from 'src/shared/UniqueIdentifier';
import { EntityException } from 'src/shared/errors';

interface ContactProps {
  firstName: string;
  lastName: string;
  phoneNumber: PhoneNumber;
}

interface ContactDto {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

class Contact extends Entity<ContactProps> {
  static create(
    props: ContactProps,
    id?: string,
  ): Result<Contact> | Result<Error> {
    if (!props.firstName)
      return Result.fail<Error>(
        new EntityException('A contact must have a first name'),
      );

    if (props.firstName.includes(' ')) {
      return Result.fail<Error>(
        new EntityException('First name cannot contain spaces'),
      );
    }

    if (!props.lastName)
      return Result.fail<Error>(
        new EntityException('A contact must have a last name'),
      );

    if (!props.phoneNumber)
      return Result.fail<Error>(
        new EntityException('A contact must have a phone number'),
      );

    const uuid = id ? id : createUniqueIdentifier();
    return Result.ok(new Contact(props, uuid));
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get phoneNumber(): PhoneNumber {
    return this.props.phoneNumber;
  }

  toDto(): ContactDto {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber.toString(),
    };
  }
}

export default Contact;
