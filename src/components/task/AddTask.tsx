import { Row, Col, Modal, theme, Table, Space, Input, TableProps, DatePicker } from 'antd';
import { AddUser } from '../user/AddUser';
import { KrollInput } from '../common/Input';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { KrollSelect } from '../common/Select';
import { DATE_FORMAT, TASKTYPE, taskType } from '../constants';
import { TASK, Parameter } from './Task';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addTask, updateTask } from '../../interaction/task';
import { taskSelector } from '../../redux/slice/taskSlice';
import { KrollButton } from '../common/Button';

interface AddTask extends AddUser {
  currentTask?: TASK;
}
export const AddTask: React.FC<AddTask> = ({ isModalOpen, setIsModalOpen, currentTask }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const dispatch = useAppDispatch();
  const { isEditable } = useAppSelector(taskSelector);

  const [parameters, setParameters] = useState<Parameter[]>([{ key: 'key1', value: 'value1' }]);
  const [taskDetails, setTaskDetails] = useState<TASK>(currentTask || {});

  useEffect(() => {
    if (currentTask) {
      setTaskDetails(currentTask);
      setParameters(currentTask?.parameters || []);
    }
  }, [currentTask]);

  const handleParameter = (removeIndex = -1) => {
    const localParam = [...parameters];
    if (removeIndex !== -1) {
      localParam.splice(removeIndex, 1);
    } else {
      localParam.push({ key: ``, value: '' });
    }
    setParameters(localParam);
  };

  const columns: TableProps<Parameter>['columns'] = [
    {
      title: 'Key',
      key: 'key',
      render: (value, _, index) => {
        return (
          <Input
            onChange={(e) => {
              handleParamChange(e, index);
            }}
            name={`key`}
            value={value.key}
            disabled={!isEditable}
          />
        );
      },
    },
    {
      title: 'Value',
      key: 'value',
      render: (value, _, index) => {
        return (
          <Input
            onChange={(e) => {
              handleParamChange(e, index);
            }}
            name={`value`}
            value={value.value}
            disabled={!isEditable}
          />
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, __, index) => (
        <Space size="middle">
          <DeleteOutlined onClick={() => handleParameter(index)} />
        </Space>
      ),
    },
  ];

  const handleOk = () => {
    const localTask = { ...taskDetails, updatedDate: moment(new Date(), DATE_FORMAT).toString(), parameters };
    setIsModalOpen(false);
    if (currentTask?.id && taskDetails) {
      dispatch(updateTask(localTask));
    } else {
      dispatch(addTask(localTask));
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleTaskType = (e: Partial<TASKTYPE>) => {
    const localTaskDetails = { ...taskDetails };
    localTaskDetails.type = e;
    setTaskDetails(localTaskDetails);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const localTaskDetails = { ...taskDetails, [e.target.name]: e.target.value };
    setTaskDetails(localTaskDetails);
  };

  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const upadatedParam = parameters.map((param, index) => {
      if (index === id) {
        return { ...param, [e.target.name]: e.target.value };
      }
      return param;
    });
    setParameters(upadatedParam);
  };

  return (
    <Modal
      title={`${currentTask ? `Edit` : 'Add'} Task`}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      okText="save"
    >
      <Row type="flex" justify="space-between">
        <Col>
          <KrollInput
            placeholder="Task Name"
            onChange={handleChange}
            name="taskName"
            disabled={!isEditable}
            value={taskDetails.taskName}
          />
        </Col>
        <Col>
          <KrollInput
            placeholder="Description"
            onChange={handleChange}
            name="description"
            disabled={!isEditable}
            value={taskDetails.description}
          />
        </Col>
        <Col>
          <div style={{ marginTop: '16px' }}>Update Date</div>
          <DatePicker
            name="date"
            format={DATE_FORMAT}
            value={taskDetails?.updatedDate ? moment(new Date(taskDetails?.updatedDate), DATE_FORMAT) : ''}
            disabled
          />
        </Col>
        <Col>
          <KrollSelect
            options={taskType}
            placeholder="Task Type"
            onChange={handleTaskType}
            mode={undefined}
            value={taskDetails.type}
            disabled={!isEditable}
          />
        </Col>
      </Row>
      <div style={{ width: '50%' }}>
        <h3 style={{ paddingTop: `24px`, color: colorPrimary }}>Parameters</h3>
        <Table columns={columns} dataSource={parameters} pagination={false} />
        <KrollButton
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => handleParameter()}
          style={{ marginTop: `24px` }}
          btnText={'Add'}
          isVisible={isEditable}
        />
      </div>
    </Modal>
  );
};
