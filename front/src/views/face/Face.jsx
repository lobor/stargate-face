// import FormChangePassword from 'components/forms/user/changePassword.jsx';
// import EditUser from 'components/forms/user/edit.jsx';
// import ListUser from 'components/user/listUser.jsx';
// // import NewUser from 'components/user/newUser.jsx';


import ListRecognized from './subViews/recognized/ListRecognized';
import ListNotRecognized from './subViews/notRecognized/ListNotRecognized';
import ListCollections from './subViews/collections/ListCollections';
import EditCollection  from './subViews/collections/EditCollection';

class Result extends React.Component {
  constructor(){
    super();

    this.state = {
      redirect: false,
      buttons: [
        {
          title: "Recognized",
          url: '/face',
          component: ListRecognized
        },
        {
          title: "Not recognized",
          url: '/face/notrecognized',
          component: ListNotRecognized
        },
        {
          title: "Collections",
          url: '/face/collections',
          component: ListCollections
        },
        // {
        //   title: "Edit collection",
        //   url: '/face/collections/edit/:id',
        //   component: EditCollection
        // }
      ]
    };
  }

  goTo(redirect){
    this.setState({ redirect: redirect });
  }

	render() {
    if(this.state.redirect){
      return (<ReactRouter.Redirect to={this.state.redirect} />);
    }

    return (
      <div>
        <Ui.Toolbar>
          <Ui.ToolbarGroup style={ { alignItems: "center"} }>
            <Ui.ToolbarTitle text="Face recognition" />
            {this.state.buttons.map((button, i)=>{
              return (
                <ReactRouter.Link key={i} to={button.url} isActive={ (location)=>{return location.pathname === button.url;} }>
                  {
                    ({isActive, location, href, onClick, transition}) => <Ui.FlatButton primary={ isActive } onClick={ onClick } href={ href } key={ i } label={ button.title } />
                  }
                </ReactRouter.Link>
              );
            })}
          </Ui.ToolbarGroup>
        </Ui.Toolbar>
        <div>
          {this.state.buttons.map((button, i)=>{
            return (
              <ReactRouter.Match pattern={ button.url } exactly key={ i } component={ button.component } />
            );
          })}
        </div>
      </div>
    );
	}
}

Result.contextTypes = {
	auth: React.PropTypes.func,
	io: React.PropTypes.object
};

export default Result;
