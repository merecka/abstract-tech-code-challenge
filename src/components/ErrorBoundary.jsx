import React, { PureComponent } from 'react';
import { Result } from '@abst/web-components/Result';
import { Loader } from '@abst/loader';
import { withRouter } from 'react-router';
const isDev = process.__CONF.env === 'development';

class _ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { error: null, resetting: false };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }
  reset = () => {
    this.setState({ resetting: true }, () => {
      this.setState({ error: null, }, () => {
        setTimeout(() => this.setState({ resetting: false }), 100);
      });
    });
  }
  render() {
    const { error, resetting } = this.state;
    if (resetting) return <Loader />;
    if (error) {
      return (
        <Result
          error={ isDev ? error : 'Something went wrong' }
          actionButtons={ [{
            label: 'Go Back',
            onClick: () => {
              this.props.history.goBack();
              setTimeout(() => { this.setState({ error: null }); }, 100 );
            },
            icon: 'chevron-left'
          }, {
            label: 'reset',
            onClick: () => this.reset(),
            icon: 'sync',
            bordered: false,
            color: 'warning'
          }, {
            label: 'Reload',
            onClick: () => window.location.reload(),
            icon: 'redo',
            color: 'danger'
          }] }
        />
      );
    }
    return this.props.children;
  }
}

export const ErrorBoundary = withRouter(_ErrorBoundary);
