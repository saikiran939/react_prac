import React from 'react';
import Draggable from 'react-draggable';
import './App.css';

var createReactClass = require('create-react-class');
var Note = createReactClass({
			getInitialState(){
				return {editing:false};
			},

			componentWillMount(){
				this.style = {
					right: this.randomBetween(0, window.innerWidth - 150, 'px'),
					top: this.randomBetween(0, window.innerHeight - 150, 'px')
				}
			},

			randomBetween(x, y, s){

				var pos = (x + Math.ceil(Math.random() * (y - x)));
				console.log(pos)
				return pos + s;
			},

			save(){
				this.props.onChange(this.refs.saveText.value, this.props.id);
				this.setState({editing:false});
			},
			
			edit(){
				this.setState({editing:true});
			},
			
			remove(){
				this.props.onRemove(this.props.id);
				this.setState({editing:false});
			},

			componentDidUpdate(){
				if(this.state.editing){
					this.refs.saveText.focus();
					this.refs.saveText.select();
				}

			},

			shouldComponentUpdate(nextProps, nextState){
				return (this.props.children !== nextProps.children ) || (this.state !== nextState);
			},
			
			renderForm(){
				return (
						<div className="note"
						style={this.style}>
							<textarea ref="saveText" defaultValue={this.props.children}></textarea>
							<button onClick={this.save}>SAVE</button>
						</div>
				)
			},
			
			renderNote(){
				return (	<div className="note" style={this.style}>
								<p>{this.props.children}</p>
								<span> 
									<button onClick={this.edit}>EDIT</button>
									<button onClick={this.remove}>X</button>
								</span>
							</div>
					)
			},

			render(){
				return (<Draggable> 
							{
									(this.state.editing) ? this.renderForm(): this.renderNote()
							} 
						</Draggable>
					   );
			}
		});
export default Note;