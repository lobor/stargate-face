import Loading from 'components/loading/Loading';
import Lightbox from 'components/Lightbox/Lightbox';
import Attribute from './../../../../components/Attribute/Attribute';

class ListRecognized extends React.Component {
	constructor() {
		super();

		this.state = {
			render: false,
			fr: [],
			popup: {
				open: false,
				data: {}
			}
		}
	}

	getList() {
		this.context.io.run('fr:notRecognition', {}, (data) => {
			this.setState({
				render: true,
				fr: data,
				popup: {
					open: false,
					data: {}
				}
			})
		});
	}

	componentWillMount() {
		this.getList();
	}

	handlePopup(rows) {
		this.setState({
			popup: {
				open: !this.state.popup.open,
				data: this.state.fr[rows]
			}
		})
	}

	delete(index) {
    this.setState({
      render: false
    });

		this.context.io.run('fr:notRecognize:delete', this.state.fr[index], (data) => {
			if (data.success) {
				this.getList();
			} else {
			}
		});
	}

	render() {
		return (
			<Loading render={this.state.render}>
				<Attribute open={this.state.popup.open} data={this.state.popup.data}/>
				<Ui.Table>
					<Ui.TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<Ui.TableRow>
							<Ui.TableHeaderColumn></Ui.TableHeaderColumn>
							<Ui.TableHeaderColumn>Who</Ui.TableHeaderColumn>
							<Ui.TableHeaderColumn>When</Ui.TableHeaderColumn>
							<Ui.TableHeaderColumn>Prediction</Ui.TableHeaderColumn>
							<Ui.TableHeaderColumn>Actions</Ui.TableHeaderColumn>
						</Ui.TableRow>
					</Ui.TableHeader>
					<Ui.TableBody displayRowCheckbox={false} showRowHover={true}>
						{this.state.fr.map((user, i) => {
							let parseDate = new Date(user.date);
							let date = parseDate.getDate() + '/' + (parseDate.getMonth() + 1) + '/' + parseDate.getFullYear() + ' ' + parseDate.getHours() + ':' + parseDate.getMinutes();

							let avatar = (<Ui.Avatar icon={< Ui.FontIcon className = "material-icons" > face < /Ui.FontIcon>} size={30}/>);

							if (user.img) {
								avatar = (<Lightbox src={'/face/img/' + user.img} size={30} style={{
									cursor: 'pointer'
								}}/>)
							}

							return (
								<Ui.TableRow key={i}>
									<Ui.TableRowColumn>
										{avatar}
									</Ui.TableRowColumn>
									<Ui.TableRowColumn>{user.who}</Ui.TableRowColumn>
									<Ui.TableRowColumn>{date}</Ui.TableRowColumn>
									<Ui.TableRowColumn>{user.prediction}</Ui.TableRowColumn>
									<Ui.TableRowColumn style={{
										display: 'flex',
										alignItems: 'center'
									}}>
										<Ui.RaisedButton label="Attribute" primary={true} onClick={this.handlePopup.bind(this, i)}/>
										<Ui.RaisedButton icon={< Ui.FontIcon color = "white" className = "material-icons" > delete < /Ui.FontIcon>} onClick={this.delete.bind(this, i)} backgroundColor={Colors.red800}/>
									</Ui.TableRowColumn>
								</Ui.TableRow>
							);
						})}
					</Ui.TableBody>
				</Ui.Table>
			</Loading>
		);
	}
}

ListRecognized.contextTypes = {
	io: React.PropTypes.object
};

export default ListRecognized;
