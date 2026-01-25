import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Mohammed Shemim - Portfolio'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
            style={{
                display: 'flex',
                background: 'linear-gradient(to bottom right, #FF9D00, #B6771D)',
                width: '100%',
                height: '100%',
                position: 'absolute',
                opacity: 0.15,
            }}
        />
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
            zIndex: 10,
            textAlign: 'center',
            textShadow: '0 0 40px rgba(255, 157, 0, 0.3)',
          }}
        >
          Mohammed Shemim
        </div>
        <div
          style={{
            fontSize: 40,
            color: '#FFCF71',
            zIndex: 10,
            textAlign: 'center',
            letterSpacing: '-0.02em',
          }}
        >
            Shaping the future of digital experiences.
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
