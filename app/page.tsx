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
    window.addEventListener("resize", handleResize)
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition(position)
      handleResize()
    })
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  const handleResize = () => {
    const { innerHeight, innerWidth } = window
    setTile({
      width: Math.ceil(innerWidth / 256),
      height: Math.ceil(innerHeight / 256),
      offset: {
        x: (innerWidth % 256) / 4,
        y: (innerHeight % 256) / 4,
      },
    })
    console.log(innerWidth, Math.ceil(innerWidth / 256), (innerWidth % 256) / 2)
  }
  return (
    <>
      <main>
        <div
          style={{
            position: "fixed",
            left: -tile.offset.x,
            top: -tile.offset.y,
          }}
        >
          <section
            style={{
              display: "grid",
              overflow: "hidden",
              position: "fixed",
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
            <div
              style={{
                backgroundColor: "blue",
                border: "solid 1px white",
                borderRadius: "8px",
                height: "12px",
                left: "50dvw",
                position: "fixed",
                top: "50dvh",
                width: "12px",
                zIndex: 2,
              }}
            />
          </section>
        </div>
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
