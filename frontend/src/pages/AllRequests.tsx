import { useQuery } from "@tanstack/react-query";
import { LeaveRequest } from '@/types/LeaveRequest';
import axiosInstance from '@/lib/api';

export default function AllRequests() {
	const { isPending, error, data } = useQuery({
		queryKey: ['allRequests'],
		queryFn: () =>
			axiosInstance.get('/api/requests').then((response) => {
				return response.data
			})
	})

	if (isPending) return 'Loading...'

	if (error) return 'An error has occurred: ' + error.message

	return (
		<div>
			{
				data.data.map((request: LeaveRequest) => {
					return (
						<div>
							{
								request.requester.name
							}
						</div>
					)
				})
			}
		</div>
	)
}