import * as React from "react"

const Calendario = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    xmlSpace="preserve"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M236 230h40v40h-40z" />
    <path d="M452 40h-24V0h-40v40H124V0H84v40H60C26.916 40 0 66.916 0 100v352c0 33.084 26.916 60 60 60h205.762a176.385 176.385 0 0 1-35.663-40H60c-11.028 0-20-8.972-20-20V188h432v42.099a176.43 176.43 0 0 1 40 35.663V100c0-33.084-26.916-60-60-60zm20 108H40v-48c0-11.028 8.972-20 20-20h24v40h40V80h264v40h40V80h24c11.028 0 20 8.972 20 20v48z" />
    <path d="M377 242c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135-60.561-135-135-135zm0 230c-52.383 0-95-42.617-95-95s42.617-95 95-95 95 42.617 95 95-42.617 95-95 95z" />
    <path d="M396 310h-40v87h74v-40h-34zM156 310h40v40h-40zM76 310h40v40H76zM76 230h40v40H76zM76 390h40v40H76zM156 230h40v40h-40zM156 390h40v40h-40z" />
  </svg>
)

export default Calendario