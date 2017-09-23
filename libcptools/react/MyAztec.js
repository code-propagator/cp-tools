'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Aztec = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactFlexboxGrid = require('react-flexbox-grid');

var _DynamicComponent = require('react-aztec/dist-modules/components/DynamicComponent');

var _filter = require('react-aztec/dist-modules/helpers/filter');

var _mui = require('react-aztec/dist-modules/config/mui');

var _mui2 = _interopRequireDefault(_mui);

var _validation = require('react-aztec/dist-modules/helpers/validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LIBMap = {
  MUI: {
    map: _mui2.default
  }
};
// import { Row, Col } from 'pui-react-grids'


var response = {};

var getFieldValue = function getFieldValue() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var type = args[0].type;
  var value = null;
  switch (type) {
    case 'textfield':
      value = args[2];
      break;
    case 'selectfield':
      value = args[3];
      break;
    case 'toggle':
      value = args[2];
      break;
    case 'autocomplete':
      value = args[1];
      break;
    case 'datepicker':
      value = args[2];
      break;
    case 'timepicker':
      value = args[2];
      break;
    case 'radio':
      value = args[2];
      break;
    case 'checkbox':
      value = args[2];
      break;
    default:
      value = '';
  }
  return value;
};

var getAllMandatoryFields = function getAllMandatoryFields(fields) {
  var mandatoryFields = [];
  _lodash2.default.each(fields, function (field) {
    if (field.rules) {
      var isMandatory = _lodash2.default.find(field.rules.validation, { rule: 'mandatory' });
      if (isMandatory) {
        mandatoryFields.push(field);
      }
    }
  });
  return mandatoryFields;
};

var getInitialValues = function getInitialValues(fields) {
  var data = {};
  _lodash2.default.each(fields, function (field) {
    if (field.props.value === undefined) {
      data[field.id] = '';
    } else {
      data[field.id] = field.props.value;
    }
  });
  return data;
};

var handleData = function handleData(guid) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  var val = getFieldValue.apply(undefined, args);
  response[guid][args[0].id] = val;
};

var updateResponse = function updateResponse(fields, patch, guid) {
  _lodash2.default.each(fields, function (field) {
    if (response[guid][field.id] === '' || response[guid][field.id] === undefined) {
      response[guid][field.id] = field.props.value || field.props.defaultSelected || field.props.defaultChecked || field.props.defaultToggled || field.props.selected || '';
    } else {
      response[guid][field.id] = response[guid][field.id];
    }
    if (patch && patch[field.id] !== undefined) {
      // Patch update data
      response[guid][field.id] = patch[field.id];
    }
  });
};

var getCurrentFormData = function getCurrentFormData(fields, errors, guid) {
  var formData = Object.assign([], fields);
  _lodash2.default.map(formData, function (field) {
    if (field.type === 'selectfield') {
      field.props.selected = response[guid][field.id];
    } else {
      field.props.value = response[guid][field.id];
    }
    var error = _lodash2.default.find(errors, {
      id: field.id
    });
    if (error) {
      field.props.errorText = error.message;
    } else {
      field.props.errorText = '';
    }
  });
  return formData;
};

var getErrors = function getErrors(fields, guid) {
  var mandatoryFields = getAllMandatoryFields(fields);
  var errors = [];
  _lodash2.default.each(mandatoryFields, function (field, index) {
    _lodash2.default.each(field.rules.validation, function (rule) {
      var isClean = _validation2.default[rule.rule](response[guid][field.id].toString(), rule.value);
      if (!isClean) {
        var error = Object.assign({}, rule, {
          id: field.id
        });
        errors.push(error);
      }
    });
  });
  return errors;
};

var handleSubmit = function handleSubmit(callback, data, guid) {
  var fields = data;
  var errors = getErrors(data, guid);
  if (typeof callback === 'function') {
    var currentFormData = getCurrentFormData(fields, errors, guid);
    updateResponse(fields, null, guid);
    callback(response, errors, currentFormData);
  }
};

