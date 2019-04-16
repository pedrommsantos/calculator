import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Button extends React.Component {
  render() {
    return (
      <button onClick={() => { this.props.onClick() }}>{this.props.value}</button>
    );
  }
}

class Display extends React.Component {
  render() {
    return (
      <div className="display">
        <div>{this.props.valueToShow ? this.props.valueToShow : 0}</div>
      </div>
    );
  }
}

class Panel extends React.Component {
  renderButton(i) {
    return (
      <div className="button">
        <Button
          value={i}
          onClick={() => this.props.onClick(i)}
        />
      </div>
    );
  }

  renderButtonOperator(i) {
    return (
      <div className="button green">
        <Button
          value={i}
          onClick={() => this.props.onClick(i)}
        />
      </div>
    );
  }

  renderButtonWide(i) {
    return (
      <div className="button wide">
        <Button
          value={i}
          onClick={() => this.props.onClick(i)}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="app">
        <Display valueToShow={this.props.valueToShow}/>
        <div className="button-panel">
          <div>
              {this.renderButton('AC')}
              <div className="button"><button>+/-</button></div>
              <div className="button"><button>%</button></div>
              {this.renderButtonOperator('÷')}
          </div>
          <div>
              {this.renderButton(7)}
              {this.renderButton(8)}
              {this.renderButton(9)}
              {this.renderButtonOperator('x')}
          </div>
          <div>
              {this.renderButton(4)}
              {this.renderButton(5)}
              {this.renderButton(6)}
              {this.renderButtonOperator('-')}
          </div>
          <div>
              {this.renderButton(1)}
              {this.renderButton(2)}
              {this.renderButton(3)}
              {this.renderButtonOperator('+')}
          </div>
          <div>
              {this.renderButtonWide(0)}
              {this.renderButton('.')}
              {this.renderButtonOperator('=')}
          </div>
        </div>
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueToShow: '',
      factorX: '',
      factorY: '',
      operator: '',
      result: ''
    };
  }

  operatorSelector(i) {
    let symbol;
    switch(i) {
      case 'AC':
        this.setState({
          valueToShow: '',
          factorX: '',
          factorY: '',
          operator: '',
          result: ''
        });
        break;
      case 'x':
        symbol = '*'
        break;
      case '+':
        symbol = '+'
        break;
      case '-':
        symbol = '-'
        break;
      case '÷':
        symbol = '/'
        break;
      case '=':
        if(this.state.operator)
          this.doTheMath(+this.state.factorX, +this.state.factorY, this.state.operator)
        break;
      case '.':
        console.log(this.state)
        break;
      default:
        // add default
    }
    if(i === '+' || i === '-' || i === 'x' || i === '÷') {
      this.setState({
        operator: symbol,
      });
    }
  }
  
  doTheMath(x, y, operator) {
    var calc = {
      '+': function (x, y) { return x + y },
      '-': function (x, y) { return x - y },
      '*': function (x, y) { return x * y },
      '/': function (x, y) { return x / y }
    }
    var outcome = calc[operator](x, y);
    this.setState({
      result: outcome,
      factorX: outcome,
      factorY: ''
    });
  }

  handleClick(i) {
    let currentX = this.state.factorX;
    let currentY = this.state.factorY;
    if(Number.isInteger(i)) {
      if(!this.state.factorX) {
        this.setState({
          factorX: currentX + '' + i,
        });
      } else {
        this.setState({
          factorY: currentY + '' + i,
        });
      }
    } else {
      this.operatorSelector(i)
    }
  }

  render() {
    let displayValue;
    if(this.state.factorY) {
      displayValue = this.state.factorY;
    } else if(this.state.result){
      displayValue = this.state.result;
    } else {
      displayValue = this.state.factorX;
    }
    return (
      <div className="calculator">
        <div id="root">
          <Panel 
            onClick={(i) => this.handleClick(i)}
            valueToShow={displayValue}/>
        </div>
      </div>
    );
  }
}
ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);