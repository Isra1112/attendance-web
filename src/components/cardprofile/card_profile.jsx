import React, {Fragment} from 'react';
import axios from 'axios'
import logoQr from '../../assets/images/images.png'
import './cardProfile.css';
import Popup from "reactjs-popup";
import person from "../../assets/images/person.png"
import {QRCode} from 'react-qrcode-logo';
import {Button, Grid, Header, Icon, Segment, Table, Image} from 'semantic-ui-react'
import {withRouter} from "react-router";


class CardProfile extends React.Component {
    state = {
        data: [],
        error: true,
        search: '', 
        id: '',
    };

    getAllEmployee = () => {
        axios.get(process.env.REACT_APP_WS_URL + '/employee', {
            headers: {
                'Authorization': "Bearer "+ sessionStorage.getItem('token')
            }
        }).then(res => {
            this.setState({data: res.data, error: false});
        }).catch(this.setState({error: true}))
    };

    componentDidMount() {
        this.getAllEmployee();
    }

    onViewDetail = (id) => {
        this.props.history.push({'pathname': `/employeedetail/${id}`})
    };

    render() {
        const {data} = this.state;
        return (
            <Segment basic>
                <Grid>
                    <Grid.Column floated='left' width={5}>
                        <Header as='h2'>
                            <Icon name='user circle'/>
                            <Header.Content style={{boxShadow: 'none'}}>Employee</Header.Content>
                        </Header>
                    </Grid.Column>
                    <Grid.Column floated='right' textAlign='right' width={5}>
                        <Button onClick={() => {
                            this.props.history.push({'pathname': '/addemployee'})
                        }}><Icon name='plus'></Icon> Add</Button>
                    </Grid.Column>
                </Grid>

                <Fragment>
                    { (this.state.error === true) 
                        ?
                        <div className="ui active inverted dimmer" style={{display: "flex",justifyContent: "center",alignContent: "center",height: "500px"}}>
                            <div className="ui text loader">Loading...</div>
                        </div>
                        :  
                        <Table celled striped compact color="red">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="center">No</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Photo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Title</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Departemen</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">QR</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Detail</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    data.map((data, index) => {
                                        return (<Table.Row key={data.id}>
                                            <Table.Cell textAlign="center" verticalAlign="middle"><h2>{index += 1}</h2></Table.Cell>
                                                <Table.Cell>
                                                    <Image src={data.personalInfo.photo === "" ? person : data.personalInfo.photo} centered size="tiny"/>
                                                </Table.Cell>
                                                <Table.Cell textAlign="center" verticalAlign="middle">{data.personalInfo.name}</Table.Cell>
                                                <Table.Cell textAlign="center" verticalAlign="middle">{data.workInfo.title}</Table.Cell>
                                                <Table.Cell textAlign="center" verticalAlign="middle">{data.workInfo.dept}</Table.Cell>
                                                <Table.Cell textAlign="center" verticalAlign="middle">
                                                    <Popup modal trigger={<Button style={{'width': '125px'}}><Icon
                                                        name='qrcode'></Icon>
                                                        QR</Button>}
                                                           repositionOnResize={true} position="top center">
                                                        <div className="qrpopup">
                                                            <QRCode value={data.workInfo.qrId} logoImage={logoQr}></QRCode>
                                                            <div>QR : {data.workInfo.qrId}</div>
                                                            <div>NFC : {data.workInfo.nfcId}</div>
                                                        </div>
                                                    </Popup>
                                                </Table.Cell>
                                                <Table.Cell textAlign="center" verticalAlign="middle">
                                                    <Button style={{'width': '125px'}} onClick={() => { this.onViewDetail(data.id)}}>
                                                    <Icon name='newspaper outline'></Icon> Detail</Button></Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }
                            </Table.Body>
                        </Table>
                    }
                </Fragment>
            </Segment>
        )
    }
}

export default withRouter(CardProfile);