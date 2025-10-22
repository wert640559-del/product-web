import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-content">
                        <h2>😵 Terjadi Kesalahan!</h2>
                        <p>Maaf, ada yang tidak beres dengan komponen ini.</p>
                        <details className="error-details">
                            <summary>Detail Teknis (untuk developer)</summary>
                            <p>{this.state.error?.toString()}</p>
                            <pre>{this.state.errorInfo?.componentStack}</pre>
                        </details>
                        <button 
                            onClick={() => window.location.reload()}
                            className="reload-btn"
                        >
                            🔄 Muat Ulang Halaman
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
