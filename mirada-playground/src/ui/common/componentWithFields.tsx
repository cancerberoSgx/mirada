import * as React from 'react'
interface Ev {
  type: 'change';
  name: 'string';
  path: 'string';
}
interface P {
  /**
   * if callback returns a string it means there was a validation error. The model/state won't be changed and the error will be shown to the user appropriately.
   */
  onChange?: HandleStateChange;
  /** by default it assumes the user will call setState on it or on a parent component so more importantly assumes it will be updated. because of this */
  setState?: boolean;
  /** by default onInput will trigger the actuibn */
  changeMode?: 'onChange' | 'onInput';
  fields: Field[];
}
type fieldChangeHandler<T> = (e: {
  name: string;
  value: T;
}) => string | false | undefined
type HandleStateChange = (e: Ev) => string | false
type FieldProps<T = any> = (Field & {
  fieldChangeHandler: fieldChangeHandler<T>;
})
/**
 * helper for building ui form automatically. It's opinionated regarding the action and the format of the input model. By default it assumes we want to call setState() when a change occurs. Also it assumes the data is object-like and will represent the UI editors as fields of an object optinoally supporting nesting. For this particular implementation it will take care of calling setState() without messing arround with node siblings (so we don't have to wrait eht ugly code full of {...}, [...]).
 *
 * The useage is made by two personas, the first declqaring the data structure in a json like object and the second instantiating as a component and defining / configuring microinteracions and callbacks for changes.
 *
 * Also implements react input controlled elements
 */
export class ComponentWithFields extends React.Component<P> {
  protected isRoot = false;
  constructor(p: P) {
    super(p)
  }
  render() {
    return <ul>
      {this.props.fields.map(f => <li>
        {this.renderField(f)}
      </li>)}
    </ul>
  }
  renderField(f: Field): React.ReactNode {
    const fieldProps = { ...{ ...this.props, ...f, fieldChangeHandler: this.fieldChangeHandler } }
    if (f.type == 'string') {
      return <TextField {...fieldProps} />
    }
    else if (f.type == 'boolean') {
      return <BooleanField {...fieldProps} />
    }
    else if (f.type == 'integer') {
      return <IntegerField {...fieldProps} />
    }
  }
  fieldChangeHandler<T = any>(e: {
    name: string;
    value: T;
  }): string | false | undefined {
    throw new Error('Method not implemented.')
  }
}
const TextField = (props: FieldProps) => <label><input type="text" onChange={e => props.fieldChangeHandler({ ...props, value: e.currentTarget.value })} />{props.label}</label>
const IntegerField = (props: FieldProps) => <label><input type="number" onChange={e => props.fieldChangeHandler({ ...props, value: e.currentTarget.checked })} />{props.label}</label>
const BooleanField = (props: FieldProps<boolean>) => <label><input type="checkbox" onChange={e => props.fieldChangeHandler({ ...props, value: e.currentTarget.checked })} />{props.label}</label>
export interface Field {
  name: string;
  label?: string;
  value: string;
  type?: 'string' | 'integer' | 'float' | 'boolean';
}
