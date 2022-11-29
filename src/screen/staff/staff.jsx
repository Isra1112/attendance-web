import React, {Component, Fragment} from 'react';
import axios from 'axios'
import {withRouter} from "react-router";
import {Button, Grid, Header, Icon, Segment, Table, Image} from 'semantic-ui-react'
import person from "../../assets/images/person.png"
import MyNavbar from '../../components/navbar/navbar_component';

class StaffScreen extends Component {
    state = {
        data: [],
        error: true,
        search: '', 
        id: '',
    };
    getAllStaff = () => {
        axios.get(process.env.REACT_APP_WS_URL + '/staff', {
            headers: {
                'Authorization': "Bearer "+ sessionStorage.getItem('token')
            }
        }).then(res => {
            this.setState({data: res.data, error: false});
        }).catch(this.setState({error: true}))
    };

    componentDidMount() {
        this.getAllStaff();
    }
    onViewDetail = (id) => {
        this.props.history.push({'pathname': `/staffdetail/${id}`})
    };
    render() {
        const {data} = this.state;
        return (
            <>
                <MyNavbar/>
                <div style={{'marginLeft': '50px', 'marginRight': '50px', 'marginBottom': '100px'}}>
                <Segment basic> 
                <Grid>
                    <Grid.Column floated='left' width={5}>
                        <Header as='h2'>
                            <Icon name='user secret'/>
                            <Header.Content style={{boxShadow: 'none'}}>Staff</Header.Content>
                        </Header>
                    </Grid.Column>
                    <Grid.Column floated='right' textAlign='right' width={5}>
                        <Button onClick={() => {
                            this.props.history.push({'pathname': '/addstaff'})
                        }}><Icon name='plus'></Icon> Add</Button>
                    </Grid.Column>
                </Grid>

                <Fragment>
                    { 
                        <Table celled striped compact color="red">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="center">No</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Photo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Title</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Departemen</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Detail</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {(this.state.error === true) 
                                    ?   
                                    <div className="ui active inverted dimmer" style={{display: "flex",justifyContent: "center",alignContent: "center",height: "500px",}}>
                                        <div className="ui text loader">Loading...</div>
                                    </div>
                                    :  
                                    data.map((data, index) => {
                                        return (<Table.Row key={data.id}>
                                                <Table.Cell textAlign="center" verticalAlign="middle"><h2>{index += 1}</h2></Table.Cell>
                                                <Table.Cell>
                                                <Image src={data.personalInfo.photo === '' ? person : data.personalInfo.photo} centered size="tiny"/>
                                                </Table.Cell>
                                                <Table.Cell textAlign="center" verticalAlign="middle">{data.personalInfo.name}</Table.Cell>
                                                <Table.Cell textAlign="center" verticalAlign="middle">{data.workInfo.title}</Table.Cell>
                                                <Table.Cell textAlign="center" verticalAlign="middle">{data.workInfo.dept}</Table.Cell>
                                                <Table.Cell textAlign="center" verticalAlign="middle">
                                                    <Button style={{'width': '125px'}} onClick={() => {this.onViewDetail(data.id)}}>
                                                    <Icon name='newspaper outline'></Icon> Detail</Button>
                                                    </Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }
                            </Table.Body>
                        </Table>
                    }
                </Fragment>
            </Segment>
            </div>
            </>
        )
    }
}

export default withRouter(StaffScreen);