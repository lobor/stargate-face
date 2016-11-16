import Loading from 'components/loading/Loading';
import ButtonDelete from 'components/buttonDelete/ButtonDelete';

class Collections extends React.Component {
  constructor(...args){
    super(...args);
    this.state = {
      models: [],
      active: false
    };

    this.delete = this.delete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.submit = this.submit.bind(this);
  };

  delete(){
    this.context.io.run('fr:delete', {id:this.props.location.state.id}, (data) => {
      if(data){
        this.context.router.push('config');
      }
    });
  }

  actions() {
    return [
      { label: "Cancel", onClick: this.handleToggle },
      { label: "Delete", onClick: this.delete }
    ];
  }

  handleToggle(){
    this.setState({active: !this.state.active});
  }

  componentWillMount(){
    this.context.io.run('fr:collections:list', {}, (data) => {
      this.setState({models: data, render: true});
    });
  }

  submit(e){
    e.preventDefault();
    this.context.io.run('fr:update', {name: this.props.location.state.id, files: this.refs.upload.state.preview}, (res) => {
      if(res.state){
        this.context.router.push('/config')
      }
    });
  }
  delete(){

  }

  render() {
    return (
      <Loading render={this.state.render}>
        <Ui.Table onRowSelection={this.goToUser}>
          <Ui.TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <Ui.TableRow>
              <Ui.TableHeaderColumn>Model Name</Ui.TableHeaderColumn>
              <Ui.TableHeaderColumn>Number of picture</Ui.TableHeaderColumn>
              <Ui.TableHeaderColumn>
                <ReactRouter.Link to="/face/collections/new">
                  {
                    ({isActive, location, href, onClick, transition}) =>(
                      <Ui.RaisedButton href={href} onClick={onClick} icon={< Ui.FontIcon className = "material-icons" > add < /Ui.FontIcon>}/>
                    )
                  }
                </ReactRouter.Link>
              </Ui.TableHeaderColumn>
            </Ui.TableRow>
          </Ui.TableHeader>
          <Ui.TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.state.models.map((model, i)=>{
              return (
                <Ui.TableRow key={i}>
                  <Ui.TableRowColumn>{model.name}</Ui.TableRowColumn>
                  <Ui.TableRowColumn>{model.nbPortrait}</Ui.TableRowColumn>
                    <Ui.TableRowColumn style={{ display: 'flex', 	alignItems: 'center'}}>
                      <ReactRouter.Link to={"/face/collections/edit/" + model.id}>
  		                  {
  		                    ({isActive, location, href, onClick, transition}) =>(
                            <Ui.RaisedButton primary={true} href={href} onClick={onClick} icon={< Ui.FontIcon className = "material-icons" > edit < /Ui.FontIcon>}/>
  												)
  		                  }
  		                </ReactRouter.Link>
  										<ButtonDelete confirmDelete={this.delete.bind(this, i)} />
  									</Ui.TableRowColumn>
                </Ui.TableRow>
              );
            })}
          </Ui.TableBody>
        </Ui.Table>
      </Loading>
    )
  }
}
Collections.contextTypes = {
	io: React.PropTypes.object
};

export default Collections;
