import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/api';
import PageTitle from '@/components/ui/PageTitle';
import ErrorBanner from '@/components/ui/ErrorBanner';
import { useState } from 'react';
import { format, getDaysInMonth, isAfter, isBefore } from 'date-fns';
import { LeaveRequest } from '@/types/LeaveRequest';
import CalendarDay from '@/components/ui/CalendarDay';
import { cx } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CalendarSkeleton from '@/components/ui/CalendarSkeleton';
import DaysOfTheWeek from '@/components/ui/DaysOfTheWeek';

export default function UserCalendarPage() {

	const [month, setMonth] = useState(new Date())

	const getAllDaysInMonth = (date: Date) =>
		Array.from(
			{ length: getDaysInMonth(date) },
			(_, i) => new Date(date.getFullYear(), date.getMonth(), i + 1)
		);

	const queryClient = useQueryClient();

	const { isPending, isFetching, error, data } = useQuery({
		queryKey: ['userCalendar'],
		queryFn: () =>
			axiosInstance.get('/api/calendar').then((response) => {
				return getAllDaysInMonth(month).map((day) => {
					return {
						'date': day,
						'inPast': isBefore(day, new Date()),
						'onLeave': response.data.data.filter((leaveRequest: LeaveRequest) => {
							return isBefore(leaveRequest.date_start, day) && isAfter(leaveRequest.date_end, day)
						})
					}
				})
			})
	})


	const changeMonth = (forward: boolean) => {
		if (forward) {
			setMonth(new Date(month.setMonth(month.getMonth() + 1)))
		} else {
			setMonth(new Date(month.setMonth(month.getMonth() - 1)))
		}
		queryClient.invalidateQueries({ queryKey: ['userCalendar'] })
	}

	if (isPending) return (
		<>
			<PageTitle title='Upcoming Team Leave' />
			<DaysOfTheWeek />
			<CalendarSkeleton />
		</>
	)

	if (error) return (
		<>
			<PageTitle title='Upcoming Team Leave' />
			<ErrorBanner />
		</>
	)

	return (
		<>
			<div className='flex flex-col sm:flex-row mt-8 mb-8 lg:mb-0'>
				<PageTitle title='Upcoming Team Leave' className='m-0 grow' />
				<button onClick={() => changeMonth(false)} disabled={isFetching}
					className={cx('flex items-center justify-center cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-1 text-center',
						isFetching ? 'bg-blue-400 hover:bg-blue-400' : ''
					)}>
					<ArrowLeft className='mr-2' />
					Previous
				</button>
				<div className='flex items-center justify-center mx-4 min-w-28'>
					{
						format(month, 'MMMM, Y')
					}
				</div>
				<button onClick={() => changeMonth(true)} disabled={isFetching}
					className={cx('flex items-center justify-center cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-1 text-center',
						isFetching ? 'bg-blue-400 hover:bg-blue-400' : ''
					)}>
					Next
					<ArrowRight className='ml-2' />
				</button>
			</div>
			<DaysOfTheWeek />
			{
				isFetching ?
					<CalendarSkeleton /> :
					<div className='grid lg:grid-cols-7 gap-2 lg:gap-1 grid-cols-3'>
						<div className='hidden lg:block' style={{ gridColumn: month.getDay() }}>
						</div>
						{
							data.map((day) => {
								return (
									<CalendarDay date={day.date} onLeave={day.onLeave} inPast={day.inPast} />
								)
							})
						}
					</div>
			}
		</>
	)
}