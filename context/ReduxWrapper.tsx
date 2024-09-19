"use client"
import { store } from '@hooks/store'
import React from 'react'
import { Provider } from 'react-redux'

export default function ReduxWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
