import AdminCalendarCard from '@/components/ui/AdminCalendarCard'
import ErrorBanner from '@/components/ui/ErrorBanner'
import LeaveRequestSkeleton from '@/components/ui/LeaveRequestSkeleton'
import PageTitle from '@/components/ui/PageTitle'
import axiosInstance from '@/lib/api'
import { LeaveRequest } from '@/types/LeaveRequest'
import { useQuery } from '@tanstack/react-query'

export default function AdminCalendarPage() {

	const { isPending, error, data } = useQuery({
		queryKey: ['userCalendar'],
		queryFn: () =>
			axiosInstance.get('/api/admin/calendar').then((response) => {
				console.log(response)
				return response.data
			})
	})

	if (isPending) return (
		<>
			<PageTitle title='All upcoming leave requests' />
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
			<PageTitle title='All upcoming leave requests' />
			<ErrorBanner />
		</>
	)


	return (
		<>
			<div className='flex items-center mt-8'>
				<PageTitle title='All upcoming leave requests' className='grow m-0' />
				<div className='shrink-0'>
					Total leave requests: <span className='font-bold'>{data.data.length}</span>
				</div>
			</div>
			<div className='flex flex-col gap-4 my-8'>
				<div className='grid grid-cols-4'>
				</div>
				{
					data.data.map((leaveRequest: LeaveRequest) => {
						return (
							<AdminCalendarCard leaveRequest={leaveRequest} />
						)
					})
				}
			</div>
		</>
	)
}