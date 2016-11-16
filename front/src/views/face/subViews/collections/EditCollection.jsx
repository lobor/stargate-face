import Loading from 'components/loading/Loading';
import ButtonDelete from 'components/buttonDelete/ButtonDelete';

import Upload from 'components/upload/Upload';

class EditCollection extends React.Component {
  constructor(...args){
    super(...args);

    this.state = {
      model: false,
      images: [],
      active: false
    };
  };

  componentWillMount(){
    this.context.io.run('fr:collections:get', {id: this.props.params.id}, (data) => {
      this.setState({model: data, render: true});
    });

    this.context.io.run('fr:collections:get:image', {id: this.props.params.id}, (data) => {
      this.setState({images: data.datas, render: true});
    });
  }

  render() {
    return (
      <Loading render={this.state.render}>
        <h2>
          {this.state.model.name}
        </h2>
        {this.state.images.map((item, i)=>{
          return (
            <Ui.Avatar key={i} src={"/face/img/collection/" + this.state.model.name + '/' + item} size={100} />
          );
        })}

        <Upload />
      </Loading>
    )
  }
}
EditCollection.contextTypes = {
	io: React.PropTypes.object
};

export default EditCollection;
