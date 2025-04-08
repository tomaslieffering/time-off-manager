import { useQuery } from '@tanstack/react-query';
import { LeaveRequest } from '@/types/LeaveRequest';
import axiosInstance from '@/lib/api';
import LeaveRequestSkeleton from '@/components/ui/LeaveRequestSkeleton';
import PageTitle from '@/components/ui/PageTitle';
import ErrorBanner from '@/components/ui/ErrorBanner';
import LeaveRequestCard from '@/components/ui/LeaveRequestCard';

export default function UserRequestsPage() {
	const { isPending, error, data } = useQuery({
		queryKey: ['allRequests'],
		queryFn: () =>
			axiosInstance.get('/api/requests').then((response) => {
				return response.data
			})
	})

	console.log(data)

	if (isPending) return (
		<>
			<PageTitle title='Upcoming Leave Requests' />
			<div className='flex flex-col gap-4 my-8'>
				{
					Array.from(Array(3).keys()).map(() => {
						return (
							<LeaveRequestSkeleton />
						)
					})
				}
			</div>
		</>
	)

	if (error) return (
		<>
			<PageTitle title='Upcoming Leave Requests' />
			<ErrorBanner />
		</>
	)

	return (
		<>
			<PageTitle title='Upcoming Leave Requests' />
			<div className='flex flex-col gap-4 my-8'>
				{
					data.data.map((leaveRequest: LeaveRequest) => {
						return (
							<LeaveRequestCard leaveRequest={leaveRequest} />
						)
					})
				}
			</div>
		</>
	)
}