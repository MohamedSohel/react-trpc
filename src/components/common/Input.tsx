import { Input, InputProps } from 'antd';

interface KrollInputProps {
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  type?: InputProps['type'];
}

export const KrollInput: React.FC<KrollInputProps> = ({
  placeholder,
  onChange,
  name,
  value,
  disabled,
  type = 'text',
}) => {
  return (
    <>
      <div style={{ marginTop: '16px' }}>{placeholder}</div>
      <Input placeholder={placeholder} onChange={onChange} name={name} value={value} disabled={disabled} type={type} />
    </>
  );
};
