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
                background: 'linear-gradient(to bottom right, #4F46E5, #9333EA)',
                width: '100%',
                height: '100%',
                position: 'absolute',
                opacity: 0.2,
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
          }}
        >
          Mohammed Shemim
        </div>
        <div
          style={{
            fontSize: 40,
            color: '#A3A3A3',
            zIndex: 10,
            textAlign: 'center',
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
