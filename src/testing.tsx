import { MatcherFunction, render, screen } from '@testing-library/react'
import { Fragment, ReactElement } from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'

export function renderWithRouter(
  component: ReactElement,
  options: Parameters<typeof render>[1] & { route?: string } = {}
) {
  if (options.route !== null) {
    window.history.pushState({}, 'Test page', options.route)
  }

  return render(component, {
    ...options,
    wrapper: ({ children }) => {
      const Wrapper = options?.wrapper ?? Fragment
      return (
        <BrowserRouter>
          <LocationDisplay />
          <Wrapper>{children}</Wrapper>
        </BrowserRouter>
      )
    },
  })
}

export const mockLocation = {
  get: () => screen.getByTestId('location-display').textContent,
}

const LocationDisplay = () => {
  const location = useLocation()

  return <div data-testid="location-display">{location.pathname}</div>
}

export function textContentMatcher(
  textMatch: string | RegExp
): MatcherFunction {
  const hasText =
    typeof textMatch === 'string'
      ? (node: Element) => node.textContent === textMatch
      : (node: Element) => textMatch.test(node.textContent!)

  return (_content, node) => {
    if (node == null || !hasText(node)) {
      return false
    }

    // eslint-disable-next-line testing-library/no-node-access
    const childrenDontHaveText = Array.from(node?.children || []).every(
      (child) => !hasText(child)
    )

    return childrenDontHaveText
  }
}
