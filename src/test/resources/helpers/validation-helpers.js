function getValidationHelpers() {
  return {
    validateNoUnwantedFields: function(responseData) {
      var unwantedFields = ['_id', 'deleted', 'poolId', 'isAmm', 'isToken2022'];
      for (var i = 0; i < unwantedFields.length; i++) {
        var field = unwantedFields[i];
        if (responseData[field] !== undefined) {
          throw new Error('Unwanted field found: ' + field);
        }
      }
      return true;
    },

    validateNoUnwantedFieldsInArray: function(responseArray) {
      if (!Array.isArray(responseArray)) {
        throw new Error('Response should be an array');
      }
      var unwantedFields = ['_id', 'deleted', 'poolId', 'isAmm', 'isToken2022'];
      for (var i = 0; i < responseArray.length; i++) {
        var item = responseArray[i];
        for (var j = 0; j < unwantedFields.length; j++) {
          var field = unwantedFields[j];
          if (item[field] !== undefined) {
            throw new Error('Unwanted field found in item ' + i + ': ' + field);
          }
        }
      }
      return true;
    }
  };
} 