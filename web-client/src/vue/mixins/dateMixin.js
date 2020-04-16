import moment from 'moment';

export const dateMixin = {
  methods: {
    formatDate(date) {
      return moment(date).format('MM.DD.YYYY h:mm:ss a');
    }
  }
};
