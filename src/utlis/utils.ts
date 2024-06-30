import { User } from '../components/user/User';
import { NavigationMenu, ROLES } from '../components/constants';

export const getMenuItem = (currentUser: User) => {
  const currentRole = new Set(currentUser?.role || []);
  const menu = NavigationMenu.filter((menuItem) => {
    if (menuItem.permissions.some((permission) => currentRole.has(permission))) {
      return {
        label: menuItem.label,
        key: menuItem.key,
      };
    }
  });
  return menu;
};

export const isPermitted = (userRole: Partial<ROLES>[], requiredRole: ROLES) => userRole.includes(requiredRole);

export const sortedArray = <T>(array: Array<T>, key: keyof T) =>
  array.sort((a, b) => {
    return (a[key] as never) - (b[key] as never);
  });
export const generateRandomPercentage = () => {
  const randomNum = (Math.random() * 2000) / 100;

  return randomNum;
};
export const formatPercentage = (result: number) => {
  const formattedPercentage = (+result.toFixed(2)).toLocaleString('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedPercentage;
};
