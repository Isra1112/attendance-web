import React from 'react'
import Axios from 'axios';
import MyNavbar from '../../components/navbar/navbar_component'
import {Button, Form, Grid, Header, Icon, Image, Segment, Message} from 'semantic-ui-react'
import {bloodTypeOptions, genderOptions} from "../../utils/appConst";
import person from "../../assets/images/person.png"
import {withRouter} from "react-router";

class DetailStaff extends React.Component {
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
            absen: [],
            edit: true,
            close: true,
            show: ''
        }
        this.phone=this.phone.bind(this)
        this.familyContact=this.familyContact.bind(this)
    }
    dismiss = () => this.setState({close: true})
    getDetailStaff() {
        const {id} = this.props.match.params;
        Axios.get(process.env.REACT_APP_WS_URL + `/staff/?id=${id}`, {
            headers: {
                'Authorization': "Bearer "+sessionStorage.getItem('token')
            }
        }).then(res => {
                let workInfo = res.data.workInfo;
                let personalInfo = res.data.personalInfo;
                let contactInfo = res.data.contactInfo;
                this.setState({
                    data: res.data,
                    name: personalInfo.name,
                    birthPlace: personalInfo.birthPlace,
                    birthDate: personalInfo.birthDate,
                    gender: personalInfo.gender,
                    bloodType: personalInfo.bloodType,
                    photo: personalInfo.photo,
                    village: personalInfo.address.village,
                    street: personalInfo.address.street,
                    district: personalInfo.address.district,
                    province: personalInfo.address.province,
                    dept: workInfo.dept,
                    simperIdCard: workInfo.simperIdCard,
                    title: workInfo.title,
                    phoneNumber: contactInfo.phoneNumber,
                    email: contactInfo.email,
                    familyContact: contactInfo.familyContact,
                })
            });
    }

    updateStaff= () => {
        let body = {
            personalInfo: {
                name: this.state.name,
                birthPlace: this.state.birthPlace,
                birthDate: this.state.birthDate,
                bloodType: this.state.bloodType,
                gender: this.state.gender,
                photo: this.state.photo,
                address: {
                    village: this.state.village,
                    street: this.state.street,
                    district: this.state.district,
                    province: this.state.province
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
        const {id} = this.props.match.params;
        Axios.put(process.env.REACT_APP_WS_URL + `/staff/?id=${id}`, body, {
                headers: {
                    'Authorization': "Bearer "+sessionStorage.getItem('token')
                }
            }).then(() => {this.setState({edit: true, show: 'success', close: false})
        }).catch(() => {this.setState({show: 'error', close: false})})
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

    componentDidMount() {
        this.getDetailStaff()
    }
    render() {
        return (
            <>
                <MyNavbar/>
                <div style={{'marginLeft': '50px', 'marginRight': '50px', 'marginBottom': '100px'}}>
                    <Segment basic>
                        <Header as='h2'>
                            <Icon name='id badge'/>
                            <Header.Content style={{boxShadow: 'none'}}>Staff Detail</Header.Content>
                        </Header>
                        <Segment color='red'>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column textAlign='center' width={4}>
                                        <Image src={this.state.photo === '' ? person : this.state.photo} size='small' wrapped/>
                                    </Grid.Column>
                                    <Grid.Column width={12}>
                                        <Form>
                                            <Form.Field>
                                                <label>Full Name </label>
                                                <input disabled={this.state.edit} value={this.state.name}
                                                       onChange={e => {
                                                           this.setState({name: e.target.value})
                                                       }}/>
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Gender</label>
                                                <Form.Select options={genderOptions} disabled={this.state.edit}
                                                             value={this.state.gender}
                                                             onChange={e => {
                                                                 this.setState({gender: e.target.value})
                                                             }}>
                                                </Form.Select>
                                            </Form.Field>
                                            <Form.Group widths="equal">
                                                <Form.Field>
                                                    <label>Birth Place </label>
                                                    <input disabled={this.state.edit} value={this.state.birthPlace}
                                                           onChange={e => {
                                                               this.setState({birthPlace: e.target.value})
                                                           }}/>
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Birth Date </label>
                                                    <input disabled={this.state.edit} type="date"
                                                           value={this.state.birthDate}
                                                           onChange={e => {
                                                               this.setState({birthDate: e.target.value})
                                                           }}/>
                                                </Form.Field>
                                            </Form.Group>
                                            <Form.Field>
                                                <label>Blood Type</label>
                                                <Form.Select options={bloodTypeOptions} disabled={this.state.edit}
                                                             value={this.state.bloodType}
                                                             onChange={e => {
                                                                 this.setState({bloodType: e.target.value})
                                                             }}>
                                                </Form.Select>
                                            </Form.Field>
                                            <Form.Group widths="equal">
                                                <Form.Field>
                                                    <label>Address</label>
                                                    <input disabled={this.state.edit} value={this.state.village}
                                                           onChange={e => {
                                                               this.setState({village: e.target.value})
                                                           }}/>
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Street</label>
                                                    <input disabled={this.state.edit} value={this.state.street}
                                                           onChange={e => {
                                                               this.setState({street: e.target.value})
                                                           }}/>
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>District</label>
                                                    <input disabled={this.state.edit} value={this.state.district}
                                                           onChange={e => {
                                                               this.setState({district: e.target.value})
                                                           }}/>
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Province</label>
                                                    <input disabled={this.state.edit} value={this.state.province}
                                                           onChange={e => {
                                                               this.setState({province: e.target.value})
                                                           }}/>
                                                </Form.Field>
                                            </Form.Group>
                                            <Form.Group widths="equal">
                                                <Form.Field>
                                                    <label>Phone Number </label>
                                                    <input disabled={this.state.edit} value={this.state.phoneNumber}
                                                           onChange={this.phone}/>
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Email</label>
                                                    <input disabled={this.state.edit} value={this.state.email}
                                                           onChange={e => {
                                                               this.setState({email: e.target.value})
                                                           }}/>
                                                </Form.Field>
                                            </Form.Group>
                                            <Form.Field>
                                                <label>Family Contact Number</label>
                                                <input type="text" disabled={this.state.edit} value={this.state.familyContact}
                                                       onChange={this.familyContact}/>
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Title</label>
                                                <input disabled={this.state.edit} value={this.state.title}
                                                       onChange={e => {
                                                           this.setState({title: e.target.value})
                                                       }}/>
                                            </Form.Field>
                                            <Form.Group widths="equal">
                                                <Form.Field>
                                                    <label>Departement</label>
                                                    <input disabled={this.state.edit} value={this.state.dept}
                                                           onChange={e => {
                                                               this.setState({dept: e.target.value})
                                                           }}/>
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Simper Id Card</label>
                                                    <input disabled={this.state.edit} value={this.state.simperIdCard}
                                                           onChange={e => {
                                                               this.setState({simperIdCard: e.target.value})
                                                           }}/>
                                                </Form.Field>
                                            </Form.Group>
                                            {   
                                                (this.state.show === 'success') ? 
                                                <Message onDismiss={this.dismiss} hidden={this.state.close} color="green">
                                                    <Message.Header>
                                                        <div align="center">Success Update Staff</div>
                                                    </Message.Header>
                                                </Message>
                                                : (this.state.show === 'error') ?
                                                <Message onDismiss={this.dismiss} hidden={this.state.close} color="red">
                                                    <Message.Header>
                                                        <div align="center">Failed Update Staff</div>
                                                    </Message.Header>
                                                </Message>
                                                :''

                                        }
                                        <Button disabled={this.state.edit} type='submit' onClick={this.updateStaff}>Submit</Button>
                                        <Button color='blue' onClick={() => { this.setState({edit: false}) }}>Edit</Button>
                                        </Form>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Segment>
                </div>
            </>
        )
    }
}

export default withRouter(DetailStaff);