import { useUserById } from '../hooks/auth'
import { Link } from '@mui/material'

interface UserAvatarProps {
  userId?: number
}

export default function UserAvatar(props: UserAvatarProps) {
  const { userId } = props;
  const user = useUserById(userId || 0);

  return (
    <>
      <Link href='#' sx={{ marginLeft: 1 }}>
        {user?.username}
      </Link>
    </>
  )
}
