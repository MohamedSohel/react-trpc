import { Button, ButtonProps } from 'antd';

interface BUTTON extends ButtonProps {
  isVisible?: boolean;
  btnText: string;
}
export const KrollButton: React.FC<BUTTON> = ({ type, style, icon, onClick, btnText, isVisible }) => {
  return isVisible ? (
    <Button type={type} style={style} icon={icon} onClick={onClick}>
      {btnText}
    </Button>
  ) : null;
};
