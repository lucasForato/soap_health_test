import { Entity } from 'src/shared/Entity';
import { Result } from 'src/shared/Result';
import { createUniqueIdentifier } from 'src/shared/UniqueIdentifier';

interface ContactProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
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
    const uuid = id ? id : createUniqueIdentifier();
    return Result.ok(new Contact(props, uuid));
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  toDto(): ContactDto {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
    };
  }
}

export default Contact;
