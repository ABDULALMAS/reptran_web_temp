import { render, screen } from '@testing-library/react'
import Testimonial from '../Testimonial'

describe('Testimonial', () => {
  it('renders name, role, and quote', () => {
    render(
      <Testimonial
        name="John Doe"
        role="Software Engineer"
        quote="This is a test quote"
      />
    )
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText(/this is a test quote/i)).toBeInTheDocument()
  })

  it('renders initials when avatar is not provided', () => {
    render(
      <Testimonial
        name="John Doe"
        role="Software Engineer"
        quote="Test quote"
      />
    )
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders avatar when provided', () => {
    render(
      <Testimonial
        name="John Doe"
        role="Software Engineer"
        quote="Test quote"
        avatar="/avatar.jpg"
      />
    )
    const image = screen.getByAltText('John Doe avatar')
    expect(image).toBeInTheDocument()
  })
})


