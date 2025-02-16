const Background: React.FC = () => {
  return (
    <div className='fixed inset-0 -z-50'>
      <div
        className='absolute inset-0 z-20'
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.75) 125%)',
        }}
      />
      <div
        className='absolute inset-0 z-10'
        style={{
          backgroundImage: "url('/assets/background.svg')",
          backgroundSize: '180px 180px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
        }}
      />
    </div>
  )
}

export default Background
