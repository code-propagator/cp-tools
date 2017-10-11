'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VALIDATION_TYPES = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uuidv4 = require('uuid/v4');

var VALIDATION_TYPES = exports.VALIDATION_TYPES = {
  TYPE_REQUIRED: 'required',
  STRING_REQUIRED: 'Required'
};

var MuiCompInputTextField = function (_Component) {
  (0, _inherits3.default)(MuiCompInputTextField, _Component);

  function MuiCompInputTextField(props) {
    (0, _classCallCheck3.default)(this, MuiCompInputTextField);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MuiCompInputTextField.__proto__ || (0, _getPrototypeOf2.default)(MuiCompInputTextField)).call(this, props));

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

  (0, _createClass3.default)(MuiCompInputTextField, [{
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