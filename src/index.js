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
      <div class="display">
        <div>{this.props.displayValue ? this.props.displayValue : 0}</div>
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


  render() {
    return (
      <div class="app">
            <Display displayValue={this.props.displayValue}/>
            <div class="button-panel">
                <div>
                    {this.renderButton('AC')}
                    <div class="button"><button>+/-</button></div>
                    <div class="button"><button>%</button></div>
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
                    <div class="button  wide"><button>0</button></div>
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
      displayValue: '',
      factor: '',
      operator: ''
    };
  }

  operatorSelector(i) {
    let symbol;
    switch(i) {
      case 'AC':
        this.setState({
          displayValue: '',
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
        if(this.state.operator != null && this.state.operator !== '='){
          this.doTheMath(this.state.displayValue, this.state.factor, this.state.operator)
        } else {
          this.setState({
            displayValue: this.state.displayValue,
          });
        }
        break;
      case '.':
        console.log(this.state)
        break;
      default:
        // add default code
    }
    this.setState({
      operator: symbol,
    });
  }
  
  doTheMath(x, y, operator) {
    var calc = {
      '+': function (x, y) { return x + y },
      '-': function (x, y) { return x - y },
      '*': function (x, y) { return x * y },
      '/': function (x, y) { return x / y }
    }
    this.setState({
      displayValue: calc[operator](x, y),
    });
    console.log(this.state)
  }

  handleClick(i) {
    let currentValue = this.state.displayValue;
    if(Number.isInteger(i)) {
      if(!this.state.operator) {
        this.setState({
          displayValue: currentValue + '' + i,
        });
      } else {
        this.setState({
          factor: i,
        });
      }
    } else {
      this.operatorSelector(i, currentValue)
    }
  }

  render() {
    return (
      <div className="calculator">
        <div id="root">
          <Panel 
            onClick={(i) => this.handleClick(i)}
            displayValue={this.state.displayValue}/>
        </div>
      </div>
    );
  }
}
ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);