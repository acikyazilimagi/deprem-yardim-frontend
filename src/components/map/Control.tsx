import L from 'leaflet'
import React from 'react'

interface Props {
  position: L.ControlPosition
  children?: React.ReactNode
  container?: React.HTMLAttributes<HTMLDivElement>
  prepend?: boolean
}

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const Control = (props: Props): JSX.Element => {
  const [portalRoot, setPortalRoot] = React.useState<any>(document.createElement('div'))
  const positionClass = ((props.position && POSITION_CLASSES[props.position]) || POSITION_CLASSES.topright)
  const controlContainerRef = React.createRef<HTMLDivElement>()

  React.useEffect(() => {
    const targetDiv = document.getElementsByClassName(positionClass)
    setPortalRoot(targetDiv[0])
  }, [positionClass])

  React.useEffect(() => {
    if (portalRoot !== null) {
      if (props.prepend !== undefined && props.prepend === true) {
        portalRoot.prepend(controlContainerRef.current)
      } else {
        portalRoot.append(controlContainerRef.current)
      }
    }
  }, [portalRoot, props.prepend, controlContainerRef])

  const className = (props.container?.className?.concat(' ') || '') + 'leaflet-control'
  return (
    <div
      {...props.container}
      ref={controlContainerRef}
      className={className}
    >
      {props.children}
    </div>
  )
}

export default Control
