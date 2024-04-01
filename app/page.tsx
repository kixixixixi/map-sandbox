"use client"

import React, { NextPage } from "next"
import { useEffect, useState } from "react"

const Index: NextPage = () => {
  const [position, setPosition] = useState<GeolocationPosition>()
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition(position)
    })
  }, [])
  return (
    <>
      <section>
        {position?.coords.latitude}:{position?.coords.longitude}
      </section>
    </>
  )
}

export default Index
