import * as React from 'react'

export function width() {
  return document.body.clientWidth
}

export function height() {
  return window.screen.height
}

export function isMobile() {
  return width() < 768
}

export function isTablet() {
  return width() >= 768 && width() < 1023
}

export function isDesktop() {
  return width() >= 1023
}
