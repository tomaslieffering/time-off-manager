import { useQuery } from '@tanstack/react-query';
import { LeaveRequest } from '@/types/LeaveRequest';
import axiosInstance from '@/lib/api';
import LeaveRequestSkeleton from '@/components/ui/LeaveRequestSkeleton';
import PageTitle from '@/components/ui/PageTitle';
import ErrorBanner from '@/components/ui/ErrorBanner';
import LeaveRequestCard from '@/components/ui/LeaveRequestCard';
import { NavLink } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

export default function UserRequestsPage() {
	const { isPending, error, data } = useQuery({
		queryKey: ['userRequests'],
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
			<div className='flex items-center mt-8'>
				<PageTitle title='Upcoming Leave Requests' className='m-0 grow' />
				<NavLink to='/requests/new' className='flex items-center justify-center cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full w-full sm:w-auto px-5 py-2.5 text-center'>
					Submit new leave request
					<PlusCircle className='ml-2' />
				</NavLink>
			</div>
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