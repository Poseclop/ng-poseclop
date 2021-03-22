import { AnimationKeyframesSequenceMetadata, AnimationMetadataType, style } from '@angular/animations';


export const bounce: AnimationKeyframesSequenceMetadata = {
  steps: [
    style({
      offset: 0,
      transformOrigin: "center bottom"
    }),
    style({
      animationTimingFunction: "cubic-bezier(.755,.05,.855,.06)",
      transform: "translateZ(0,-30px,0) scaleY(1.1)",
      offset: 0.43
    }),
    style({
      animationTimingFunction: "cubic-bezier(.755,.05,.855,.06)",
      transform: "translate3d(0,-15px,0) scaleY(1.05)",
      offset: 0.7
    }),
    style({
      animationTimingFunction: "cubic-bezier(.215,.61,.355,1)",
      transform: "translateZ(0) scaleY(.95)",
      offset: 0.8
    }),
    style({
      transform: "translate3d(0,-4px,0) scaleY(1.02)",
      offset: 0.9
    }),
    style({
      animationTimingFunction: "cubic-bezier(.215,.61,.355,1)",
      transform: "translateZ(0)",
      offset: 1
    })
  ],
  type: AnimationMetadataType.Keyframes
}

export const rubberBand: AnimationKeyframesSequenceMetadata = {
  steps: [
     style({ transform: "scaleX(1)", offset: 0}),
     style({ transform: "scale3d(1.25,.75,1)", offset: 0.3}),
     style({ transform: "scale3d(.75,1-25,1)", offset: 0.4}),
     style({ transform: "scale3d(1.15,.85,1)", offset: 0.5}),
     style({ transform: "scale3d(.95,1.05,1)", offset: 0.65}),
     style({ transform: "scale3d(1.05,.95,1", offset: 0.75}),
     style({ transform: "scaleX(1)", offset: 1})
  ],
  type: AnimationMetadataType.Keyframes
}

export const flash: AnimationKeyframesSequenceMetadata = {
  steps: [
    style({ offset: 0.75, opacity: 0}),
    style({ offset: 1, opacity: 1})
  ],
  type: AnimationMetadataType.Keyframes
}

export const pulse: AnimationKeyframesSequenceMetadata = {
  steps: [
    style({ offset: 0, transform: "scaleX(1)", animationTimingFunction: "ease-in-out" }),
    style({ offset: 0.5, transform: "scale3d(1.1,1.1,1.1)"}),
    style({ offset: 1, transform: "scaleX(1)"})
  ],
  type: AnimationMetadataType.Keyframes
}

export const shakeX: AnimationKeyframesSequenceMetadata = {
  steps: [
    style({ offset: 0, transform: "translateZ(0)"}),
    style({ offset: 0.8, transform: "translate3d(10px,0,0)"}),
    style({ offset: 0.9, transform: "translate3d(-10px,0,0)"})
  ],
  type: AnimationMetadataType.Keyframes
}
