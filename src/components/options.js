// default options
const defaultOptions = {
  defaultOpen: true, // default extend
  rootKeyName: 'root', // root key name
  editable: false, //
  sortable: false, // sortable for key
  defaultOpenDepth: 1, // default extend max depth
  styles: { // Text color
    key: { // key text color
      string: '#555',
      number: '#881391'
    },
    value: {// value text color
      string: '#c41a16',
      number: ' #1c00cf',
      boolean: '#0d22aa',
      null: '#e08331',
      undefined: '#e08331',
      function: '#067bca'
    }
  },
  parseLink: true, // Parsing text link
  keyNameQuote: false, // The key name quote  value: false / single / double
  valueNameQuote: 'double', //  single / double
  hints: { // Prompt when folding word
    array: ['item', 'items'],
    object: ['property', 'propertys']
  }
}

export default defaultOptions
