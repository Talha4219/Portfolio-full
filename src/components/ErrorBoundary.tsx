'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-[400px] w-full flex-col items-center justify-center space-y-4 p-8 text-center bg-background/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
                    <div className="p-4 rounded-full bg-destructive/10">
                        <AlertTriangle className="h-10 w-10 text-destructive" />
                    </div>
                    <h2 className="text-2xl font-bold font-headline">Something went wrong.</h2>
                    <p className="text-muted-foreground max-w-md">
                        We've encountered an unexpected error. Please try refreshing the page or navigating back.
                    </p>
                    <Button
                        onClick={() => window.location.reload()}
                        className="rounded-full px-8"
                    >
                        Refresh Page
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
