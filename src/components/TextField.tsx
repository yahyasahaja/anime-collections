/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

type Props = React.PropsWithChildren<{
  id: string,
  value: string,
  label: string
  name?: string,
  placeholder: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}>;

const collectionNameRegex = /[^0-9A-z\s]+/ig;

const TextField = ({ id, value, label, placeholder, name = '', onChange }: Props) => {
  const validateOnChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = e?.target?.value || '';
    const isInvalid = newValue.match(collectionNameRegex);
    if (!isInvalid) onChange(e);
  }, [onChange]);

  return (
    <div css={css`margin: 10px 0;`}>
      <label htmlFor={id} css={css`color: var(--color-primary)`}>
        { label }
        <input
          css={css`
            padding: 10px;
            display: block;
            width: 100%;
            border: none;
            background: #e7e7e7;
            margin-top: 10px;
            border-radius: 10px;
          `}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={validateOnChange}
        />
      </label>
    </div>
  )
};

export default TextField;
