import React from 'react'
import {Form, Button, Segment, Header, Message, Icon} from 'semantic-ui-react'
import MyNavbar from '../../components/navbar/navbar_component'
import axios from 'axios'
import {bloodTypeOptions, genderOptions} from "../../utils/appConst";
import {withRouter} from "react-router";

class AddStaff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            birthPlace: '',
            birthDate: '',
            gender: '',
            bloodType: '',
            photo: '',
            village: '',
            street: '',
            district: '',
            province: '',
            dept: '',
            simperIdCard: '',
            title: '',
            phoneNumber: '',
            email: '',
            familyContact: '',
            error: '',
            open: false
        }
        this.AddStaff = this.AddStaff.bind(this)
        this.phone = this.phone.bind(this)
        this.familyContact = this.familyContact.bind(this)
    }

    close = () => this.setState({open: false});

    AddStaff() {
        let body = {
            personalInfo: {
                name: this.state.name,
                birthPlace: this.state.birthPlace,
                birthDate: this.state.birthDate,
                bloodType: this.state.bloodType,
                gender: this.state.gender,
                photo: this.state.photo,
                address: {
                    village: this.state.birthPlace,
                    street: this.state.birthPlace,
                    district: this.state.birthPlace,
                    province: this.state.birthPlace
                }
            },
            contactInfo: {
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                familyContact: this.state.familyContact
            },
            workInfo: {
                dept: this.state.dept,
                simperIdCard: this.state.simperIdCard,
                title: this.state.title
            }
        };
        axios.post(process.env.REACT_APP_WS_URL + '/staff', body,
            {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer "+sessionStorage.getItem('token')
                }
            }).then(res => {
                this.props.history.push({pathname: '/staff'})
            })
            .catch(res => this.setState({error: 'error', open: true}))
    }
    phone(e) {
        const re= /^\d*$/;
        if(re.test(e.target.value)){
            this.setState({phoneNumber: e.target.value})
        }
    }
    familyContact(e) {
        const re= /^\d*$/;
        if(re.test(e.target.value)){
            this.setState({familyContact: e.target.value})
        }
    }
    render() {
        return (
            <>
                <MyNavbar/>
                <div style={{'marginLeft': '50px', 'marginRight': '50px', 'marginBottom': '100px'}}>
                    {(this.state.error === '') ? <div></div> :
                        (this.state.error === 'error') ?
                            <Message negative floating="true">
                                <Message.Header>
                                    <div align="center">Success Add Staff</div>
                                </Message.Header>
                            </Message> :
                            <Message negative floating="true">
                                <Message.Header>
                                    <div align="center">Failed Add Staff</div>
                                </Message.Header>
                            </Message>
                    }
                    <Header as='h2'>
                        <Icon name='user plus'/>
                        <Header.Content style={{boxShadow: 'none'}}>New Staff</Header.Content>
                    </Header>
                    <Segment color='red'>
                        <Form>
                            <Form.Field>
                                <label>Full Name </label>
                                <input placeholder='Full Name' onChange={e => {
                                    this.setState({name: e.target.value})
                                }}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Gender</label>
                                <Form.Select options={genderOptions} value={this.state.gender}
                                             onChange={(e, {name, value}) => {
                                                 this.setState({gender: value})
                                             }}>
                                </Form.Select>
                            </Form.Field>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Birth Place </label>
                                    <input placeholder='Birth Place' onChange={e => {
                                        this.setState({birthPlace: e.target.value})
                                    }}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Birth Date </label>
                                    <input type="date" placeholder="Date" onChange={e => {
                                        this.setState({birthDate: e.target.value})
                                    }}/>
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <label>Blood Type</label>
                                <Form.Select options={bloodTypeOptions} onChange={(e, {name, value}) => {
                                    this.setState({bloodType: value})
                                }}>
                                </Form.Select>
                            </Form.Field>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Village</label>
                                    <input placeholder='Village' onChange={e => {
                                        this.setState({village: e.target.value})
                                    }}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Street</label>
                                    <input placeholder='Street' onChange={e => {
                                        this.setState({street: e.target.value})
                                    }}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>District</label>
                                    <input placeholder='District' onChange={e => {
                                        this.setState({district: e.target.value})
                                    }}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Province</label>
                                    <input placeholder='Province' onChange={e => {
                                        this.setState({province: e.target.value})
                                    }}/>
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Phone Number </label>
                                    <input placeholder='Phone Number' value={this.state.phoneNumber} onChange={this.phone}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Email</label>
                                    <input placeholder='Email' onChange={e => {
                                        this.setState({email: e.target.value})
                                    }}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Family Contact Number</label>
                                    <input placeholder='Family Contact Number' value={this.state.familyContact} onChange={this.familyContact}/>
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Title</label>
                                    <input placeholder='Title' onChange={e => {
                                        this.setState({title: e.target.value})
                                    }}/>
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Department</label>
                                    <input placeholder='Department' onChange={e => {
                                        this.setState({dept: e.target.value})
                                    }}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Simper Id Card</label>
                                    <input placeholder='Simper Id Card' onChange={e => {
                                        this.setState({simperIdCard: e.target.value})
                                    }}/>
                                </Form.Field>
                            </Form.Group>
                            <Button disabled={!this.state.email || !this.state.bloodType || !this.state.name
                            || !this.state.gender || !this.state.birthPlace || !this.state.birthDate || !this.state.province
                            || !this.state.street || !this.state.district || !this.state.village || !this.state.phoneNumber || !this.state.email
                            || !this.state.familyContact || !this.state.title || !this.state.dept || !this.state.simperIdCard} type='submit'
                                    onClick={this.AddStaff}><Icon name='save outline'></Icon> Submit</Button>
                            <Button onClick={() => {this.props.history.goBack();}}>
                                <Icon name='cancel'></Icon> Cancel
                            </Button>
                        </Form>
                    </Segment>
                </div>
            </>
        )
    }
}

export default withRouter(AddStaff);