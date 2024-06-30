import { Layout, Menu, theme } from 'antd';
import { useHistory } from 'react-router-dom';

import { KrollSelect } from './common/Select';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setCurrentUser, userSelector } from '../redux/slice/userSlice';
import { getMenuItem } from '../utlis/utils';
import { fetchUser } from '../interaction/user';
import { useEffect, useState } from 'react';
import Routes from '../Routes';

const { Header, Content, Sider } = Layout;

export const KrollLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { users, currentUser } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [current, setCurrent] = useState('h');

  const onClick = (e) => {
    setCurrent(e.key);
    history.push(`/${e.key}`);
  };

  const options = users.map((user) => ({
    label: `${user.firstName} ${user.lastName}`,
    value: `${user.id}`,
  }));

  const handleUserUpdate = (userId: string) => {
    const userDetails = users.filter((user) => user.id == userId);
    dispatch(setCurrentUser(userDetails[0]));
  };
  const menuItem = getMenuItem(currentUser);

  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ padding: 0, background: colorBgContainer, paddingRight: `16px` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
          <KrollSelect
            placeholder="Appear As"
            options={options}
            mode={undefined}
            plceHolderStyle={{ marginTop: 0, paddingRight: `8px` }}
            style={{ width: '200px' }}
            value={
              currentUser?.id ? options.find((user) => currentUser.id && +user.value === +currentUser.id) : undefined
            }
            onChange={handleUserUpdate}
          />
        </div>
      </Header>
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0">
          {/* <div className="demo-logo-vertical" /> */}

          <Menu
            theme="dark"
            mode="inline"
            items={menuItem}
            selectedKeys={[current]}
            defaultOpenKeys={['sub1']}
            onClick={onClick}
            style={{ paddingTop: '24px' }}
          />
        </Sider>

        <Content>
          <div
            style={{
              padding: 24,
              height: '100%',
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
