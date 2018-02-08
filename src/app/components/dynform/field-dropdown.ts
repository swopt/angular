import { FieldItem } from './field-item';

export class DropdownItem extends FieldItem<string> {
  type = 'reference_value';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}