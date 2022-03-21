import ApiClient, { Response } from '../utils/ApiClient';


class EmployeeService {
	static list(): Promise<Response<any>> {
		return ApiClient.get<any>(`employees`);
	}


	static create(data: any): Promise<Response<any>> {
		return ApiClient.post<any>(`create`, data);
	}

	static deleteById(id: number): Promise<Response<{ id: number }>> {
		return ApiClient.delete<any, { id: number }>(`delete/${id}`);
	}

	static update(data: any): Promise<Response<any>> {
		return ApiClient.put<any>(`update/${data.id}`, data);
	}
}

export default EmployeeService;
