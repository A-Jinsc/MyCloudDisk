var React = require('react');
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;

var Captcha = React.createClass({
    mixins: [ReactScriptLoaderMixin],
    getInitialState: function() {
        return {
            scriptLoading: true,
            scriptLoadError: false,
        };
    },

    componentDidMount: function() {
      const sitekey = this.props.sitekey;
      const theme = this.props.theme;
      const type = this.props.type;
      const callback = this.props.callback;
      window.onloadCallback = function() {
        grecaptcha.render('captcha', {
          'sitekey' : sitekey,
          'callback' : callback,
          'theme' : theme,
          'type' : type
        });
      };
    },

    getScriptURL: function() {
        return 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&hl='+this.props.lang+'&render=explicit&rnd=' + Math.random();
    },

    onScriptLoaded: function() {
        this.setState({scriptLoading: false});
    },

    onScriptError: function() {
        this.setState({scriptLoading: false, scriptLoadError: true});
    },

    render: function() {
      if (this.state.scriptLoadError) {
          console.log('loading failed');
      }
      return <div className = 'g-recaptcha' id = 'captcha'></div>;
    }
});

module.exports = Captcha
