import blockies from 'blockies';

export const blockiesMixin = {
  methods: {
    toBlockie(seed) {
      return blockies({ seed: seed });
    }
  }
};