/** Aztec */
var Aztec = exports.Aztec = function Aztec(props) {
  var config = LIBMap.MUI;
  var data = props.data;
  if (!props.forceUpdate) {
    var errors = [];
    if (props.displayErrors) {
      errors = getErrors(props.data, props.guid);
    }
    response[props.guid] = response[props.guid] || {};
    updateResponse(props.data, props.patch, props.guid);
    data = getCurrentFormData(props.data, errors, props.guid);
  } else {
    response[props.guid] = response[props.guid] || {};
    response[props.guid] = getInitialValues(data);
  }
  var layout = (0, _filter.generateLayout)(data);
  config.modules = props.library;
  // <Col xs={field.layout.xs ? field.layout.xs.col : ''} sm={field.layout.sm ? field.layout.sm.col : ''} md={field.layout.md ? field.layout.md.col : ''} lg={field.layout.lg ? field.layout.lg.col : ''} style={field.style} className={`${field.className} ${(field.visible === false) ? 'hidden' : 'show'}`} key={index}>
  return _react2.default.createElement(
    'div',
    null,
    layout.wrows.map(function (row, i) {
      return _react2.default.createElement(
        _reactFlexboxGrid.Row,
        { key: i },
        row.map(function (field, index) {
          return _react2.default.createElement(
            _reactFlexboxGrid.Col,
            {
              xs: field.layout.xs ? field.layout.xs.col : '',
              sm: field.layout.sm ? field.layout.sm.col : '',
              md: field.layout.md ? field.layout.md.col : '',
              lg: field.layout.lg ? field.layout.lg.col : '',
              style: field.style,
              className: field.className + ' ' + (field.visible === false ? 'hidden' : 'show'),
              key: index },
            _react2.default.createElement(_DynamicComponent.DynamicComponent, {
              component: config.map[field.type].type,
              map: config.map[field.type].map,
              option: config.map[field.type].options ? config.map[field.type].options.type : '',
              control: field,
              library: config.modules,
              attributes: field.props,
              rules: field.rules,
              formatter: field.formatter,
              onChange: function onChange() {
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                  args[_key3] = arguments[_key3];
                }

                handleData.apply(undefined, [props.guid].concat(args));
                if (typeof props.onChange === 'function') {
                  props.onChange.apply(props, args);
                }
              },
              onBlur: props.onBlur,
              onFocus: props.onFocus,
              onCheck: function onCheck() {
                for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                  args[_key4] = arguments[_key4];
                }

                handleData.apply(undefined, [props.guid].concat(args));
                if (typeof props.onCheck === 'function') {
                  props.onCheck.apply(props, args);
                }
              },
              onToggle: function onToggle() {
                for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                  args[_key5] = arguments[_key5];
                }

                handleData.apply(undefined, [props.guid].concat(args));
                if (typeof props.onToggle === 'function') {
                  props.onToggle.apply(props, args);
                }
              },
              onShow: props.onShow,
              onDismiss: props.onDismiss,
              onTouchTap: props.onTouchTap,
              onUpdateInput: function onUpdateInput() {
                for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                  args[_key6] = arguments[_key6];
                }

                handleData.apply(undefined, [props.guid].concat(args));
                if (typeof props.onUpdateInput === 'function') {
                  props.onUpdateInput.apply(props, args);
                }
              },
              onNewRequest: props.onNewRequest,
              filter: props.filter
            })
          );
        })
      );
    }),
    layout.worows.map(function (field, index) {
      return _react2.default.createElement(
        'div',
        { key: index, style: field.style, className: field.className + ' ' + (field.visible === false ? 'hidden' : 'show') },
        _react2.default.createElement(_DynamicComponent.DynamicComponent, {
          component: config.map[field.type].type,
          map: config.map[field.type].map,
          option: config.map[field.type].options ? config.map[field.type].options.type : '',
          control: field,
          library: config.modules,
          attributes: field.props,
          rules: field.rules,
          formatter: field.formatter,
          fetchResponse: props.fetchResponse,
          onChange: function onChange() {
            for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
              args[_key7] = arguments[_key7];
            }

            handleData.apply(undefined, [props.guid].concat(args));
            if (typeof props.onChange === 'function') {
              props.onChange.apply(props, args);
            }
          },
          onBlur: props.onBlur,
          onFocus: props.onFocus,
          onCheck: function onCheck() {
            for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
              args[_key8] = arguments[_key8];
            }

            handleData.apply(undefined, [props.guid].concat(args));
            if (typeof props.onCheck === 'function') {
              props.onCheck.apply(props, args);
            }
          },
          onToggle: function onToggle() {
            for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
              args[_key9] = arguments[_key9];
            }

            handleData.apply(undefined, [props.guid].concat(args));
            if (typeof props.onToggle === 'function') {
              props.onToggle.apply(props, args);
            }
          },
          onShow: props.onShow,
          onDismiss: props.onDismiss,
          onTouchTap: props.onTouchTap,
          onUpdateInput: function onUpdateInput() {
            for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
              args[_key10] = arguments[_key10];
            }

            handleData.apply(undefined, [props.guid].concat(args));
            if (typeof props.onUpdateInput === 'function') {
              props.onUpdateInput.apply(props, args);
            }
          },
          onNewRequest: props.onNewRequest,
          filter: props.filter
        })
      );
    }),
    _react2.default.createElement('button', {
      ref: props.formRef,
      onClick: function onClick() {
        handleSubmit(props.onSubmit, data, props.guid);
      },
      style: {
        display: 'none'
      }
    })
  );
};

Aztec.propTypes = {
  data: _react.PropTypes.array.isRequired,
  library: _react.PropTypes.object,
  onChange: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  onTouchTap: _react.PropTypes.func,
  onCheck: _react.PropTypes.func,
  onToggle: _react.PropTypes.func,
  onShow: _react.PropTypes.func,
  onDismiss: _react.PropTypes.func,
  onUpdateInput: _react.PropTypes.func,
  onNewRequest: _react.PropTypes.func,
  filter: _react.PropTypes.func,
  response: _react.PropTypes.object,
  onSubmit: _react.PropTypes.func,
  formRef: _react.PropTypes.func,
  forceUpdate: _react.PropTypes.bool,
  displayErrors: _react.PropTypes.bool,
  patch: _react.PropTypes.object,
  guid: _react.PropTypes.string.isRequired
};
exports.default = Aztec;