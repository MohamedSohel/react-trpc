import { Modal, SelectProps } from 'antd';
import { KrollInput } from '../common/Input';
import { KrollSelect } from '../common/Select';
import { ROLES, Roles, STATUS, Status } from '../constants';
import { useEffect, useState } from 'react';
import { User } from './User';
import { addUser, updateUser } from '../../interaction/user';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setEditableUser, userSelector } from '../../redux/slice/userSlice';

const options: SelectProps['options'] = Roles;

export interface AddUser {
  showModal?: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export const AddUser: React.FC<AddUser> = ({ isModalOpen, setIsModalOpen }) => {
  const { editableUser } = useAppSelector(userSelector);
  const [userDetails, setUserDetails] = useState<User>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Object.keys(editableUser)) {
      setUserDetails(editableUser);
    }
  }, [editableUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const localUserDetails = { ...userDetails, [e.target.name]: e.target.value };

    setUserDetails(localUserDetails);
  };

  const handleRoleChange = (e?: Partial<ROLES>[]) => {
    const localUserDetails = { ...userDetails };
    localUserDetails.role = e;
    setUserDetails(localUserDetails);
  };

  const handleStatusChange = (e: Partial<STATUS>[]) => {
    const localUserDetails = { ...userDetails };
    localUserDetails.status = e;
    setUserDetails(localUserDetails);
  };

  const handleOk = () => {
    if (editableUser.id && userDetails) {
      dispatch(updateUser(userDetails));
      dispatch(setEditableUser({}));
    } else if (userDetails) {
      dispatch(addUser(userDetails));
      setUserDetails({});
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal title={`${editableUser ? `Edit` : 'Add'} User`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <KrollInput placeholder="First Name" onChange={handleChange} name="firstName" value={userDetails?.firstName} />
      <KrollInput placeholder="Last Name" onChange={handleChange} name="lastName" value={userDetails?.lastName} />
      <KrollSelect
        options={options}
        placeholder="Roles"
        onChange={handleRoleChange}
        mode="multiple"
        value={userDetails?.role}
      />
      <KrollInput placeholder="email" onChange={handleChange} name="email" value={userDetails?.email} />
      <KrollSelect
        options={Status}
        placeholder="Status"
        onChange={handleStatusChange}
        mode={undefined}
        value={userDetails?.status}
      />
    </Modal>
  );
};
