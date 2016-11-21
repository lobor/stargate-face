import Loading from 'components/loading/Loading';
import ButtonDelete from 'components/buttonDelete/ButtonDelete';

import Upload from 'components/upload/Upload';

class NewCollection extends React.Component {
  constructor(...args){
    super(...args);

    this.state = {
      form: {
        name: false,
        files: []
      },
      render: true,
      redirect: false
    };

    this.submit = this.submit.bind(this);
    this.changeFile = this.changeFile.bind(this);
  };

  handleValue(label, e, value){
    let form = this.state.form;

    form[label] = value;

    this.setState({form: form});
  }

  changeFile(files){
    let form = this.state.form;
    form.files = files;
    this.setState({form: form});
  }

  submit(){
    this.context.io.run('fr:collections:new', this.state.form, (data)=>{
      this.setState({redirect: true});
    });
  }

  render() {
    if(this.state.redirect){
      return (<Redirect to="/face/collections"/>);
    }
    return (
      <Loading render={this.state.render}>
        <Ui.TextField hintText="Franck" onChange={this.handleValue.bind(this, 'name')} floatingLabelText="Enter name of model" />
        <Upload ref="upload" onChange={this.changeFile} />
        <Ui.RaisedButton label={Lang.save} primary={true} style={ {marginTop: '20px', float: 'right'} } onClick={this.submit} />

      </Loading>
    )
  }
}
NewCollection.contextTypes = {
	io: React.PropTypes.object
};

export default NewCollection;
