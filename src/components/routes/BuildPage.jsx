import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import DefaultTemplate from '../ui/Resume/Templates/Default/Default';
import FloatingButton from '../ui/FloatingButton/FloatingButton';
import Drawer from '../ui/Drawer/Drawer';
import ResumeDrawerItems from '../ui/Resume/ResumeDrawerItems/ResumeDrawerItems';
import A4Container from '../ui/Containers/A4Container';

// Utils
import { isObjectEmpty } from '../../utils/utils';

// Actions
import setJsonResume from '../../store/actions/setJsonResume';
import setTogglableJsonResume from '../../store/actions/setTogglableJsonResume';

const mapStateToProps = (state) => ({
    jsonResume: state.resume.jsonResume,
    togglableJsonResume: state.resume.togglableJsonResume,
});

const mapDispatchToProps = (dispatch) => ({
    setJsonResume: (resume) => {
        dispatch(setJsonResume(resume));
    },
    setTogglableJsonResume: (resume) => {
        dispatch(setTogglableJsonResume(resume));
    },
});

class BuildPage extends Component {
    state = {
        drawerOpen: false,
    };

    toggleDrawer = () => {
        this.setState((prevState) => ({
            drawerOpen: !prevState.drawerOpen,
        }));
    };

    render() {
        const { history } = this.props;
        const { togglableJsonResume, jsonResume } = this.props;

        if (!togglableJsonResume || isObjectEmpty(togglableJsonResume)) {
            // if no resume, then return to home
            history.push('/upload');
            return null;
        }
        // console.log(togglableJsonResume);

        return (
            <div style={{ backgroundColor: '#e6f1ef' }}>
                <FloatingButton
                    onClick={this.toggleDrawer}
                />
                <Drawer
                    open={this.state.drawerOpen}
                    onClose={this.toggleDrawer}
                >
                    <ResumeDrawerItems
                        resume={togglableJsonResume}
                        onClose={this.toggleDrawer}
                    />
                </Drawer>
                <A4Container>
                    <DefaultTemplate
                        resume={togglableJsonResume}
                    />
                </A4Container>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildPage);
