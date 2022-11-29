import React, {Component} from 'react';
import MyNavbar from '../../components/navbar/navbar_component';
import CardProfile from '../../components/cardprofile/card_profile'

class MainScreen extends Component {
    render() {
        return (
            <>
                <MyNavbar/>
                <div style={{'marginLeft': '50px', 'marginRight': '50px', 'marginBottom': '100px'}}>
                    <CardProfile/>
                </div>
            </>
        )
    }
}

export default MainScreen;