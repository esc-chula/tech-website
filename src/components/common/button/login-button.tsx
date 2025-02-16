import Link from 'next/link'

import { Button } from '~/components/ui/button'

const LoginButton: React.FC = () => {
  return (
    <Link href='/login'>
      <Button className='px-5' size='sm' variant='primary'>
        Log in
      </Button>
    </Link>
  )
}

export default LoginButton
