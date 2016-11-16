import Loading from 'components/loading/Loading';
import ButtonDelete from 'components/buttonDelete/ButtonDelete';

import Upload from 'components/upload/Upload';

class NewCollection extends React.Component {
  constructor(...args){
    super(...args);

    this.state = {
      form: {
        name: false
      },
      render: true
    };

    this.submit = this.submit.bind(this);
  };

  handleValue(label, e, value){
    let form = this.state.form;

    form[label] = value;

    this.setState({form: form});
  }

  submit(){
    console.log(this);
  }

  render() {
    return (
      <Loading render={this.state.render}>
        <Ui.TextField hintText="Franck" onChange={this.handleValue.bind(this, 'name')} floatingLabelText="Enter name of model" />
        <Upload ref="upload" />
        <Ui.RaisedButton label={Lang.save} primary={true} style={ {marginTop: '20px', float: 'right'} } onClick={this.submit} />
      </Loading>
    )
  }
}
NewCollection.contextTypes = {
	io: React.PropTypes.object
};

export default NewCollection;
