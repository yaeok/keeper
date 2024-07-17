import React, { useEffect, useRef } from 'react'

import { Actual } from '@/domain/entity/actual_entity'

interface CustomLearningTimeChartProps {
  actuals: Actual[]
}

const CustomLearningTimeChart: React.FC<CustomLearningTimeChartProps> = ({
  actuals,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const padding = 40
    const graphWidth = width - padding * 2
    const graphHeight = height - padding * 2

    // 背景のクリア
    ctx.clearRect(0, 0, width, height)

    // データの最大値を取得
    const maxHours = Math.max(...actuals.map((d) => d.studyHours))

    // 軸の描画
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.strokeStyle = '#000'
    ctx.stroke()

    // データの描画
    actuals.forEach((d, index) => {
      const x = padding + (index / (actuals.length - 1)) * graphWidth
      const y = height - padding - (d.studyHours / maxHours) * graphHeight

      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2, true)
      ctx.fillStyle = '#007bff'
      ctx.fill()

      if (index > 0) {
        const prevX =
          padding + ((index - 1) / (actuals.length - 1)) * graphWidth
        const prevY =
          height -
          padding -
          (actuals[index - 1].studyHours / maxHours) * graphHeight

        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = '#007bff'
        ctx.stroke()
      }
    })

    // 軸のラベル
    ctx.fillStyle = '#000'
    ctx.font = '12px Arial'
    ctx.textAlign = 'center'
    actuals.forEach((d, index) => {
      const x = padding + (index / (actuals.length - 1)) * graphWidth
      ctx.fillText(
        new Date(d.date).toLocaleDateString(),
        x,
        height - padding + 20
      )
    })

    // 縦軸のラベル
    for (let i = 0; i <= maxHours; i++) {
      const y = height - padding - (i / maxHours) * graphHeight
      ctx.fillText(i.toString(), padding - 20, y + 3)
    }
  }, [actuals])

  return <canvas ref={canvasRef} width={600} height={400}></canvas>
}

export default CustomLearningTimeChart
