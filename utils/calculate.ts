export const fromGeoPositionToPoint = ({
  position,
  z,
}: {
  position: GeolocationPosition
  z: number
}): { x: number; y: number; z: number } => {
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
  const { x, y, z } = fromGeoPositionToPoint(props)
  return `https://cyberjapandata.gsi.go.jp/xyz/std/${z}/${Math.floor(
    x / 256
  )}/${Math.floor(y / 256)}.png`
}
