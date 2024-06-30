import { Space, Table, TableProps } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Header } from '../common/Header';
import { AddUser } from './AddUser';
import { useState } from 'react';
import { ROLES, STATUS } from '../constants';
import { deleteUser } from '../../interaction/user';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setEditableUser, userSelector } from '../../redux/slice/userSlice';
import { isPermitted } from '../../utlis/utils';

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  role?: Partial<ROLES>[];
  email?: string;
  status?: Partial<STATUS>;
}

export const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { users, currentUser } = useAppSelector(userSelector);
  const role = currentUser?.role || [];
  const showModal = () => {
    setIsModalOpen(true);
  };

  const columns: TableProps<User>['columns'] = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (value: string[]) => {
        return value?.join();
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (value) => (
        <Space size="middle">
          {isPermitted(role || [], ROLES.EDIT_USERS) && (
            <EditOutlined
              onClick={() => {
                dispatch(setEditableUser(value));
                setIsModalOpen(true);
              }}
            />
          )}

          {isPermitted(role || [], ROLES.DETELE_USERS) && (
            <DeleteOutlined
              onClick={() => {
                dispatch(deleteUser(value));
              }}
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Header
        heading="Users"
        btntext="Add User"
        onClick={showModal}
        hasPermission={isPermitted(role, ROLES.EDIT_USERS)}
      />
      <Table columns={columns} dataSource={users} style={{ paddingTop: '16px' }} />
      <AddUser showModal={showModal} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};
