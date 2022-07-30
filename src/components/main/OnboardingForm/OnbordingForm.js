import React, {
    Component
    // ,Fragment
} from "react";
import { Snackbar, Alert, Card, CardContent, Typography, CardActions, Button, TextField } from '@mui/material';

import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import Logo from './../../assets/images/favicon.png';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckIcon from '@mui/icons-material/Check';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: [1, 0, 0, 0],
            stepCount: [1, 0, 0, 0],
            formData: { mySelf: 1 },
            snackBar: false,
            vertical: 'bottom',
            horizontal: 'right',
            alert: '',
            alertMessage: '',
        }
    }

    handleChange = async (e) => {
        // console.log(e.target.value);
        // console.log(e.target.name);
        const name = e.target.name;
        const value = e.target.value;
        const formData = this.state.formData;
        formData[name] = value;
        await this.setState({
            formData: formData,
        });
        if (value != "") {
            var element = document.getElementById(name);
            element.classList.remove("is-invalid");
            console.log(this.state.formData);
        } else {
            var element = document.getElementById(name);
            element.classList.add("is-invalid");
        }
    }

    handleMyself = async (index, e) => {
        console.log(index);
        const formData = this.state.formData;
        formData['mySelf'] = index;
       await this.setState({
            formData : formData
        });
    }

    changeNextField = async (index, e) => {
        const formData = this.state.formData;
        if (index == 1) {
            if (formData['fullName'] != null && formData['fullName'] != "" && formData['displayName'] != null && formData['displayName'] != "") {
                await this.setState({
                    active: [0, 1, 0, 0],
                    stepCount: [1, 1, 0, 0],
                })
            } else {
                console.log(formData);
                if (formData['fullName'] == null) {
                    var element = document.getElementById("fullName");
                    element.classList.add("is-invalid");
                } else {
                    var element = document.getElementById("displayName");
                    element.classList.add("is-invalid");
                }
            }
        }

        if (index == 2) {
            if (formData['workspaceName'] != null && formData['workspaceName'] != "" && formData['workspaceURL'] != null && formData['workspaceURL'] != "") {
                await this.setState({
                    active: [0, 0, 1, 0],
                    stepCount: [1, 1, 1, 0],
                })
            } else {
                console.log(formData);
                if (formData['workspaceName'] == null) {
                    var element = document.getElementById("workspaceName");
                    element.classList.add("is-invalid");
                } else {
                    var element = document.getElementById("workspaceURL");
                    element.classList.add("is-invalid");
                }
            }
        }

        if(index == 3){
            await this.setState({
                active: [0, 0, 0, 1],
                stepCount: [1, 1, 1, 1],
            })
        }

        if(index == 4){
            await this.setState({
                alert:'success',
                alertMessage:'Successfully Registered!!',
                snackBar: true
            })
        }
    }

    changePrevField = async (index, e) => {
        console.log(index);
        const formData = this.state.formData;
        if(index == 1){
            await this.setState({
                active: [1, 0, 0, 0],
                stepCount: [1, 0, 0, 0],
            })
        }
        if(index ==2 ){
            if( formData['fullName'] != "" && formData['fullName'] != null && formData['displayName'] != null&& formData['displayName'] != ''){
                await this.setState({
                    stepCount: [1, 1, 0, 0],
                    active: [0, 1, 0, 0],
                })
            }else{
                await this.setState({
                    alert:'error',
                    alertMessage:'First complete previous steps',
                    snackBar: true
                })
            }
         
        }

        if(index ==3 ){
            if( formData['workspaceName'] != null &&formData['workspaceName'] != "" && formData['workspaceURL'] != "" &&  formData['workspaceURL'] != null && formData['fullName'] != null  && formData['fullName'] != "" && formData['displayName'] != null && formData['displayName'] != ""){
                await this.setState({
                    stepCount: [1, 1, 1, 0],
                    active: [0, 0, 1, 0],
                })
            }else{
                await this.setState({
                    alert:'error',
                    alertMessage:'First complete previous steps',
                    snackBar: true
                })
            }  
        }
    }

    componentDidMount() {
        console.log(this.state.active);
    }

    handleCloseSnackBar = async () => {
        await this.setState({
            snackBar: false,
        })
    }

    render() {
        const { vertical, horizontal } = this.state;
        return (
            <div className="container-fluid" id="grad1">
                <div className="row justify-content-center mt-0">
                    <div className="col-11 col-sm-9 col-md-7 col-lg-6 text-center p-0 mt-3 mb-2">
                        <div className="card px-0 pt-4 pb-0 mt-3 mb-3" style={{ border: '0px solid white' }}>
                            <h2> <img className="logo" src={Logo} /> <strong>Eden</strong></h2>
                            <div className="row mt-5" >
                                <div className="col-md-12 mx-0">
                                <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={this.state.snackBar}
                        autoHideDuration={3000}
                        onClose={this.handleCloseSnackBar}
                        key={vertical + horizontal}
                    >
                        <Alert onClose={this.handleCloseSnackBar} severity={this.state.alert} sx={{ width: '100%' }}>
                            {this.state.alertMessage}
                        </Alert>
                    </Snackbar>
                                    <form id="msform" >

                                        <ul id="progressbar" >
                                            <li onClick={(e) => {this.changePrevField(1, e)}} className={this.state.stepCount[0] == 1 ? 'active' : ""} id="account"></li>
                                            <li onClick={(e) => {this.changePrevField(2, e)}} className={this.state.stepCount[1] == 1 ? 'active' : ""} id="personal"></li>
                                            <li onClick={(e) => {this.changePrevField(3, e)}} className={this.state.stepCount[2] == 1 ? 'active' : ""} id="payment"></li>
                                            <li className={this.state.stepCount[3] == 1 ? 'active' : ""} id="confirm"></li>
                                        </ul>


                                        {this.state.active[0] == 1 &&
                                            <fieldset>
                                                <div className="form1 mt-4">
                                                    <div className="heading1" >
                                                        <h2>Welcome! First things first...</h2>
                                                        <h6 className="smallHeading1">You can always change them later.</h6>
                                                    </div>

                                                    <div className="mainContent1">
                                                        <div className="row mt-5 alignLeft">

                                                            <div className="col-sm-12 ">
                                                                <div className="form-group">
                                                                    <label htmlFor="fullName">Full Name</label>
                                                                    <input type="text" onChange={(e) => { this.handleChange(e) }} name="fullName" value={this.state.formData['fullName'] || ""} className="form-control mt-2 " id="fullName" placeholder="Steve Jobs" required />

                                                                </div>
                                                            </div>

                                                            <div className="col-sm-12 mt-4 ">
                                                                <div className="form-group">
                                                                    <label htmlFor="displayName">Display Name</label>
                                                                    <input type="text" onChange={(e) => { this.handleChange(e) }} name="displayName" value={this.state.formData['displayName'] || ""} className="form-control mt-2" id="displayName" placeholder="Steve" required />

                                                                </div>
                                                            </div>

                                                            <div className="col-sm-12 mt-4 ">
                                                                <Button size="large" onClick={(e) => this.changeNextField(1, e)} variant="contained" style={{ background: '#664de5', width: '100%', fontSize: '13px', height: '112%', textTransform: 'none' }} >
                                                                    <span> Create Workspace</span>
                                                                </Button>
                                                            </div>


                                                        </div>
                                                    </div>

                                                </div>

                                            </fieldset>
                                        }
                                        {this.state.active[1] == 1 &&
                                            <fieldset>
                                                <div className="form2 mt-4">
                                                    <div className="heading1" >
                                                        <h2>Let's setup a home for all your work</h2>
                                                        <h6 className="smallHeading1">You can always change them later.</h6>
                                                    </div>

                                                    <div className="mainContent2">
                                                        <div className="row mt-5 alignLeft">

                                                            <div className="col-sm-12 ">
                                                                <div className="form-group">
                                                                    <label htmlFor="workspaceName">Workspace Name</label>
                                                                    <input type="text" onChange={(e) => { this.handleChange(e) }} name="workspaceName" value={this.state.formData['workspaceName'] || ""} className="form-control mt-2 " id="workspaceName" placeholder="Eden" required />
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-12 mt-4 ">
                                                                <label htmlFor="workspaceURL">Workspace URL <span className="smallHeading1">(optional)</span></label>
                                                                <div className="input-group mt-2">

                                                                    <div class="input-group-prepend">
                                                                        <span className="input-group-text smallHeading1" style={{ borderRadius: '0.375rem 0px 0px 0.375rem' }} id="workspaceURL2"> www.eden.com/</span>
                                                                    </div>
                                                                    <input type="text" onChange={(e) => { this.handleChange(e) }} name="workspaceURL" value={this.state.formData['workspaceURL'] || ""} className="form-control" id="workspaceURL" placeholder="Example" style={{ borderRadius: '0px 0.375rem 0.375rem 0px !important' }} required />

                                                                </div>
                                                            </div>

                                                            <div className="col-sm-12 mt-4 ">
                                                                <Button size="large" onClick={(e) => this.changeNextField(2, e)} variant="contained" style={{ background: '#664de5', width: '100%', fontSize: '13px', height: '112%', textTransform: 'none' }} >
                                                                    <span> Create Workspace</span>
                                                                </Button>
                                                            </div>


                                                        </div>
                                                    </div>

                                                </div>

                                            </fieldset>
                                        }

                                        {this.state.active[2] == 1 &&
                                            <fieldset>
                                                <div className="form2 mt-4">
                                                    <div className="heading1" >
                                                        <h2>How are you planning to use Eden?</h2>
                                                        <h6 className="smallHeading1">We'll streamline your setup experience accordingly.</h6>
                                                    </div>

                                                    <div className="mainContent2" >
                                                        <div className="row mt-5 alignLeft">
                                                            <div className="col-sm-6 mb-4">


                                                                {this.state.formData['mySelf'] == 1 ?
                                                                    <Card className="mainContent3 hover" onClick={(e) => { this.handleMyself(1, e) }} style={{ border: '2px solid #674ee5' }}>
                                                                        <CardContent>
                                                                            <PersonIcon style={{ marginBottom: '13px' }} />
                                                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                                                For myself
                                                                            </Typography>
                                                                            <Typography variant="body2" style={{ color: '#99a2b3' }}>
                                                                                Write better. Think more clearly. Stay organized.
                                                                            </Typography>
                                                                        </CardContent>
                                                                    </Card> :
                                                                    <Card className="mainContent3 hover "  onClick={(e) => { this.handleMyself(1, e) }}>
                                                                        <CardContent>
                                                                            <PersonIcon style={{ marginBottom: '13px' }} />
                                                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                                                For myself
                                                                            </Typography>
                                                                            <Typography variant="body2" style={{ color: '#99a2b3' }}>
                                                                                Write better. Think more clearly. Stay organized.
                                                                            </Typography>
                                                                        </CardContent>
                                                                    </Card>
                                                                }
                                                            </div>
                                                            <div className="col-sm-6">
                                                            {this.state.formData['mySelf'] == 0 ? 
                                                            <Card className="mainContent3 hover "  onClick={(e) => { this.handleMyself(0, e) }} style={{ border: '2px solid #674ee5' }}>
                                                            <CardContent>
                                                                <GroupsIcon style={{ marginBottom: '13px' }} />

                                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                                    With my team
                                                                </Typography>
                                                                <Typography variant="body2" style={{ color: '#99a2b3' }}>
                                                                    Wikis, docs, tasks & projects, all in one place.
                                                                </Typography>
                                                            </CardContent>

                                                        </Card>: 
                                                        <Card className="mainContent3 hover "  onClick={(e) => { this.handleMyself(0, e) }}>
                                                                    <CardContent>
                                                                        <GroupsIcon style={{ marginBottom: '13px' }} />

                                                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                                            With my team
                                                                        </Typography>
                                                                        <Typography variant="body2" style={{ color: '#99a2b3' }}>
                                                                            Wikis, docs, tasks & projects, all in one place.
                                                                        </Typography>
                                                                    </CardContent>

                                                                </Card>
                                                        }
                                                                

                                                            </div>



                                                            <div className="col-sm-12 mt-4 mb-5">
                                                                <Button size="large" onClick={(e) => this.changeNextField(3,e)} variant="contained" style={{ background: '#664de5', width: '100%', fontSize: '13px', height: '112%', textTransform: 'none' }} >
                                                                    <span> Create Workspace</span>
                                                                </Button>
                                                            </div>


                                                        </div>
                                                    </div>

                                                </div>

                                            </fieldset>
                                        }

                                        {this.state.active[3] == 1 &&
                                            <fieldset>
                                                <div className="form2 mt-4">
                                                    <div className="mainContent2" >
                                                        <div className="row mt-4 ">

                                                            <div className="col-sm-12 mb-5 ">
                                                                <div>
                                                                    <CheckIcon style={{ height: '70px', width: '70px', background: '#664de5', color: 'white', borderRadius: '50%' }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="heading1" >
                                                        <h2><b> Congratulations, Eren!</b></h2>
                                                        <h6 className="smallHeading1">You have completed onboarding, you can start using Eden!</h6>
                                                    </div>

                                                    <div className="mainContent2" >
                                                        <div className="row mt-4 alignLeft">

                                                            <div className="col-sm-12  ">
                                                                <Button size="large" onClick={(e) => this.changeNextField(4,e)} variant="contained" style={{ background: '#664de5', width: '100%', fontSize: '13px', height: '112%', textTransform: 'none' }} >
                                                                    <span> Launch Eden</span>
                                                                </Button>
                                                            </div>
                                                        </div>

                                                    </div>



                                                </div>

                                            </fieldset>
                                        }





                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default HomePage;

