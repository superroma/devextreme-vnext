import React from 'react'
import { hello } from '@devextreme-vnext/core'

export interface GreeterProps {
  name: string
}

export const Greeter: React.FC<GreeterProps> = ({ name }) => {
  return <div>{hello(name)}</div>
}

export const version = '0.1.0'
