const { queryEntities } = require('../services/tableService');
const azure = require('azure-storage');

module.exports = async function (context, req) {
  try {
    const { blog, id } = context.bindingData;

    console.log('blog', blog);
    console.log('id', id);

    const query = new azure.TableQuery().where(
      'PartitionKey eq ? and RowKey eq ?',
      blog,
      id.toString()
    );
    const result = await queryEntities('Posts', query);
    context.res = {
      status: 200,
      body: result,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
};
