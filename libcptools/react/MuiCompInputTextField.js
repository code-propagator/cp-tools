'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VALIDATION_TYPES = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var uuidv4 = require('uuid/v4');

var VALIDATION_TYPES = exports.VALIDATION_TYPES = {
  TYPE_REQUIRED: 'required',
  STRING_REQUIRED: 'Required'
};

var MuiCompInputTextField = function (_Component) {
  _inherits(MuiCompInputTextField, _Component);

  function MuiCompInputTextField(props) {
    _classCallCheck(this, MuiCompInputTextField);

    var _this = _possibleConstructorReturn(this, (MuiCompInputTextField.__proto__ || Object.getPrototypeOf(MuiCompInputTextField)).call(this, props));

    _this.state = {
      instanceId: uuidv4(),
      errorText: '', // begin with no error
      value: props.conf.defaultValue
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.checkForRequired = _this.checkForRequired.bind(_this);
    _this.handleOnChange = _this.handleOnChange.bind(_this);
    _this.isValid = _this.isValid.bind(_this);
    return _this;
  }

  _createClass(MuiCompInputTextField, [{
    key: 'checkForRequired',
    value: function checkForRequired(value) {
      // console.log('CHECK REQUIREMET FOR value', value)
      var checked = VALIDATION_TYPES.STRING_REQUIRED;
      if (String(value).length > 0) {
        // Now we have valid value for this requirement.
        checked = ''; // no error
      } else {
        if (!this.props.conf.stringRequired) {
          checked = VALIDATION_TYPES.STRING_REQUIRED;
        } else {
          checked = this.props.conf.stringRequired;
        }
      }
      this.setState({
        errorText: checked,
        value: value
      });
    }
  }, {
    key: 'handleOnChange',
    value: function handleOnChange(value) {
      if (typeof this.props.conf !== 'undefined' && typeof this.props.conf.validationType !== 'undefined' && this.props.conf.validationType === VALIDATION_TYPES.TYPE_REQUIRED) {
        this.checkForRequired(value);
      } else {
        this.setState({
          errorText: '',
          value: value
        });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(event, newValue) {
      // console.log('onChange', newValue)
      // http://www.material-ui.com/#/components/text-field
      this.handleOnChange(newValue);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Excecute input check for the first time
      this.handleOnChange = this.handleOnChange.bind(this);
      this.handleOnChange(this.state.value);
    }
  }, {
    key: 'render',
    value: function render() {
      // console.log('MuiCompInputTextField state', this.state)
      // console.log('MuiCompInputTextField props', this.props)

      return _react2.default.createElement(_TextField2.default, { ref: this.state.instanceId,
        defaultValue: this.props.conf.defaultValue,
        hintText: this.props.conf.hint,
        floatingLabelText: this.props.conf.label,
        type: this.props.type,
        errorText: this.state.errorText,
        onChange: this.onChange.bind(this)
      });
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      return this.state.errorText === '';
    }

    // focus the input

  }], [{
    key: 'focusInputTextField',
    value: function focusInputTextField(ref) {
      // MuiCompInputTextField is obtained as ReactDOM
      var arr = _reactDom2.default.findDOMNode(ref).childNodes;
      if (!arr) {
        return '';
      }

      arr.forEach(function (elem) {
        // console.log(elem.nodeName)
        if (elem.nodeName === 'INPUT') {
          // console.log('FOCUS INPUT', elem.value)
          elem.focus();
        }
      });
    }

    // reads directry from the TextField DOM

  }, {
    key: 'valueOfInputTextField',
    value: function valueOfInputTextField(ref) {
      var arr = _reactDom2.default.findDOMNode(ref).childNodes;
      if (!arr) {
        return '';
      }

      var found = '';

      arr.forEach(function (elem) {
        // console.log(elem.nodeName)
        if (elem.nodeName === 'INPUT') {
          // console.log('INPUT VALUE', elem.value)
          found = elem.value;
        }
      });

      return found;
    }
  }]);

  return MuiCompInputTextField;
}(_react.Component);

exports.default = MuiCompInputTextField;