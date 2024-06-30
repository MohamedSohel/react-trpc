import { PlusCircleOutlined } from '@ant-design/icons';
import { KrollButton } from './Button';
import { theme } from 'antd';

interface HeaderProps {
  heading: string;
  btntext: string;
  hasPermission?: boolean;
  onClick: (e?: unknown) => void;
}

export const Header: React.FC<HeaderProps> = ({ heading, btntext, onClick, hasPermission }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h1 style={{ margin: 0, color: colorPrimary }}>{heading}</h1>

      <KrollButton
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={onClick}
        btnText={btntext}
        isVisible={hasPermission}
      />
    </div>
  );
};
