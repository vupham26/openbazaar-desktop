import BaseModel from '../BaseModel';
import Contract from './Contract';
import app from '../../app';

export default class extends BaseModel {
  constructor(attrs, options) {
    const opts = {
      type: 'sale',
      ...options,
    };

    const types = ['sale', 'purchase'];

    if (types.indexOf(opts.type) === -1) {
      throw new Error(`Type needs to be one of ${types}.`);
    }

    super(attrs, opts);
    this.type = opts.type;
  }

  url() {
    return app.getServerUrl(`ob/order/${this.id}`);
  }

  get idAttribute() {
    return 'orderId';
  }

  get nested() {
    return {
      contract: Contract,
    };
  }

  parse(response = {}) {
    if (response.contract) {
      // Since we modify the data on parse (particularly in some nested models),
      // we'll store the original contract here.
      response.unparsedContract = JSON.parse(JSON.stringify(response.contract)); // deep clone
    }

    return response;
  }
}
