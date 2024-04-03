"use client"

import React, { NextPage } from "next"
import { useEffect, useState } from "react"
import { fromGeoPositionToImageUrlList } from "utils/calculate"

const Index: NextPage = () => {
  const [position, setPosition] = useState<GeolocationPosition>()
  const [tileCount, setTileCount] = useState<{ width: number; height: number }>(
    {
      width: 0,
      height: 0,
    }
  )
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
    setTileCount({
      width: Math.ceil(innerWidth / 256),
      height: Math.ceil(innerHeight / 256),
    })
  }
  return (
    <>
      <main>
        <section style={{ display: "grid" }}>
          {position &&
            fromGeoPositionToImageUrlList({
              position,
              z: 18,
              ...tileCount,
            }).map((row, i) =>
              row.map((url, j) => (
                <img
                  src={url}
                  style={{ gridRowStart: j + 1, gridColumnStart: i + 1 }}
                />
              ))
            )}
        </section>
        <section>
          {position?.coords.latitude}:{position?.coords.longitude}
        </section>
      </main>
    </>
  )
}

export default Index
