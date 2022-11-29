import React,{Component} from 'react'
import MyNavbar from '../../components/navbar/navbar_component'
import {Button,Segment,Grid,Image,Icon,Header,Divider,Modal} from 'semantic-ui-react'
import person from "../../assets/images/person.png"
import {withRouter} from "react-router";

class MyProfile extends Component{
    state={
        profile:{},
        personalInfo:{},
        show:false
    }
    logOutHandler= ()=>{
        sessionStorage.clear()
        this.props.history.replace({pathname: '/login'})
    }
    open= ()=> this.setState({show:true})
    close= ()=> this.setState({show:false})
    render(){
        const name = sessionStorage.getItem('name')
        const photo = sessionStorage.getItem('photo')
        const gender = sessionStorage.getItem('gender')
        const birthPlace = sessionStorage.getItem('birthPlace')
        const birthDate = sessionStorage.getItem('birthDate')
        const bloodType = sessionStorage.getItem('bloodType')
        const village = sessionStorage.getItem('village')
        const street = sessionStorage.getItem('street')
        const district = sessionStorage.getItem('district')
        const province = sessionStorage.getItem('province')
        const phoneNumber = sessionStorage.getItem('phoneNumber')
        const email = sessionStorage.getItem('email')
        const dept = sessionStorage.getItem('dept')
        const title = sessionStorage.getItem('title')
        return(
            <>
            <MyNavbar/>
            <div style={{'marginLeft': '50px', 'marginRight': '50px', 'marginBottom': '100px'}}>
                <Segment basic textAlign="right">
                    <Header as='h2'>
                        <Icon name='id badge'/>
                        <Header.Content style={{boxShadow: 'none'}}>My Profile</Header.Content>
                    </Header>
                    <Segment textAlign="left" color="red">
                        <Grid textAlign="left">
                            <Grid.Row>
                                <Grid.Column textAlign='center' width={5}>
                                    <Image src={photo !== null ? photo : person} size='small' wrapped/>
                                    <h3>{name}</h3>
                                </Grid.Column>
                                <Grid.Column width={11}>
                                    <h3><Icon name="user"/>Personal Info</h3>
                                    <Segment>
                                    <div>Blood Type :<h5>{bloodType}</h5></div>
                                    <Divider/>
                                    <div>Gender :<h5>{gender}</h5></div>
                                    <Divider/>
                                    Birth Date and Place :
                                    <div><h5>{birthPlace}</h5></div><div><h5>{birthDate}</h5></div>
                                  <Divider />
                                  <div>Address :<h5>{`${village},  ${street},  ${district},  ${province}`}</h5></div>
                                    </Segment>
                                    <h3><Icon name="address card"/>Contact Info</h3>
                                    <Segment>
                                   <div>PhoneNumber :<h5>{phoneNumber}</h5></div>
                                  <Divider />
                                    <div>Email :<h5>{email}</h5></div>
                                    </Segment>
                                    <h3><Icon name="black tie"/>Work Info</h3>
                                    <Segment>
                                  <div>Title :<h5>{title}</h5></div>
                                  <Divider />
                                  <div>Departmen :<h5>{dept}</h5></div>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                    <Button color="google plus" onClick={this.open}><Icon name='lock'></Icon>Log Out</Button>
                    <Modal open={this.state.show} onClose={this.close} basic size='small'>
                            <Modal.Content/><h2 style={{display:"flex", justifyContent:"center", color:"google plus"}}>Are you sure want to log out?</h2>
                                <Modal.Actions>
                                    <div style={{display:"flex", justifyContent:"space-evenly"}}>
                                    <Button onClick={this.close} color='red' inverted><Icon name='remove' /> No</Button>
                                    <Button onClick={this.logOutHandler} color='green' inverted><Icon name='checkmark' /> Yes</Button>
                                    </div>
                            </Modal.Actions>
                    </Modal>
                </Segment>
            </div>
        </>
        )

    }
}

export default withRouter(MyProfile);