import React from 'react';
import logo from './logo.svg';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getServices,getProviders } from './redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Provider from './Provider';
import './App.css';

class App extends React.Component{
   
  state={
    servicesList:[],
    isOpenProvider:false
  }

  componentDidMount(){
    this.props
    .getServices()
    .then(response => {
      const servicesList= this.props.service;
      this.setState({servicesList});
    });

    this.props
    .getProviders()
    .then(response => {    
      const providerList= this.props.provider;
      this.setState({providerList});
    });
  }

  handleProviderDetail = (provider,e) => {
    e.preventDefault();
    console.log(provider);
    this.setState({providerData:provider.attributes,isOpenProvider:true})
  }


render(){
  const {servicesList,providerList,isOpenProvider,providerData}= this.state;
  return (
    <div className="App">
     
        <section>
          <div> Control </div>
      <TableContainer component={Paper}>
        <Table className="" aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>type</TableCell>
              <TableCell>name</TableCell>
              <TableCell>link</TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
            {servicesList && servicesList.map(row => (
              <TableRow key={row.id}>
                 <TableCell component="th" scope="row"  style={{'cursor': 'pointer'}}>
                  {row.type}
                </TableCell>      
                <TableCell component="th" scope="row"  style={{'cursor': 'pointer'}}>
                  {row.attributes.name}
                </TableCell>     
                <TableCell component="th" scope="row"  style={{'cursor': 'pointer'}}>
                  <a href={row.links.self}>{row.links.self}</a>
                </TableCell>                  
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </section>
      <br></br>
      <section>
      <div> Result </div>
      <TableContainer component={Paper}>
        <Table className="" aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>type</TableCell>
              <TableCell>name</TableCell>
              <TableCell>link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {providerList && providerList.map(row => (
              <TableRow key={row.id}>
                 <TableCell component="th" scope="row"  style={{'cursor': 'pointer'}} onClick={e => this.handleProviderDetail(row,e)}>
                  {row.type}
                </TableCell>      
                <TableCell component="th" scope="row"  style={{'cursor': 'pointer'}} onClick={e => this.handleProviderDetail(row,e)}>
                  {row.attributes.name}
                </TableCell>     
                <TableCell component="th" scope="row"  style={{'cursor': 'pointer'}}>
                <a href={row.links.self}>{row.links.self}</a>
                </TableCell>            
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
   
      </section>
      {isOpenProvider ? <Provider image={providerData['profile-image']} name={providerData.name} subspecialties={providerData.subspecialties}/> :null}
    </div>
  );
}
}



const mapStateToProps = state => {
  return {
    service: state.Service.service,
    provider: state.Service.provider
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getServices,getProviders },
    dispatch
  );
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
