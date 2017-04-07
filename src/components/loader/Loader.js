import React, {Component, PropTypes} from 'react';
import {Animated, ART} from 'react-native';
const { Surface } = ART;

import Bar from './loaderAnimated';

export default class Loader extends Component{

  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    spaceBetween: PropTypes.number
  };

  static defaultProps = {
    spaceBetween: 12,
    size: 20,
    color: '#000'
  };

  state = {
    bars: [
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size)
    ]
  };

  componentDidMount() {
    this.state.bars.forEach((val, index) => {
      const timer = setTimeout(() => this.animate(index), index * 240);
      this.timers.push(timer);
    });
  }

  componentWillUnmount() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.unmounted = true;
  }

  timers = [];

  animate(index) {
    Animated
      .sequence([
        Animated.timing(this.state.bars[index], {
          toValue: this.props.size * 2.5,
          duration: 300
        }),
        Animated.timing(this.state.bars[index], {
          toValue: this.props.size,
          duration: 300
        })
      ])
      .start(() => {
        if (!this.unmounted) {
          this.animate(index);
        }
      });
  }

  renderBar(index) {
    const { size, spaceBetween, color } = this.props;
    const width = size / 18;
    const x = width / 2 + (width + spaceBetween) * index;

    return (<Bar
      fill={color}
      width={width}
      height={this.state.bars[index]}
      originY={0.5 * size}
      originX={0.5}
      y={size * 1.5}
      x={x}
    />);
  }

  render() {
    const { size, spaceBetween } = this.props;
    const width = size / 3 * 5 + spaceBetween * 1;
    const height = size * 2;

    return (<Surface width={width} height={height}>
      {this.renderBar(0)}
      {this.renderBar(1)}
      {this.renderBar(2)}
      {this.renderBar(3)}
      {this.renderBar(4)}
    </Surface>);
  }
}