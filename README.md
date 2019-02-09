# Material Design Icons - meta.json

Dist for Material Design Icons meta.json

## Usage

For some projects one may not want the entire `@mdi/svg` devDependency in the case they only need the `meta.json` file.

The most common use for this dependency is for searching icons, so the example below will outline that.

`npm install @mdi/meta --save`

## WebPack

```json
{
  "assets": [
    "assets",
    {
      "glob": "**/*",
      "input": "../node_modules/@mdi/meta/meta.json",
      "output": "./assets/"
    }
  ]
}
```

## React

```js
import React, { Component, Fragment } from 'react';
import { meta } from `meta.json`;

class App {
  constructor(props) {
    super(props);
    this.state = {
      icons: []
    };
    fetch()
  }
  render(){
    const { icons } = this.state;
    return (
      <Fragment>
        {icons.length === 0 && (
          <p>Loading Icons...</p>
        )}
        {icons.length !== 0 && (
          <select name="icon">
            {icons.map(icon => {
              <option key={icon.id}
                value={icon.id}>
                {icon.name}
              </option>
            })}
          </select>
        )}
      </Fragment>
    );
  }
}
```