const elasticsearch = require('@elastic/elasticsearch');
const client = new elasticsearch.Client({
    node: 'http://localhost:5601'
});

const updateElasticData = async(index, dataArray)=>{
    await client.indices.create(
        {
            index: index,
        }
    );
        const body = dataArray.flatMap((doc) => [
        { index: { _index: index } },
        doc,
    ]);
    const { body: bulkResponse } = await client.bulk({ refresh: true, body });
    if (bulkResponse.errors) {
        console.log("ERROR");
        return bulkResponse.errors;
    } else {
        const { body: count } = await client.count({ index: index });
        console.log(count);
        return bulkResponse;
    }
}

module.exports = { updateElasticData };
