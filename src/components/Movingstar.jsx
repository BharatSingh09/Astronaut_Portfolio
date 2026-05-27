import { useEffect, useRef, useState } from 'react'
import {Canvas , useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations,Stars} from "@react-three/drei"
import * as THREE from "three"


export default function Movingstar({ page }) {
  const starsRef = useRef()

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x = THREE.MathUtils.lerp(
        starsRef.current.rotation.x,
        page * 0.8,
        0.01
      )
    }
  })

  return (
    <group ref={starsRef}>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </group>
  )
}