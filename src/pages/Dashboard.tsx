import { FC, useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';

import useApi from '../hooks/useApi';
import { Employee } from '../model/employee';
import EmployeeService from '../services/employes';
import { EmployeesTable } from '../componets/EmployeesTable';



export const Dashboard: FC = () => {
  const { fetch } = useApi(EmployeeService.list);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const getEmployees = () => {
    fetch().then(({ data }) => {
      setEmployees(data.data);
    });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div>
      <Stack spacing={2} direction="row-reverse" sx={{ mb: 2 }}>
        <Button variant="contained">Add new</Button>
      </Stack>
      {employees.length > 0 && <EmployeesTable data={employees} />}
    </div>
  );
};
