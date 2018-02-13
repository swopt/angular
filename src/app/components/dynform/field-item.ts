export class FieldItem<T>{
    value: T;
    key: string;
    label: string;
    required: boolean;
    type: string;
    error: string;
    reference_values: {key: string, value: string}[] = [];
    selectedRef: any;
  
    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        type?: string
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.type = options.type || '';
    }
  }