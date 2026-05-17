import React, { ReactNode, Component, ErrorInfo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { logger } from '../utils/logger';
import { THEME } from '../theme';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('React Error Boundary caught an error', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>⚠️ Something went wrong</Text>
            <Text style={styles.subtitle}>The app encountered an unexpected error</Text>

            {__DEV__ && (
              <>
                <View style={styles.errorBox}>
                  <Text style={styles.errorTitle}>Error Details:</Text>
                  <Text style={styles.errorText}>{this.state.error?.message}</Text>
                </View>

                {this.state.errorInfo && (
                  <View style={styles.stackBox}>
                    <Text style={styles.stackTitle}>Stack Trace:</Text>
                    <Text style={styles.stackText}>
                      {this.state.errorInfo.componentStack}
                    </Text>
                  </View>
                )}
              </>
            )}

            <Pressable onPress={this.resetError} style={styles.button}>
              <Text style={styles.buttonText}>Retry</Text>
            </Pressable>
          </ScrollView>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: THEME.neonPink,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    color: THEME.text,
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  errorBox: {
    backgroundColor: 'rgba(255, 46, 209, 0.1)',
    borderLeftColor: THEME.neonPink,
    borderLeftWidth: 4,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  errorTitle: {
    color: THEME.neonPink,
    fontWeight: '700',
    marginBottom: 8,
  },
  errorText: {
    color: THEME.text,
    fontSize: 12,
    fontFamily: 'monospace',
  },
  stackBox: {
    backgroundColor: 'rgba(0, 240, 255, 0.05)',
    borderLeftColor: THEME.neonCyan,
    borderLeftWidth: 4,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  stackTitle: {
    color: THEME.neonCyan,
    fontWeight: '700',
    marginBottom: 8,
  },
  stackText: {
    color: '#999',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: THEME.neonPink,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
