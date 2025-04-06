import { useQuery } from "@tanstack/react-query";
import { LeaveRequest } from '@/types/LeaveRequest';

export default function AllRequests() {
	const { isPending, error, data } = useQuery({
		queryKey: ['allRequests'],
		queryFn: () =>
			fetch('http://api.timemanager.local/api/requests').then((res) =>
				res.json(),
			)
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