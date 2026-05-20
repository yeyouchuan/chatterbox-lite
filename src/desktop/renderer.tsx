import { render } from 'preact'

import '../styles.css'

import { DesktopApp } from '../components/desktop-app'

const root = document.getElementById('app')
if (!root) throw new Error('Desktop root element was not found')

render(<DesktopApp />, root)
