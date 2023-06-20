import React, { useState } from 'react';

export type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;
export type OnChange = (event: ChangeEvent) => void;
export type SetValue<T> = (value?: T) => OnChange;
export type Actions<T> = {
  setState: React.Dispatch<React.SetStateAction<T>>;
  onChange: OnChange;
};

export const useInput = <T = string>(
  defaultValue: T
): [T, OnChange, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(defaultValue as unknown as T);

  const onChange: OnChange = (data) => {
    const valueInput = data.target.value;

    setValue(valueInput as unknown as T);
  };

  return [value, onChange, setValue];
};
