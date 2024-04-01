"use client"

import React, { NextPage } from "next"
import { useEffect, useState } from "react"
import { fromGeoPositionToImageUrl } from "utils/calculate"

const Index: NextPage = () => {
  const [position, setPosition] = useState<GeolocationPosition>()
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition(position)
    })
  }, [])
  return (
    <>
      <main>
        {position && (
          <img
            src={fromGeoPositionToImageUrl({ position, z: 18 })}
            referrerPolicy="no-referrer"
          />
        )}
        <section>
          {position?.coords.latitude}:{position?.coords.longitude}
        </section>
      </main>
    </>
  )
}

export default Index
