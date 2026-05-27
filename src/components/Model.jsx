import { useEffect, useRef, useState } from 'react'
import {Canvas , useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations,Stars} from "@react-three/drei"
import * as THREE from "three"

export default function Model({ audioRef, startAnimation, ...props }) {
  const group = useRef()

  const { scene, animations } = useGLTF('/astro9.glb')
  const { actions, mixer } = useAnimations(animations, group)

  useEffect(() => {
    if (!startAnimation || !actions) return

    const greeting = actions.Intro
    const normal = actions.Normal

    if (greeting) {
      greeting.reset()
      greeting.setLoop(THREE.LoopOnce, 1)
      greeting.clampWhenFinished = true
      greeting.play()

      const onFinished = (e) => {
        if (e.action === greeting) {
          normal?.reset().play()
        }
      }

      mixer.addEventListener('finished', onFinished)

      return () => {
        mixer.removeEventListener('finished', onFinished)
      }
    }
  }, [startAnimation, actions, mixer])

  return (
    <primitive
      ref={group}
      object={scene}
      {...props}
    />
  )
}
