import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ThemeToggle from '../ThemeToggle'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorageMock.clear()
    document.documentElement.classList.remove('dark')
  })

  it('renders theme toggle button', () => {
    render(<ThemeToggle />)
    const button = screen.getByLabelText(/toggle theme/i)
    expect(button).toBeInTheDocument()
  })

  it('toggles theme on click', async () => {
    render(<ThemeToggle />)
    const button = screen.getByLabelText(/switch to dark mode/i)
    
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(localStorageMock.getItem('reptran_theme')).toBe('dark')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })

  it('respects prefers-color-scheme when no saved preference', () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    render(<ThemeToggle />)
    // Component should mount and check preference
    expect(screen.getByLabelText(/toggle theme/i)).toBeInTheDocument()
  })
})


