export enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export enum ROLES {
  VIEW_PROJECTS = 'View Project',
  EDIT_PROJECTS = 'Edit Project',
  RUN_PROJECTS = 'Run Project',
  EDIT_TASKS = 'Edit Tasks',
  DELETE_TASKS = 'Delete Tasks',
  VIEW_TASKS = 'View Tasks',
  VIEW_USERS = 'View Users',
  EDIT_USERS = 'Edit Users',
  DETELE_USERS = 'Delete Users',
}

export enum TASKTYPE {
  SET_STATUS = 'set-status',
  RUN = 'run',
  DELET = 'delete',
  CREATE = 'create',
  MODIFY = 'modify',
}

export const Status = [
  {
    label: 'ACTIVE',
    value: STATUS.ACTIVE,
  },
  {
    label: 'INACTIVE',
    value: STATUS.INACTIVE,
  },
];

export const Roles = [
  {
    label: 'View Project',
    value: ROLES.VIEW_PROJECTS,
  },
  {
    label: 'Edit Project',
    value: ROLES.EDIT_PROJECTS,
  },
  {
    label: 'Run Project',
    value: ROLES.RUN_PROJECTS,
  },
  {
    label: 'View Tasks',
    value: ROLES.VIEW_TASKS,
  },
  {
    label: 'Edit Tasks',
    value: ROLES.EDIT_TASKS,
  },
  {
    label: 'Delete Tasks',
    value: ROLES.DELETE_TASKS,
  },
  {
    label: 'View Users',
    value: ROLES.VIEW_USERS,
  },
  {
    label: 'Edit Users',
    value: ROLES.EDIT_USERS,
  },
  {
    label: 'Delete Users',
    value: ROLES.DETELE_USERS,
  },
];

export const NavigationMenu = [
  {
    key: 'user',
    label: 'User',
    permissions: [ROLES.VIEW_USERS, ROLES.EDIT_USERS, ROLES.DETELE_USERS],
  },
  {
    key: 'task',
    label: 'Task',
    permissions: [ROLES.VIEW_TASKS, ROLES.EDIT_TASKS, ROLES.DELETE_TASKS],
  },
  {
    key: 'project',
    label: 'Project',
    permissions: [ROLES.VIEW_PROJECTS, ROLES.EDIT_PROJECTS, ROLES.RUN_PROJECTS],
  },
];

export const taskType = [
  {
    key: 'set-status',
    value: TASKTYPE.SET_STATUS,
  },
  {
    key: 'run',
    value: TASKTYPE.RUN,
  },
  {
    key: 'create',
    value: TASKTYPE.CREATE,
  },
  {
    key: 'delete',
    value: TASKTYPE.DELET,
  },
  {
    key: 'modify',
    value: TASKTYPE.MODIFY,
  },
];

export const DATE_FORMAT = 'MM/DD/YYYY';
