import { Space, Table, TableProps, theme } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Header } from '../common/Header';
import { useEffect, useState } from 'react';
import { AddTask } from './AddTask';
import { DATE_FORMAT, ROLES, TASKTYPE } from '../constants';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setIsEditable, taskSelector } from '../../redux/slice/taskSlice';
import moment from 'moment';
import { deleteTask, fetchTask } from '../../interaction/task';
import { userSelector } from '../../redux/slice/userSlice';
import { isPermitted } from '../../utlis/utils';

export interface Parameter {
  key: string;
  value: string;
}

export interface TASK {
  id?: string;
  taskName?: string;
  description?: string;
  updatedDate?: string;
  type?: Partial<TASKTYPE>;
  parameters?: Parameter[];
}
export const Task = () => {
  const {
    token: { colorSuccess },
  } = theme.useToken();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TASK>();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const { tasks } = useAppSelector(taskSelector);
  const { currentUser } = useAppSelector(userSelector);
  const role = currentUser?.role || [];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTask());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: TableProps<TASK>['columns'] = [
    {
      title: 'Task Name',
      key: 'taskName',
      render: (value: TASK) => {
        return (
          <div
            style={{ color: colorSuccess, textDecoration: `undeline`, cursor: 'pointer' }}
            onClick={() => {
              dispatch(setIsEditable(false));
              setCurrentTask(value);
              setIsModalOpen(true);
            }}
          >
            {value.taskName}
          </div>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Updated Date',
      dataIndex: 'updatedDate',
      key: 'updatedDate',
      render: (value) => <div>{moment(value).format(DATE_FORMAT)}</div>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Action',
      key: 'action',
      render: (value) => (
        <Space size="middle">
          {isPermitted(role || [], ROLES.EDIT_TASKS) && (
            <EditOutlined
              onClick={() => {
                const task = tasks.find((task) => task.id === value.id);
                setCurrentTask(task);
                setIsModalOpen(true);
              }}
            />
          )}

          {isPermitted(role || [], ROLES.DELETE_TASKS) && (
            <DeleteOutlined
              onClick={() => {
                dispatch(deleteTask(value));
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
        heading="Tasks"
        btntext="Add Task"
        onClick={showModal}
        hasPermission={isPermitted(role, ROLES.EDIT_TASKS)}
      />
      <Table columns={columns} dataSource={tasks} style={{ paddingTop: '16px' }} />
      <AddTask
        showModal={showModal}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        currentTask={currentTask}
      />
    </>
  );
};
