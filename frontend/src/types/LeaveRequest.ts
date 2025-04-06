import { User } from '@/types/User'

export type LeaveRequest = {
	id: number
	status: string
	reason: string
	approver: User
	requester: User
}