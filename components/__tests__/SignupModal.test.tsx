import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SignupModal from '../SignupModal'

// Mock fetch
global.fetch = jest.fn()

describe('SignupModal', () => {
  const mockOnClose = jest.fn()
  const mockOnSuccess = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
    mockOnSuccess.mockClear()
    ;(fetch as jest.Mock).mockClear()
  })

  it('renders modal when isOpen is true', () => {
    render(<SignupModal isOpen={true} onClose={mockOnClose} />)
    expect(screen.getByText(/create your account/i)).toBeInTheDocument()
  })

  it('does not render modal when isOpen is false', () => {
    render(<SignupModal isOpen={false} onClose={mockOnClose} />)
    expect(screen.queryByText(/create your account/i)).not.toBeInTheDocument()
  })

  it('closes modal when close button is clicked', () => {
    render(<SignupModal isOpen={true} onClose={mockOnClose} />)
    const closeButton = screen.getByLabelText(/close modal/i)
    fireEvent.click(closeButton)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('closes modal when Escape key is pressed', () => {
    render(<SignupModal isOpen={true} onClose={mockOnClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('validates email format', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    })

    render(<SignupModal isOpen={true} onClose={mockOnClose} />)
    const emailInput = screen.getByLabelText(/email address/i)
    const submitButton = screen.getByText(/sign up/i)

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid email', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    })

    render(<SignupModal isOpen={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    const emailInput = screen.getByLabelText(/email address/i)
    const submitButton = screen.getByText(/sign up/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@example.com' }),
      })
    })
  })

  it('shows error message on failed submission', async () => {
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    render(<SignupModal isOpen={true} onClose={mockOnClose} />)
    const emailInput = screen.getByLabelText(/email address/i)
    const submitButton = screen.getByText(/sign up/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })
})


