import React from "react";
import MyNavbar from "../navbar/navbar_component";
import {Header,Icon, Message, Segment, Table, Image, Button} from "semantic-ui-react";
import axios from "axios";
import person from "../../assets/images/person.png"
import DatePicker from "react-date-picker";

class ListAbseni extends React.Component {
  state = {
    filteredProp: [],
    date: new Date(),
    search: "",
    error: true,
  };

  onChange = (date) => {this.setState({date});
    const value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    axios.get(process.env.REACT_APP_WS_URL +"/listAbsensi/?tanggal=" +value,{ 
          headers: { Authorization: "Bearer "+sessionStorage.getItem("token")},
        }).then((res) => {this.setState({filteredProp: res.data, error: false});
      }).catch(this.setState({error: true}))
  };

  getAllListAbsensi = () => {
    axios.get(process.env.REACT_APP_WS_URL + '/listAbsensi', {
          headers: { Authorization: "Bearer "+sessionStorage.getItem("token")},
        }).then((res) => {this.setState({filteredProp: res.data, error: false});
      }).catch(this.setState({error: true}))
  };

  componentDidMount() {
    this.getAllListAbsensi();
  }

  render() {
    const {filteredProp, search} = this.state;
    const filtered = filteredProp.filter((e) =>
      e.employee.personalInfo.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <>
        <MyNavbar />
        <div style={{marginLeft: "50px", marginRight: "50px", marginBottom: "100px",}}>
          <Segment basic>
            <Header as="h2">
              <Icon name="clock" />
              <Header.Content style={{ boxShadow: "none" }}>
                Attendance List
              </Header.Content>
            </Header>
            <Segment color="red">
              <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                <div>
                    <Button onClick={this.getAllListAbsensi} color="google plus">Show All</Button>
                  </div>
                  <div style={{paddingRight: "20px"}}/>
                  <div>
                  <span>Filter By Date : </span>
                    <DatePicker clearIcon={null} format="dd/MM/yyyy" value={this.state.date} onChange={this.onChange}/>
                  </div>
              </div>
              {(this.state.filteredProp.length === 0) 
                ? 
                <Message negative>
                  <Message.Header>
                    <div align="center">
                      {"No Data At "+("0"+this.state.date.getDate()).slice(-2)+"-"+("0"+(this.state.date.getMonth()+1)).slice(-2)+"-"+this.state.date.getFullYear()}
                    </div>
                  </Message.Header>
                </Message>
                : (this.state.error === false)
                ?
                <Table color="red" celled textAlign="left" fixed verticalAlign="middle">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell textAlign="center">photo</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">title</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">Dept</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">Time In</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">Entry Location</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">Time Out</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">Out Location</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">Date</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {filtered.map((c) => {
                      return (
                        <Table.Row key={c.id}>
                          <Table.Cell>
                            <Image src={c.employee.personalInfo.photo === "" ? person : c.employee.personalInfo.photo} size="tiny" centered="true" rounded/>
                          </Table.Cell>
                          <Table.Cell textAlign="center" verticalAlign="middle">{c.employee.personalInfo.name}</Table.Cell>
                          <Table.Cell textAlign="center" verticalAlign="middle">{c.employee.workInfo.title}</Table.Cell>
                          <Table.Cell textAlign="center" verticalAlign="middle">{c.employee.workInfo.dept}</Table.Cell>
                          <Table.Cell textAlign="center" verticalAlign="middle">{c.jamMasuk}</Table.Cell>
                          <Table.Cell textAlign="center" verticalAlign="middle">{c.locationIn}</Table.Cell>
                          <Table.Cell textAlign="center" verticalAlign="middle">{c.jamKeluar === null ? "--" : c.jamKeluar}</Table.Cell>
                          <Table.Cell textAlign="center" verticalAlign="middle">{c.locationOut === null ? "--" : c.locationOut}</Table.Cell>
                          <Table.Cell textAlign="center" verticalAlign="middle">{c.tanggal}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
                    :
                <div class="ui active inverted dimmer" style={{display: "flex",justifyContent: "center",alignContent: "center",height: "500px",}}>
                  <div class="ui text loader">Loading...</div>
                </div>
              }
            </Segment>
          </Segment>
        </div>
      </>
    );
  }
}
export default ListAbseni;