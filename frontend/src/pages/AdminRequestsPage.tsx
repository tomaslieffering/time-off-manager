import { useQuery } from '@tanstack/react-query';
import { LeaveRequest } from '@/types/LeaveRequest';
import axiosInstance from '@/lib/api';
import LeaveRequestSkeleton from '@/components/ui/LeaveRequestSkeleton';
import PageTitle from '@/components/ui/PageTitle';
import ErrorBanner from '@/components/ui/ErrorBanner';
import AdminLeaveRequestCard from '@/components/ui/AdminLeaveRequestCard';

export default function AdminRequestsPage() {
	const { isPending, error, data } = useQuery({
		queryKey: ['adminRequests'],
		queryFn: () =>
			axiosInstance.get('/api/admin/requests').then((response) => {
				return response.data
			})
	})

	console.log(data)

	if (isPending) return (
		<>
			<PageTitle title='Pending leave requests' />
			<div className='flex flex-col gap-4 my-8'>
				{
					Array.from(Array(4).keys()).map(() => {
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
			<PageTitle title='Pending Leave Requests' />
			<ErrorBanner />
		</>
	)

	return (
		<>
			<PageTitle title='Pending leave requests' />
			<div className='flex flex-col gap-4 my-8'>
				{
					data.data.map((leaveRequest: LeaveRequest) => {
						return (
							<AdminLeaveRequestCard leaveRequest={leaveRequest} />
						)
					})
				}
			</div>
		</>
	)
}