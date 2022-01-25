import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
/**
 * Represents an instance of the Basic Editor
 * @class BasicBeditor
 */
class BasicEditor {
  /**
   * Constructor to initialise the Basic
   * @param {object} props - properties to initialise the editor UI
   * @constructs BasicEditor
   */
  constructor({target, schema, data, helpText, name,
    validate, onChange, jsonError, swapOut, ajv}) {
    this.render({target, schema, data, helpText,
      validate, onChange, jsonError, swapOut, name, ajv});
    this.container = target;
    this.show();
  }
  /**
   * Method use to hide the Basic Editor
   */
  hide() {
    this.active = false;
    this.container.hide();
  }
  /**
   * Method use to show the Basic Editor
   */
  show() {
    this.active = true;
    this.container.show();
  }
  /**
   * Method use to destroy the Basic Editor and free resources
   * @return {Promise}
   */
  destroy() {
    let that = this;
    return new Promise((resolve, reject) => {
      ReactDOM.unmountComponentAtNode(that.container[0]);
      resolve();
    });
  }
  /**
   * Method use to render the Basic Editor
   * @param {object} props - object containing props for the 'App' object
   */
  render({schema, data, helpText, onChange,
    jsonError, target, swapOut, name, ajv}) {
    ReactDOM.render(
      <App
        schema={schema}
        data={data}
        jsonError={jsonError}
        onChange={onChange}
        ref={(instance) => {
          this.setData = (data) => instance.setData(data);
          this.setSchema = (schema, data) => {
            instance.setSchema(schema, data);
          };
        }}
        name={name}
        helpText={helpText}
        swapOut={swapOut}
        ajv={ajv}
      />,
      target[0],
    );
  }
}

module.exports = BasicEditor;
