import { Entity } from 'src/shared/Entity';
import { createUniqueIdentifier } from 'src/shared/UniqueIdentifier';

interface ContactProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface ContactDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

class Contact extends Entity<ContactProps> {
  create(props: ContactProps, id: string): Contact {
    const uuid = id ? id : createUniqueIdentifier();
    return new Contact(props, uuid);
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  toDto(): ContactDto {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.props.phoneNumber,
    };
  }
}

export default Contact;
