import React, { FC, useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import { Employee } from '../model/employee';
import EmployeeService from '../services/employes';

export const Dashboard: FC = () => {
  const { fetch, isLoading } = useApi(EmployeeService.list);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const getEmployees = () => {
		fetch().then(({ data }) => {
      console.log(data)
			setEmployees(data);
		});
	};

	useEffect(() => {
		getEmployees();
	}, []);

  return <div>Table</div>;
};
