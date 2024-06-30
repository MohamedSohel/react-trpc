import { Col, Modal, Row, Space, Table, TableProps, theme } from 'antd';
import { KrollDatePicker } from '../common/DatePicker';
import { Header } from '../common/Header';
import { KrollInput } from '../common/Input';
import { TASK } from '../task/Task';
import { DeleteOutlined, PlusCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { setIsEditable, taskSelector } from '../../redux/slice/taskSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { KrollSelect } from '../common/Select';
import { fetchTask } from '../../interaction/task';
import { addProject, deleteProject, fetchProject, updateProject } from '../../interaction/project';
import { projectSelector } from '../../redux/slice/projectSlice';
import { formatPercentage, generateRandomPercentage, isPermitted } from '../../utlis/utils';
import { AddTask } from '../task/AddTask';
import { KrollButton } from '../common/Button';
import { userSelector } from '../../redux/slice/userSlice';
import { ROLES } from '../constants';

export interface PROJECT {
  id?: string;
  taskId: string;
  result: number | undefined;
  order: number;
}

export const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TASK>();
  const [isTaskReview, setIsTaskReview] = useState(false);
  const [currentTask, setCurrentTask] = useState<TASK>();

  const { currentUser } = useAppSelector(userSelector);
  const role = currentUser?.role || [];

  const { tasks } = useAppSelector(taskSelector);
  const { projects } = useAppSelector(projectSelector);

  const {
    token: { colorSuccess },
  } = theme.useToken();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTask());
    dispatch(fetchProject());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (data: PROJECT, index: number, dir?: string) => {
    const actualIndex = dir === 'up' ? index - 1 : index + 1;
    if (actualIndex < 0 || actualIndex === projects.length) {
      return;
    }
    const localProject = [...projects];
    localProject.splice(index, 1)[0];
    localProject.splice(actualIndex, 0, data);
    dispatch(updateProject(localProject));
  };

  const columns: TableProps<PROJECT>['columns'] = [
    {
      title: 'Order',
      key: 'order',
      render: (value, _, index) => {
        return (
          <Space size="middle">
            <ArrowUpOutlined
              onClick={() => {
                handleClick(value, index, 'up');
              }}
            />
            {/* {isPermitted(role || [], ROLES.DELETE_TASKS) && ( */}
            <ArrowDownOutlined
              onClick={() => {
                handleClick(value, index);
              }}
            />
            {/* )} */}
          </Space>
        );
      },
    },
    {
      title: 'Task Name',
      key: 'taskName',
      render: (value: PROJECT) => {
        const task = tasks.find((task) => task.id && +task.id === +value.taskId);
        return (
          <div
            style={{ color: colorSuccess, textDecoration: `undeline`, cursor: 'pointer' }}
            onClick={() => {
              dispatch(setIsEditable(false));
              setCurrentTask(task);
              setIsTaskReview(true);
            }}
          >
            {task?.taskName}
          </div>
        );
      },
    },
    {
      title: 'Result in %',
      dataIndex: 'result',
      key: 'result',
      render: (value) => <div>{value ? formatPercentage(value) : '--'}</div>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (value) => (
        <Space size="middle">
          {/* {isPermitted(role || [], ROLES.DELETE_TASKS) && ( */}
          <DeleteOutlined
            onClick={() => {
              dispatch(deleteProject(value));
            }}
          />
          {/* )} */}
        </Space>
      ),
    },
  ];

  const handleOk = () => {
    if (selectedTask?.id) {
      const project: PROJECT = {
        taskId: selectedTask.id,
        result: undefined,
        order: projects.length + 1,
      };
      dispatch(addProject(project));
      setIsModalOpen(false);
    }
  };

  const handleTaskSelected = (e: string | number) => {
    const task = tasks.find((task) => task.id && +task.id === +e);
    setSelectedTask(task);
  };

  const taskOptions = tasks.map((task) => ({
    label: `${task.taskName}`,
    value: `${task.id}`,
  }));

  const handleRunProject = () => {
    const localProject = projects.map((project) => ({
      ...project,
      result: generateRandomPercentage(),
    }));
    dispatch(updateProject(localProject));
  };

  return (
    <>
      <Header heading="Project" btntext="" onClick={() => {}} hasPermission={false} />
      <Row justify="space-between" align="middle">
        <Col>
          <div style={{ display: 'flex' }}>
            <div style={{ paddingRight: 8 }}>
              <KrollInput placeholder={'Baseline'} name={'baseline'} onChange={() => {}} type="number" />
            </div>
            <div style={{ paddingRight: 8 }}>
              <KrollDatePicker placeholder={'Cut-off date'} name={'cutoff'} onChange={() => {}} />
            </div>
            <div style={{ paddingRight: 8 }}>
              <KrollInput placeholder={'Rate Limit'} name={'rate limit'} onChange={() => {}} type="number" />
            </div>
          </div>
        </Col>
        <Col>
          <KrollButton
            type="primary"
            style={{ marginTop: '16px' }}
            onClick={handleRunProject}
            btnText={'Run'}
            isVisible={isPermitted(role, ROLES.RUN_PROJECTS)}
          />
        </Col>
      </Row>
      <Table columns={columns} dataSource={projects} style={{ paddingTop: '16px' }} pagination={false} />
      <KrollButton
        btnText={'Add'}
        type="primary"
        style={{ marginTop: '16px' }}
        icon={<PlusCircleOutlined />}
        onClick={() => {
          setIsModalOpen(true);
        }}
        isVisible={isPermitted(role, ROLES.EDIT_PROJECTS)}
      />

      <Modal
        title="Add Task"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        okText="Add"
      >
        <KrollSelect
          options={taskOptions}
          mode={undefined}
          placeholder={'Add a task'}
          onChange={handleTaskSelected}
          value={undefined}
        />
      </Modal>
      <AddTask isModalOpen={isTaskReview} setIsModalOpen={setIsTaskReview} currentTask={currentTask} />
    </>
  );
};
