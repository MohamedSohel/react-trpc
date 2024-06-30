import { DatePicker, DatePickerProps } from 'antd';

interface KrollDatePickerProps {
  placeholder: string;
  name: string;
  onChange: DatePickerProps['onChange'];
  value?: DatePickerProps['value'];
  disabled?: boolean;
}

export const KrollDatePicker: React.FC<KrollDatePickerProps> = ({ placeholder, onChange, name, value, disabled }) => {
  return (
    <>
      <div style={{ marginTop: '16px' }}>{placeholder}</div>
      <DatePicker placeholder={placeholder} onChange={onChange} name={name} disabled={disabled} value={value} />
    </>
  );
};
