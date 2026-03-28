import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {
  const mockOnPrimaryClick = jest.fn()

  beforeEach(() => {
    mockOnPrimaryClick.mockClear()
  })

  it('renders header with logo', () => {
    render(<Header />)
    const logo = screen.getByLabelText(/reptran home/i)
    expect(logo).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    render(<Header />)
    expect(screen.getByText('How it works')).toBeInTheDocument()
    expect(screen.getByText('Philosophy')).toBeInTheDocument()
    expect(screen.getByText('Results')).toBeInTheDocument()
  })

  it('calls onPrimaryClick when primary button is clicked', () => {
    render(<Header onPrimaryClick={mockOnPrimaryClick} />)
    const button = screen.getByLabelText(/create account/i)
    fireEvent.click(button)
    expect(mockOnPrimaryClick).toHaveBeenCalledTimes(1)
  })

  it('toggles mobile menu', () => {
    render(<Header />)
    const menuButton = screen.getByLabelText(/toggle menu/i)
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })
})


