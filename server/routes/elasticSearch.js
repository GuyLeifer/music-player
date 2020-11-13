const { Router } = require('express');
const router = Router();

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })


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

router.post('/all', async (req, res) => {
    try {
    const songs  = await Song.findAll({
    });
    const artists  = await Artist.findAll({
    });
    const albums  = await Album.findAll({
    });
    const playlists  = await Playlist.findAll({
    });

        updateElasticData('songs', songs);
        updateElasticData('artists', artists);
        updateElasticData('albums', albums);
        updateElasticData('playlists', playlists);
        res.send("all data update")
    } catch (err){
        res.send(err.massage)
    }
})

// router.get('/test', async (req, res) => {
//     try {
//         const songsSearchResults = await client.search({ 
//             index: 'songs',
//             size: 3,
//         })
//         res.send(songsSearchResults);
//     } catch (err) {
//         res.send(err.massage);
//     }
// })

router.get("/all", async (req, res) => {
    const name = req.query.params;
    console.log("name", name)
    try {
        const songsSearchResults = await client.search({ 
            index: 'songs',
            size: 3,
            body: { 
                query: {
                    prefix: {
                        title: name
                    }
                }
            }
        })

        const artistsSearchResults = await client.search({ 
            index: 'artists',
            size: 3,
            body: { 
                query: {
                    prefix: {
                        name: name
                    }
                }
            }
        })

        const albumsSearchResults = await client.search({ 
            index: 'albums',
            size: 3,
            body: { 
                query: {
                    prefix: {
                        name: name
                    }
                }
            }
        })

        const playlistsSearchResults = await client.search({ 
            index: 'playlists',
            size: 3,
            body: { 
                query: {
                    prefix: {               
                        name: name
                    }
                }
            }
        })

        res.send([songsSearchResults.body.hits.hits, artistsSearchResults.body.hits.hits, albumsSearchResults.body.hits.hits, playlistsSearchResults.body.hits.hits])
    } catch (e) {
        res.send(e.message);
    }
});

module.exports = router;