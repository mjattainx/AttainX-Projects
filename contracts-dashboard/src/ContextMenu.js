import React, {Component, ReactDOM} from 'react'

class ContextMenu extends Component {
    static defaultProps = {
      buttons: []
    };
  
    constructor() {
      super();
      
      this.state = {
        open: false
      };
    }
    
    componentDidMount() {
      document.addEventListener('click', this.handleClickOutside);
      document.addEventListener('contextmenu', this.handleRightClickOutside);
    }
    
    handleClickOutside = (e) => { 
      if (!this.state.open) {
        return;
      }
      
      const root = ReactDOM.findDOMNode(this.div);
      const context = ReactDOM.findDOMNode(this.context);
      const isInRow = (!root.contains(e.target) || root.contains(e.target));
      const isInContext = !context.contains(e.target);
      
      if (isInRow && isInContext) {
        this.setState({
          open: false
        });
      } 
    }
    
    handleRightClickOutside = (e) => {
      if (!this.state.open) {
        return;
      }
  
      const root = ReactDOM.findDOMNode(this.div);
      const isInRow = !root.contains(e.target);
   
      if (isInRow) {
        this.setState({
          open: false
        });
      }
    }
      
    handleRightClick = (e) => {
      e.preventDefault();
    console.log(e.nativeEvent, window.scrollY);
      this.setState({
        open: true,
        top: window.scrollY + e.nativeEvent.clientY,
        left: e.nativeEvent.clientX,
      });
    }
    
    render() {
      return (
        <div
          onContextMenu={this.handleRightClick}
          ref={(node) => this.div = node}
        >
          {this.props.children}
          
          {
            !this.state.open
            ? null
            : <div
                className="context"
                ref={(div) => this.context = div}
                style={{ top: this.state.top, left: this.state.left }}
            >
                <ul>
                  {
                    // button - name, onClick, label
                    this.props.buttons.length > 0 &&
                    this.props.buttons.map((button) => {
                      return <li key={button.label}>
                        <a href="#" onClick={button.onClick}>
                          {button.label}
                        </a>
                      </li>
                    })
                  }
                </ul>
            </div>
          }
        </div>
      );
    }
  }
  
export default ContextMenu;