import React from 'react';
import './Input.scss'

type Props = {
    placeholder: string;
    name: string;
    type: string;
    register: Function;
    requiredMessage?: string;
    validationPattern?: RegExp | { value: RegExp; message: string; } | undefined;
  }

const Input: React.FC<Props> = (props) => {
    const { placeholder, requiredMessage, register, validationPattern, name, type } = props;

    return (
        <input
            placeholder={placeholder}
            name={name}
            type={type}
            className="z-depth-1 browser-default full-width"
            ref={register({
                required: requiredMessage,
                pattern: validationPattern,
            })}
        />
    );
}

export default Input;