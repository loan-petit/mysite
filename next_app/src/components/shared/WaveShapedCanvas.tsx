import React from 'react'
import useCurrentSize from '../../utils/useCurrentSize'

type Props = {
  fillStyle: string
}

export default function WaveShapedCanvas ({ fillStyle }: Props) {
  // Setup curved shaped overlay for cover image
  const canvasRef = React.useRef(null)

  // Redraw the background and its overlay on screen resize
  const size = useCurrentSize()

  React.useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = document.body.clientWidth // Don't take scrollbar width in account
    canvas.height = size.height / 15
    var ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = fillStyle
    ctx.beginPath()

    ctx.moveTo(0, canvas.height * 0.5)
    ctx.quadraticCurveTo(
      canvas.width * 0.5,
      canvas.height * 0.6,
      canvas.width,
      0,
    )
    ctx.lineTo(canvas.width, canvas.height)
    ctx.lineTo(0, canvas.height)

    ctx.fill()
  })

  return <canvas className='absolute bottom-0 z-0' ref={canvasRef} />
}
