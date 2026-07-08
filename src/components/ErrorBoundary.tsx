import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error('ChartWidget failed to load:', error)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div
          style={{
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            border: '1px dashed #eee',
            borderRadius: '8px',
          }}
        >
          <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
            Failed to load chart
          </p>
          <button
            onClick={this.handleRetry}
            style={{ fontSize: '13px', cursor: 'pointer' }}
          >
            Retry
          </button>
        </div>
      )
    }

    return this.props.children
  }
}