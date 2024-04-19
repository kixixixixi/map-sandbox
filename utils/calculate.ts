export const fromGeoPositionToPoint = ({
  position,
  z,
}: {
  position: GeolocationPosition
  z: number
}): { x: number; y: number; z?: number } => {
  return {
    x: 2 ** (z + 7) * (position.coords.longitude / 180 + 1),
    y:
      (2 ** (z + 7) / Math.PI) *
      (-Math.atanh(Math.sin((Math.PI / 180) * position.coords.latitude)) +
        Math.atanh(Math.sin((Math.PI / 180) * 85.05112878))),
    z,
  }
}

export const fromGeoPositionToImageUrl = (props: {
  position: GeolocationPosition
  z: number
}): string => {
  return fromPointToUrl(fromGeoPositionToPoint(props))
}

export const fromGeoPositionToOffsetInImage = (props: {
  position: GeolocationPosition
  z: number
}): { x: number; y: number } => {
  const { x, y } = fromGeoPositionToPoint(props)
  return { x: x % 256, y: y % 256 }
}

export const fromPointToUrl = ({
  x,
  y,
  z,
  offsetX,
  offsetY,
}: {
  x: number
  y: number
  z?: number
  offsetX?: number
  offsetY?: number
}): string =>
  `https://cyberjapandata.gsi.go.jp/xyz/std/${z ?? 18}/${Math.floor(
    x / 256 + (offsetX ?? 0)
  )}/${Math.floor(y / 256 + (offsetY ?? 0))}.png`

export const fromGeoPositionToImageUrlList = ({
  height,
  width,
  ...props
}: {
  position: GeolocationPosition
  z: number
  height: number
  width: number
}): string[][] => {
  const { x, y, z } = fromGeoPositionToPoint(props)
  return Array(width)
    .fill(undefined)
    .map((_, i) =>
      Array(height)
        .fill(undefined)
        .map((_, j) =>
          fromPointToUrl({
            x,
            y,
            z,
            offsetX: i - Math.floor(width / 2),
            offsetY: j - Math.floor(height / 2),
          })
        )
    )
}
