import React from 'react'
import { Button, Form, Grid, Header, Segment, Image } from 'semantic-ui-react'
import Axios from 'axios';
import logo from '../../assets/images/images.png'
import { Message } from 'semantic-ui-react'


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userPassword: '',
            logedin: ''
        }
    }

    loginHandle = () => {
        let body = {
            userName: this.state.userName,
            userPassword: this.state.userPassword
        };
        Axios.post(process.env.REACT_APP_WS_URL + '/auth', body,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('name', res.data.adminData.personalInfo.name);
                sessionStorage.setItem('photo',res.data.adminData.personalInfo.photo)
                sessionStorage.setItem('gender',res.data.adminData.personalInfo.gender)
                sessionStorage.setItem('birthPlace',res.data.adminData.personalInfo.birthPlace)
                sessionStorage.setItem('birthDate',res.data.adminData.personalInfo.birthDate)
                sessionStorage.setItem('bloodType',res.data.adminData.personalInfo.bloodType)
                sessionStorage.setItem('village',res.data.adminData.personalInfo.address.village)
                sessionStorage.setItem('street',res.data.adminData.personalInfo.address.street)
                sessionStorage.setItem('district',res.data.adminData.personalInfo.address.district)
                sessionStorage.setItem('province',res.data.adminData.personalInfo.address.province)
                sessionStorage.setItem('phoneNumber',res.data.adminData.contactInfo.phoneNumber)
                sessionStorage.setItem('email',res.data.adminData.contactInfo.email)
                sessionStorage.setItem('familyContact',res.data.adminData.contactInfo.familyContact)
                sessionStorage.setItem('dept',res.data.adminData.workInfo.dept)
                sessionStorage.setItem('simperIdCard',res.data.adminData.workInfo.simperIdCard)
                sessionStorage.setItem('title',res.data.adminData.workInfo.title)
            this.setState({logedin: true});
            this.props.history.push({pathname: '/employee'})
        }).catch(res => {
            this.setState({logedin: 'error'})
        })
    };

    render() {
        return (
            <div>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        {(this.state.logedin === '') ? null : <Message negative size="large" compact floating={true}>
                            <Message.Header>Wrong Username or Password</Message.Header>
                        </Message>}
                        <Header as='h2' color='black' textAlign='center'>
                            <Image src={logo} size="big" />
                            Attendance Management
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username'
                                    onChange={e => {
                                        this.setState({ userName: e.target.value })
                                    }} />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={e => {
                                        this.setState({ userPassword: e.target.value })
                                    }}
                                />
                                <Button color='red' fluid size='large' onClick={this.loginHandle}>
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default LoginForm;