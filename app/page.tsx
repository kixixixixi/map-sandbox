"use client"

import React, { NextPage } from "next"
import { useEffect, useState } from "react"
import { fromGeoPositionToImageUrlList } from "utils/calculate"

const Index: NextPage = () => {
  const [position, setPosition] = useState<GeolocationPosition>()
  const [tile, setTile] = useState<{
    width: number
    height: number
    offset: { x: number; y: number }
  }>({
    width: 0,
    height: 0,
    offset: {
      x: 0,
      y: 0,
    },
  })
  useEffect(() => {
    const handleResize = () => {
      const { innerHeight, innerWidth } = window
      const w = Math.ceil(innerWidth / 256)
      const h = Math.ceil(innerHeight / 256)
      setTile({
        width: w % 2 == 0 ? w + 1 : w,
        height: h % 2 == 0 ? h + 1 : h,
        offset: {
          x: (innerWidth % 256) - (w % 2 == 0 ? 256 : 0),
          y: (innerHeight % 256) - (h % 2 == 0 ? 256 : 0),
        },
      })
    }
    window.addEventListener("resize", handleResize)
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition(position)
      handleResize()
    })
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <main>
        <section
          style={{
            display: "grid",
            height: `${tile.height * 256}px`,
            overflow: "hidden",
            position: "fixed",
            left: `${tile.offset.x / 2 - 128}px`,
            top: `${tile.offset.y / 2}px`,
            width: `${tile.width * 256}px`,
          }}
        >
          {position &&
            fromGeoPositionToImageUrlList({
              position,
              z: 18,
              ...tile,
            }).map((row, i) =>
              row.map((url, j) => (
                <div
                  key={`${i}-${j}`}
                  style={{
                    backgroundImage: `url(${url})`,
                    gridRowStart: j + 1,
                    gridColumnStart: i + 1,
                    height: 256,
                    width: 256,
                  }}
                />
              ))
            )}
        </section>
        <div
          style={{
            backgroundColor: "blue",
            border: "solid 1px white",
            borderRadius: "8px",
            height: "12px",
            left: "50vw",
            position: "fixed",
            top: "50dvh",
            width: "12px",
            zIndex: 2,
          }}
        />
        <section
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
          }}
        >
          {position?.coords.latitude}:{position?.coords.longitude}
        </section>
      </main>
    </>
  )
}

export default Index
