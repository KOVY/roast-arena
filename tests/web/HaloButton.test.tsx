import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import HaloButton from '../../web/components/ui/HaloButton'

describe('HaloButton', () => {
  it('should render children correctly', () => {
    render(<HaloButton>Click me</HaloButton>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should call onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<HaloButton onClick={handleClick}>Click me</HaloButton>)

    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    const handleClick = vi.fn()
    render(<HaloButton onClick={handleClick} disabled>Click me</HaloButton>)

    const button = screen.getByText('Click me')
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should apply custom className', () => {
    render(<HaloButton className="custom-class">Click me</HaloButton>)
    const button = screen.getByText('Click me')
    expect(button.className).toContain('custom-class')
  })
})
