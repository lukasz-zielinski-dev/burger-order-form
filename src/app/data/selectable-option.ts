export class SelectableOption {
  key: string;
  description: string;

  private constructor(key: string, description: string) {
    this.key = key;
    this.description = description;
  }

  public static of(key: string, description: string): SelectableOption {
    return new SelectableOption(key, description);
  }
}
