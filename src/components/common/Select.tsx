import { Select, SelectProps } from 'antd';

interface KrollSelectProps {
  mode: SelectProps['mode'];
  placeholder: string;
  defaultValue?: SelectProps['defaultValue'];
  onChange: SelectProps['onChange'];
  options: SelectProps['options'];
  value: SelectProps['value'];
  plceHolderStyle?: SelectProps['style'];
  style?: SelectProps['style'];
  disabled?: boolean;
}

export const KrollSelect: React.FC<KrollSelectProps> = ({
  mode,
  placeholder,
  defaultValue,
  onChange,
  options,
  value,
  disabled,
  plceHolderStyle = { marginTop: '16px' },
  style = { width: '100%' },
}) => {
  return (
    <>
      <div style={plceHolderStyle}>{placeholder}</div>
      <Select
        mode={mode}
        allowClear
        style={style}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        value={value}
        disabled={disabled}
      />
    </>
  );
};
