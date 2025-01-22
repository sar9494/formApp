import * as React from "react"
export const Logo = () => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={60}
    height={60}
    fill="none"
  >
    <path fill="url(#a)" d="M0 0h60v60H0z" />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#b" transform="scale(.00195)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={512}
        height={512}
      />
    </defs>
  </svg>
  )
}