import Loading from 'components/loading/Loading';

class Attribute extends React.Component {
	constructor(...args) {
		super(...args);

		this.state = {
			open: this.props.open,
			render: false,
			form: {},
			dataSource: [],
		}

		this.handleClose = this.handleClose.bind(this);
		this.submit = this.submit.bind(this);
		this.handleValue = this.handleValue.bind(this);
	}

	componentWillReceiveProps(props){
		this.setState({
			open: (!props.open || !this.state.open) ? true : false
		})
	}

	componentWillMount(){
		this.context.io.run('fr:collections:get', {}, (data)=>{
			this.setState({
				render: true,
				dataSource: data || []
			})
		});
	}

	handleClose(){
		this.setState({open: !this.state.open});
	}

	handleValue(value){
		this.setState({
			form: {collection: value, recognize: this.props.data}
		})
	}

	submit(){
		this.setState({
			render: false
		});
		this.context.io.run('fr:notRecognize:moveToCollections', this.state.form, (data)=>{
			this.setState({
				render: true
			});

			this.handleClose();
		});
	}

	render() {
		const actions = [
      <Ui.FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <Ui.FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submit}
      />,
    ];

		return (
			<Ui.Dialog title="Attribute" actions={actions} modal={false} onRequestClose={this.handleClose} open={this.state.open} >
				<Loading render={this.state.render}>
					<Ui.AutoComplete
	          hintText="Name of collection"
						floatingLabelText="Attribute on a collections"
	          dataSource={this.state.dataSource}
						dataSourceConfig={ {text: 'name', value: 'id'} }
						onNewRequest={this.handleValue}
	        />
				</Loading>
			</Ui.Dialog>
		);
	}
}

Attribute.contextTypes = {
	io: React.PropTypes.object
};

export default Attribute;
