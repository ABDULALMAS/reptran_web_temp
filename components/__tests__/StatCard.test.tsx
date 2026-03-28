import { render, screen } from '@testing-library/react'
import StatCard from '../StatCard'

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="Test Label" value="100" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('renders delta when provided', () => {
    render(
      <StatCard
        label="Test Label"
        value="100"
        delta={{ value: '+10%', isPositive: true }}
      />
    )
    expect(screen.getByText('+10%')).toBeInTheDocument()
  })

  it('renders positive delta with positive styling', () => {
    render(
      <StatCard
        label="Test Label"
        value="100"
        delta={{ value: '+10%', isPositive: true }}
      />
    )
    const delta = screen.getByText('+10%').closest('div')
    expect(delta).toHaveClass('text-positive')
  })

  it('renders negative delta with negative styling', () => {
    render(
      <StatCard
        label="Test Label"
        value="100"
        delta={{ value: '-5%', isPositive: false }}
      />
    )
    const delta = screen.getByText('-5%').closest('div')
    expect(delta).toHaveClass('text-accent')
  })
})


