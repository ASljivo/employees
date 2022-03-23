import { FC, useEffect, useState } from 'react';

import useApi from '../hooks/useApi';
import { Employee } from '../model/employee';
import EmployeeService from '../services/employes';
import { EmployeesTable } from '../componets/EmployeesTable';
import api from '../api/api.json';

export const Dashboard: FC = () => {
  const { fetch, isLoading } = useApi(EmployeeService.list);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const getEmployees = () => {
    fetch().then(({ data }) => {

      if (data) {
        setEmployees(data.data);
      } else {
        setEmployees(api.data);
      }
    });
  };

  useEffect(() => {
    getEmployees();
  });

  return (
    <div>
      {employees.length > 0 && (
        <EmployeesTable data={employees} isLoadingGet={isLoading} />
      )}
    </div>
  );
};
