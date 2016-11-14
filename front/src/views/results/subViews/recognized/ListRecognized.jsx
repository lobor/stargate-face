import Loading from 'components/loading/Loading';

class ListRecognized extends React.Component{
  constructor(){
    super();

    this.state = {
      render: false,
      fr: [],
      sort: {
        date: false,
        who: false,
        prediction: false
      }
    }
  }

  componentWillMount(){
    this.context.io.run('fr:list', {}, (data)=>{
      this.setState({ render: true, fr: data })
    });
  }

  sort(column){
    let sort = this.state.sort;

    if(false === sort[column]){
      sort[column] = 'asc';
    }
    else if('asc' === sort[column]){
      sort[column] = 'desc';
    }
    else{
      sort[column] = false;
    }


    let result = this.state.fr.sort(function(a, b){
      let dateA = new Date(a[column]).getTime();
      let dateB = new Date(b[column]).getTime();
      if(sort[column] === 'asc'){
        return dateA - dateB;
      }
      else if(sort[column] === 'desc'){
        return dateB - dateA;
      }
      return 0;
    });

    // sort[column] = true;
    this.setState({ fr: result, sort: sort })

  }

  getIcon(column){
    if(this.state.sort[column]){
      return (<Ui.FontIcon className="material-icons">{(this.state.sort[column] === 'desc') ? 'arrow_drop_downward' : 'arrow_drop_upward'}</Ui.FontIcon>);
    }
    return false;
  }

  render(){
    let styleLabel =  {padding: 0};
    let style =   {width: '100%', textAlign: 'left'} ;
    let hoverColor = "white";

    return (
      <Loading render={this.state.render}>
        <Ui.Table onRowSelection={this.goToUser}>
          <Ui.TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <Ui.TableRow>
              <Ui.TableHeaderColumn>
                <Ui.FlatButton label="Who" hoverColor={hoverColor} style={style} labelStyle={styleLabel} />
              </Ui.TableHeaderColumn>
              <Ui.TableHeaderColumn>
                <Ui.FlatButton  onClick={this.sort.bind(this, 'date')} label="When" hoverColor={hoverColor} style={style} labelStyle={styleLabel} labelPosition={(this.state.sort['date']) ? 'after' : 'before' } icon={this.getIcon('date')}  />
              </Ui.TableHeaderColumn>
              <Ui.TableHeaderColumn>
                <Ui.FlatButton label="Prediction" hoverColor={hoverColor} style={style} labelStyle={styleLabel} />
              </Ui.TableHeaderColumn>
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
