'use strict';

var React = require('react');
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;

var Captcha = React.createClass({
    displayName: 'Captcha',

    mixins: [ReactScriptLoaderMixin],
    getInitialState: function getInitialState() {
        return {
            scriptLoading: true,
            scriptLoadError: false
        };
    },

    componentDidMount: function componentDidMount() {
        var sitekey = this.props.sitekey;
        var theme = this.props.theme;
        var type = this.props.type;
        var callback = this.props.callback;
        window.onloadCallback = function () {
            grecaptcha.render('captcha', {
                'sitekey': sitekey,
                'callback': callback,
                'theme': theme,
                'type': type
            });
        };
    },

    getScriptURL: function getScriptURL() {
        return 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&hl=' + this.props.lang + '&render=explicit&rnd=' + Math.random();
    },

    onScriptLoaded: function onScriptLoaded() {
        this.setState({ scriptLoading: false });
    },

    onScriptError: function onScriptError() {
        this.setState({ scriptLoading: false, scriptLoadError: true });
    },

    render: function render() {
        if (this.state.scriptLoadError) {
            console.log('loading failed');
        }
        return React.createElement('div', { className: 'g-recaptcha', id: 'captcha' });
    }
});

module.exports = Captcha;
