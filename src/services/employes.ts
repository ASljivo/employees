import ApiClient, { Response } from '../utils/ApiClient';


class EmployeeService {
	static list(): Promise<Response<any>> {
		return ApiClient.get<any>(`employees`);
	}


	// static employments(token: string, individuals: string[]): Promise<Response<any>> {
	// 	return ApiClient.post<any, any>(
	// 		`${_tryfinch}/employer/employment`,
	// 		// eslint-disable-next-line @typescript-eslint/camelcase
	// 		{ requests: individuals.map((ind: string) => ({ individual_id: ind })) },
	// 		{
	// 			Authorization: `Bearer ${token}`,
	// 			'Finch-API-Version': '2020-09-17',
	// 		}
	// 	);
	// }

	// static deleteByIds(ids: number[]): Promise<Response<{ id: number }>> {
	// 	return ApiClient.delete<any, { id: number }>(`${_path}`, ids);
	// }

	// static update(data: any): Promise<Response<any>> {
	// 	return ApiClient.put<any>('employee', data);
	// }
}

export default EmployeeService;
