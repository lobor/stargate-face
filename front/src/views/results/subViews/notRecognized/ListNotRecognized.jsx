import Loading from 'components/loading/Loading';

class ListRecognized extends React.Component{
  constructor(){
    super();

    this.state = {
      render: false,
      fr: [],
    }
  }

  componentWillMount(){
    this.context.io.run('fr:notRecognition', {}, (data)=>{
      this.setState({ render: true, fr: data })
    });
  }

  render(){
    return (
      <Loading render={this.state.render}>
        <Ui.Table onRowSelection={this.goToUser}>
          <Ui.TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <Ui.TableRow>
              <Ui.TableHeaderColumn>Who</Ui.TableHeaderColumn>
              <Ui.TableHeaderColumn>When</Ui.TableHeaderColumn>
              <Ui.TableHeaderColumn>Prediction</Ui.TableHeaderColumn>
            </Ui.TableRow>
          </Ui.TableHeader>
          <Ui.TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.state.fr.map((user, i)=>{
              let parseDate = new Date(user.date);
              let date = parseDate.getDate() + '/' + (parseDate.getMonth() + 1) + '/' + parseDate.getFullYear() + ' ' + parseDate.getHours() + ':' + parseDate.getMinutes()
              return (
                <Ui.TableRow key={i}>
                  <Ui.TableRowColumn>{user.who}</Ui.TableRowColumn>
                  <Ui.TableRowColumn>{date}</Ui.TableRowColumn>
                  <Ui.TableRowColumn>{user.prediction}</Ui.TableRowColumn>
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
