import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    code: string
  }
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { code } = params

  // TODO: code validation and redirect
  // if no registration redirect to /hackathon/community/registration
  // if has registration redirect to /hackathon/community/ticket
  if (code !== 'test') {
    return notFound()
  }

  return null
}

export default Page
