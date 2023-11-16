export abstract class Entity<Props> {
  protected props: Props;
  protected _id: string;

  constructor(props: Props, id: string) {
    this.props = props;
    this._id = id;
  }

  get id(): string {
    return this._id;
  }
}
