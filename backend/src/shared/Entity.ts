export abstract class Entity<Props> {
  private _props: Props;
  private _id: string;

  constructor(props: Props, id: string) {
    this._props = props;
    this._id = id;
  }

  abstract create(props: Props, id?: string): unknown;

  get id(): string {
    return this.id;
  }

  get props(): Props {
    return this.props;
  }
}
