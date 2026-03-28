import { render, screen } from '@testing-library/react'
import ThreeStep from '../ThreeStep'

describe('ThreeStep', () => {
  it('renders three steps with default content', () => {
    render(<ThreeStep />)
    expect(screen.getByText('How RepTran Works')).toBeInTheDocument()
    expect(screen.getByText('Capture')).toBeInTheDocument()
    expect(screen.getByText('Systemize')).toBeInTheDocument()
    expect(screen.getByText('Momentum')).toBeInTheDocument()
  })

  it('renders custom steps when provided', () => {
    const customSteps = [
      {
        title: 'Step 1',
        description: 'Description 1',
        icon: <span>Icon 1</span>,
      },
      {
        title: 'Step 2',
        description: 'Description 2',
        icon: <span>Icon 2</span>,
      },
      {
        title: 'Step 3',
        description: 'Description 3',
        icon: <span>Icon 3</span>,
      },
    ]

    render(<ThreeStep steps={customSteps} />)
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('Step 3')).toBeInTheDocument()
  })
})


