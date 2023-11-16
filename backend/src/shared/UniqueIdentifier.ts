import crypto from 'crypto';

type UniqueIdentifierProps = Readonly<string>;

const createUniqueIdentifier = (id?: string): UniqueIdentifierProps => {
  return id ? Object.freeze(id) : Object.freeze(crypto.randomUUID());
};

export { createUniqueIdentifier };
