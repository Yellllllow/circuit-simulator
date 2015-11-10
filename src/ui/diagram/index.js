import React from 'react';
import Animator from 'react-mainloop';

import CircuitCanvas from './CircuitCanvas.js';
import Updater from '../Updater.js';
import resize from '../Resize.js';

const FPS = 10;
const TIMESTEP = 1000 / FPS;

const animate = new Animator(TIMESTEP);

// Uses `store` from context to manage its own state changes using Animator/Updater
class CircuitDiagram extends React.Component {

  componentWillMount() {
    // TODO make instance var rather than state
    this.setState({
      updater: new Updater(this.context.store)
    });
  }

  shouldComponentUpdate(nextProps) {
    const {width, height} = this.props;
    return width !== nextProps.width
      || height !== nextProps.height;
  }

  render() {
    const updater = this.state.updater,
          AnimatedDiagram = animate(CircuitCanvas, updater.update, updater.begin);

    return (
      <AnimatedDiagram
        {...this.props}
      />
    );
  }
}

CircuitDiagram.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};

CircuitDiagram.contextTypes = {
  store: React.PropTypes.shape({
    getState: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }).isRequired
};

export default resize(CircuitDiagram);