import { User } from '@/types/User'

export type LeaveRequest = {
	id: number
	status: 'approved' | 'rejected' | 'pending' | 'completed'
	reason: string
	date_start: Date
	date_end: Date
	approver: User
	requester: User
	submitted_date: Date
	updated_date: Date
}