/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
/* eslint-disable-next-line node/no-extraneous-require */
const map = require('broccoli-stew').map;

module.exports = {
  name: 'ember-credit-card',
  included: function() {
    this._super.included.apply(this, arguments);
    this.import('vendor/card.js');
  },

  treeForVendor(vendorTree) {
    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }


    let cardVendor = new Funnel(path.join(this.project.root, 'node_modules', 'card', 'dist'), {
      files: ['card.js'],
    });

    cardVendor = map(cardVendor, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);


    trees.push(cardVendor);

    return new MergeTrees(trees);
  },
};
