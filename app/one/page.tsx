"use client"

import React, { NextPage } from "next"
import { useEffect, useState } from "react"
import {
  fromGeoPositionToImageUrl,
  fromGeoPositionToOffsetInImage,
} from "utils/calculate"

const OnePage: NextPage = () => {
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
          <section
            style={{
              backgroundImage: `url(${fromGeoPositionToImageUrl({
                position,
                z: 18,
              })})`,
              height: 256,
              left: "calc(50dvw - 128px)",
              position: "fixed",
              top: "calc(50dvh - 128px)",
              width: 256,
            }}
          >
            <div
              style={{
                backgroundColor: "blue",
                border: "solid 1px white",
                borderRadius: "8px",
                height: "12px",
                left: fromGeoPositionToOffsetInImage({ position, z: 18 }).x,
                position: "absolute",
                top: fromGeoPositionToOffsetInImage({ position, z: 18 }).y,
                width: "12px",
                zIndex: 2,
              }}
            ></div>
          </section>
        )}
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

export default OnePage
