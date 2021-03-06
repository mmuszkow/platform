// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import * as Utils from '../utils/utils.jsx';
import * as Client from '../utils/client.jsx';

export default class LoginLdap extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            serverError: ''
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        var state = {};

        const teamName = this.props.teamName;
        if (!teamName) {
            state.serverError = 'Bad team name';
            this.setState(state);
            return;
        }

        state.serverError = '';
        this.setState(state);

        Client.loginByLdap(teamName, 'unused', 'unused',
            () => {
                const redirect = Utils.getUrlParameter('redirect');
                if (redirect) {
                    window.location.href = decodeURIComponent(redirect);
                } else {
                    window.location.href = '/' + teamName + '/channels/town-square';
                }
            },
            (err) => {
                state.serverError = err.message;
                this.setState(state);
            }
        );
    }
    render() {
        let serverError;
        let errorClass = '';
        if (this.state.serverError) {
            serverError = <label className='control-label'>{this.state.serverError}</label>;
            errorClass = ' has-error';
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className='signup__email-container'>
                    <div className={'form-group' + errorClass}>
                        {serverError}
                    </div>
                    <div className='form-group'>
                        <button
                            type='submit'
                            className='btn btn-primary'
                        >
                            {'Sign in using SSO'}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
LoginLdap.defaultProps = {
};

LoginLdap.propTypes = {
    teamName: React.PropTypes.string.isRequired
};
